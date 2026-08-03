import { and, eq, or, lt, desc } from "drizzle-orm";

import { db } from "../../infrastructure/database/db.js";
import { contacts, posts, users } from "../../infrastructure/database/schemas/index.js";

import type { FeedCursor } from "./feed.cursor.js";

export async function findPosts(
  userId: number,
  limit: number,
  cursor?: FeedCursor
) {
  const cursorCondition = cursor
    ? or(
      lt(
        posts.createdAt, 
        cursor.createdAt
      ),

      and(
        eq(
          posts.createdAt, 
          cursor.createdAt
        ),
        lt(
          posts.id, 
          cursor.id
        )
      )
    )
    : undefined;

  const result = await db
    .select({
      post: posts,
      user: users,
    })
    .from(posts)

    // Usuario dueño del post
    .innerJoin(
      users,
      eq(posts.userId, users.id)
    )

    // Relación entre el usuario actual
    // y el dueño del post
    .innerJoin(
      contacts,
      or(
        and(
          eq(
            contacts.requesterId,
            userId
          ),
          eq(
            contacts.addresseeId, 
            users.id
          )
        ),

        and(
          eq(
            contacts.addresseeId,
            userId
          ),
          eq(
            contacts.requesterId,
            users.id
          )
        )
      )
    )
    .where(
      and(
        eq(
          contacts.status,
          "accepted"
        ),
        cursorCondition
      )
    )
    .orderBy(
      desc(posts.createdAt),
      desc(posts.id)
    )
    .limit(limit);

  return result;
}