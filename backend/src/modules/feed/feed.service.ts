import * as feedRepository from "./feed.repository.js";

import type { UserPosts } from "@daily-pic/shared/types";

import {
  encodeCursor,
  type ScrollLoader,
} from "../../shared/helpers/InfiniteScrollLoader.js";

import { toUserPostDTO } from "../../shared/mappers/post.mapper.js";

// ========================================
// FEED DE CONTACTOS
// ========================================
export async function getFeedAccepted(
  userId: number,
  limit: number,
  cursor?: ScrollLoader
): Promise<UserPosts> {
  const result =
    await feedRepository.findPosts(
      userId,
      limit,
      cursor
    );

  const posts = result.map(
    ({ post, user }) =>
      toUserPostDTO(post, user)
  );

  const lastPost =
    result[result.length - 1]?.post;

  const nextCursor = lastPost
    ? encodeCursor({
        createdAt: lastPost.createdAt,
        id: lastPost.id,
      })
    : null;

  return {
    posts,
    nextCursor,
  };
}