import { useInfiniteQuery } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function useMyPosts(enabled = true) {
  return useInfiniteQuery({
    queryKey: ["posts", "me"],

    queryFn: ({ pageParam }) =>
      postsApi.getMyPosts(pageParam),
    
    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => 
      lastPage.nextCursor ?? undefined,

    enabled,
  });
}