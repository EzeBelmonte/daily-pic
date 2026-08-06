import api from "./api";

import type { UserPosts } from "@daily-pic/shared/types";

// ========================================
// FEED DE CONTACTOS
// ========================================
export async function getFeedAccepted(
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