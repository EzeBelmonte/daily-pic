import api from "./api";

import type { UserPosts } from "@daily-pic/shared/types";

export async function getAccepted(
  cursor?: string
): Promise<UserPosts> {
  const response = await api.get<UserPosts>(
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