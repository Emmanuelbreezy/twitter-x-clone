"use client";
import { followUser } from "@/app/actions/follow.action";
import { useCallback, useMemo, useState } from "react";
import { toast } from "./use-toast";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";

const useFollow = (userId: number, username: string) => {
  const { data, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchUser } = useUser(username);

  const [loading, setLoading] = useState<boolean>(false);

  console.log(username);

  // Memoize currentUser data
  const currentUser = useMemo(() => {
    return data?.currentUser || {};
  }, [data]);

  // Memoize the isFollowing value
  const isFollowing = useMemo(() => {
    const following = currentUser.followingIds || [];
    return following.includes(userId);
  }, [currentUser.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    try {
      setLoading(true);
      const response = await followUser(userId);
      mutateCurrentUser();
      mutateFetchUser();
      toast({
        title: "Success",
        description: response.isFollowing
          ? "Followed user successfully"
          : "Unfollowed user successfully",
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to follow",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [mutateCurrentUser, mutateFetchUser, userId]);

  return {
    loading,
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
