"use client";
import { useCallback, useMemo, useState } from "react";
import { likePost } from "@/app/actions/like.action";
import { toast } from "./use-toast";
import useCurrentUser from "./useCurrentUser";
import usePosts from "./usePosts";
//import { useSession } from "next-auth/react";

const useLike = (postId: number, likedIds: number[], userId?: number) => {
  const { data } = useCurrentUser();
  //const session = useSession();
  //const { mutate: mutatePosts } = usePosts({});
  const { mutate: mutateFetchPost } = usePosts({
    postId: postId,
  });
  const { mutate: mutateFetchPosts } = usePosts({ userId: userId });

  const [loading, setLoading] = useState<boolean>(false);

  const hasLiked = useMemo(() => {
    const likes = likedIds || [];
    return likes.includes(data?.currentUser?.id);
  }, [likedIds, data?.currentUser?.id]);

  const toggleLike = useCallback(async () => {
    try {
      setLoading(true);
      const response = await likePost(postId);
      mutateFetchPost();
      mutateFetchPosts();
      toast({
        title: "Sucess",
        description: `${
          response.isLiked ? "Liked" : "UnLike"
        } post successfully`,
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to like post",
        variant: "destructive",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [mutateFetchPost, mutateFetchPosts, postId]);

  return {
    loading,
    hasLiked,
    toggleLike,
  };
};

export default useLike;
