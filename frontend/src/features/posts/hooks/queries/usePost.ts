import { useQuery } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function usePost(postId: number) {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => postsApi.getPost(postId),
    enabled: !!postId,
  });
}