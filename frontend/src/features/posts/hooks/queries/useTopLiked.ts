import { useQuery } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function useTopLiked() {
  return useQuery({
    queryKey: ["posts", "top"],
    queryFn:  postsApi.getTopLikedPosts,
  });
}