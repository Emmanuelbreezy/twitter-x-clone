/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;

  try {
    const postId = params.postId;

    if (!postId) {
      return NextResponse.json(
        { message: "Invalid username", status: "error" },
        { status: 400 }
      );
    }
    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json({
      status: "success",
      post,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to retrieve data",
        status: "error",
      },
      { status: 400 }
    );
  }
}
