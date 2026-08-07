import {
  pgTable,
  serial,
  integer,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const conversations = pgTable(
  "conversations",
  {
    id: serial("id").primaryKey(),

    user1Id: integer("user1_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    user2Id: integer("user2_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },

  (table) => ({
    usersUnique: unique().on(
      table.user1Id,
      table.user2Id
    ),
  })
);