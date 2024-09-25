"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function followUser(userId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }
  try {
    const currentUserId = +session?.user?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (updatedFollowingIds.includes(userId)) {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    } else {
      updatedFollowingIds.push(userId);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    const isFollowing = updatedUser.followingIds.includes(userId);

    return {
      isFollowing,
      updatedUser,
    };
  } catch (err) {
    console.log(err, "update");
    throw err;
  }
}
