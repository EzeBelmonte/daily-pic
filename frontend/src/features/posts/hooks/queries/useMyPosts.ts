import { useQuery } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function useMyPosts(enabled = true) {
  return useQuery({
    queryKey: ["posts", "me"],
    queryFn: postsApi.getMyPosts,
    enabled,
  });
}