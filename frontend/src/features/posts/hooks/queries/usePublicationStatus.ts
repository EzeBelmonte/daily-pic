import { useQuery } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function usePublicationStatus() {
  return useQuery({
    queryKey: ["publication-status"],
    queryFn: postsApi.getPublicationStatus,
  });
}