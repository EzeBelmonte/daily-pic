import { and, eq, or, lt, desc } from "drizzle-orm";

import { db } from "../../infrastructure/database/db.js";
import { contacts, posts, users } from "../../infrastructure/database/schemas/index.js";

type FeedCursor = {
  createdAt: Date;
  id: number;
};

export async function getFeedPosts(
  userId: number,
  limit: number,
  cursor?: FeedCursor
) {
  const cursorCondition = cursor
    ? or(
      lt(posts.createdAt, cursor.createdAt),

      and(
        eq(posts.createdAt, cursor.createdAt),
        lt(posts.id, cursor.id)
      )
    )
    : undefined;

  const result = await db
    .select({
      post: posts,
      user: users,
    })
    .from(posts)
    .innerJoin(
      users,
      eq(posts.userId, users.id)
    )
    .innerJoin(
      contacts,
      and(
        eq(contacts.status, "accepted"),

        or(
          and(
            eq(contacts.requesterId, userId),
            eq(contacts.addresseeId, posts.userId)
          ),

          and(
            eq(contacts.addresseeId, userId),
            eq(contacts.requesterId, posts.userId)
          )
        )
      )
    )
    .where(cursorCondition)
    .orderBy(
      desc(posts.createdAt),
      desc(posts.id)
    )
    .limit(limit);

  return result;
}