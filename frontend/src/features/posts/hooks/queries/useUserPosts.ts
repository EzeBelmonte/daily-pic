import { useInfiniteQuery } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function useUserPosts(username?: string) {
  return useInfiniteQuery({
    queryKey: ["posts", "user", username],

    queryFn: ({ pageParam}) => 
      postsApi.getUserPosts(username!, pageParam),
    
    initialPageParam: undefined as string | undefined,
    
    getNextPageParam: (lastPage) => 
      lastPage.nextCursor ?? undefined,

    enabled: !!username,
  });
}