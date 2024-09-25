"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function postComment(data: {
  postId: number;
  body: string;
  commentImage?: string;
}) {
  const { postId, body, commentImage } = data;
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }
  try {
    const currentUserId = +session?.user?.id;

    if (!postId) {
      throw new Error("Post Id is required");
    }

    if (!body) {
      throw new Error("Body Id is required");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUserId,
        postId: postId,
        commentImage: commentImage,
      },
    });

    try {
      await prisma.$transaction([
        prisma.notification.create({
          data: {
            body: `${user?.name} replied your post`,
            userId: comment.userId,
          },
        }),
        prisma.user.update({
          where: { id: post?.userId },
          data: { hasNotification: true },
        }),
      ]);
    } catch (err) {
      console.error("Error creating notification or updating user:", err);
    }

    return {
      message: "Comment created successfully",
      comment,
    };
  } catch (err) {
    throw err;
  }
}
