import api from "./axios";

import type { PostResponse } from "@shared/index";

export type FeedResponse = {
  posts: PostResponse[];
  nextCursor: string | null;
}

export async function getcontactsFeed(
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