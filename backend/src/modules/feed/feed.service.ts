import * as feedRepository from "./feed.repository.js";

import {
  encodeCursor,
  type FeedCursor,
} from "./feed.cursor.js";

import { toPostDTO } from "../posts/posts.service.js";

export async function getContactsFeed(
  userId: number,
  limit: number,
  cursor?: FeedCursor
) {
  const result =
    await feedRepository.getFeedPosts(
      userId,
      limit,
      cursor
    );

  const posts = result.map(
    ({ post, user }) =>
      toPostDTO(post, user)
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