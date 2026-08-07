import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";
import { conversations } from "./conversations.js";

export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),

    conversationId: integer("conversation_id")
      .notNull()
      .references(() => conversations.id, {
        onDelete: "cascade",
      }),

    senderId: integer("sender_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    content: text("content").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },

  (table) => ({
    conversationIdIdx: index(
      "messages_conversation_id_idx"
    ).on(table.conversationId),

    createdAtIdx: index(
      "messages_created_at_idx"
    ).on(table.createdAt),
  })
);