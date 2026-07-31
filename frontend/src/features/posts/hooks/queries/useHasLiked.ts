import { useQuery } from "@tanstack/react-query";

import * as likesApi from "@/api/likes.api";

export function useHasLiked(postId: number) {
  return useQuery({
    queryKey: ["likes", postId, "hasLiked"],
    queryFn: () => likesApi.hasLiked(postId),
    enabled: !!postId,
  });
}