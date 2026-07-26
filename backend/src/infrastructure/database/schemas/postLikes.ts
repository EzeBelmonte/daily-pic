import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { users } from "./users.js";
import { posts } from "./posts.js";

export const postLikes = pgTable("post_likes",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),

    postId: integer("post_id")
      .notNull()
      .references(() => posts.id),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.postId],
    }),
  })
);