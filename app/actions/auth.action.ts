/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function doSocialLogin(formData: any) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(data: {
  email: string;
  password: string;
}) {
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function currentUser() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        email: true,
        dateOfBirth: true,
        emailVerified: true,
        image: true,
        coverImage: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
        followingIds: true,
        hasNotification: true,
        isVerified: true,
        plan: true,
      },
    });

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return currentUser;
  } catch (err) {
    throw err;
  }
}

export async function ensureUniqueUsername(username: string) {
  try {
    let user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    while (user) {
      const randomNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
      username = `${username}${randomNumber}`;
      user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
    }
    return username;
  } catch (err) {
    throw err;
  }
}
