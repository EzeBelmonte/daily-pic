import { useQuery } from "@tanstack/react-query";

import * as likesApi from "@/api/likes.api";

export function useCountLikes(postId: number) {
  return useQuery({
    queryKey: ["likes", postId, "count"],
    queryFn: () => likesApi.getLikes(postId),
    enabled: !!postId,
  });
}