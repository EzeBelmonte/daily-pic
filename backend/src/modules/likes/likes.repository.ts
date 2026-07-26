import { eq, and, count } from "drizzle-orm";

import { db } from "../../infrastructure/database/db.js";
import { postLikes } from "../../infrastructure/database/schemas/postLikes.js";

// ========================================
// CONTAR LIKES
// ========================================
export async function countLikes(postId: number) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(postLikes)
    .where(eq(postLikes.postId, postId));

  return result?.count ?? 0;
}

// ========================================
// DAR LIKE
// ========================================
export async function addLike(
  userId: number,
  postId: number
) {
  await db.insert(postLikes).values({
    userId,
    postId,
  });
}

// ========================================
// QUITAR LIKE
// ========================================
export async function removeLike(
  userId: number,
  postId: number
) {
  await db
    .delete(postLikes)
    .where(
      and(
        eq(postLikes.userId, userId),
        eq(postLikes.postId, postId)
      )
    );
}

// ========================================
// YA DIO LIKE
// ========================================
export async function hasLiked(
  userId: number,
  postId: number
) {
  const [like] = await db
    .select()
    .from(postLikes)
    .where(
      and(
        eq(postLikes.userId, userId),
        eq(postLikes.postId, postId)
      )
    )
    .limit(1);

  return !!like;
}