import { useQuery } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function useListPosts(enabled = true) {
  return useQuery({
    queryKey: ["posts", "me"],
    queryFn: postsApi.getPosts,
    enabled,
  });
}