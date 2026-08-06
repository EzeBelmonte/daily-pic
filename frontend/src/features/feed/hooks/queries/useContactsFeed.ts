import { useInfiniteQuery } from "@tanstack/react-query";

import * as feedApi from "@/api/feed.api";

export function useContactsFeed() {
  return useInfiniteQuery({
    queryKey: ["feed"],

    queryFn: ({ pageParam }) =>
      feedApi.getFeedAccepted(pageParam),

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) =>
      lastPage.nextCursor ?? undefined,
  });
}