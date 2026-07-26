import {
  pgTable,
  serial,
  timestamp,
  integer,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const blocks = pgTable("blocks", 
  {
    id: serial("id").primaryKey(),

    blockerId: integer("blocker_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    blockedId: integer("blocked_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("unique_block").on(
      table.blockerId,
      table.blockedId
    ),
  ]
);