import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  refreshTokenHash: varchar(
    "refresh_token_hash",
    { length: 255 }
  ).notNull(),

  expiresAt: timestamp(
    "expires_at"
  ).notNull(),

  createdAt: timestamp(
    "created_at"
  )
    .defaultNow()
    .notNull(),

  revokedAt: timestamp(
    "revoked_at"
  ),
});