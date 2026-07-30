import { useQuery } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function useUserPosts(username?: string) {
  return useQuery({
    queryKey: ["posts", "user", username],
    queryFn: () => postsApi.getUserPosts(username!),
    enabled: !!username,
  });
}