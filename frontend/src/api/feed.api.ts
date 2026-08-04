import api from "./api";

import type { PostResponse } from "@daily-pic/shared/types";

export type FeedResponse = {
  posts: PostResponse[];
  nextCursor: string | null;
}

export async function getAccepted(
  cursor?: string
): Promise<FeedResponse> {
  const response = await api.get<FeedResponse>(
    "feed/contacts",
    {
      params: {
        limit: 20,
        cursor,
      },
    }
  );

  return response.data;
}