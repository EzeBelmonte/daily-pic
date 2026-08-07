import {
  pgEnum,
  pgTable,
  serial,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";
import { posts } from "./posts.js";
import { conversations } from "./conversations.js";

export const notificationTypeEnum = pgEnum(
  "notification_type",
  [
    "contactRequest",
    "contactAccepted",
    "postLike",
    "message",
  ]
);

export const notifications = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),

    // Usuario que recibe la notificación
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    // Usuario que originó la notificación
    fromUserId: integer("from_user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    type: notificationTypeEnum("type").notNull(),

    // Usado únicamente para postLike
    postId: integer("post_id").references(
      () => posts.id,
      {
        onDelete: "cascade",
      }
    ),

    // Usado únicamente para message
    conversationId: integer(
      "conversation_id"
    ).references(
      () => conversations.id,
      {
        onDelete: "cascade",
      }
    ),

    // ¿El usuario ya vio la notificación?
    read: boolean("read")
      .notNull()
      .default(false),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },

  (table) => ({
    userIdIdx: index(
      "notifications_user_id_idx"
    ).on(table.userId),

    userReadIdx: index(
      "notifications_user_read_idx"
    ).on(table.userId, table.read),

    createdAtIdx: index(
      "notifications_created_at_idx"
    ).on(table.createdAt),
  })
);