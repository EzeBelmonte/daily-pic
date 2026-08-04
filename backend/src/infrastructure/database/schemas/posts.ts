import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  imageUrl: varchar("image_url", { length: 500 }).notNull(),

  imagePublicId: varchar("image_public_id", { length: 255 }).notNull(),

  imageWidth: integer("image_width").notNull(),

  imageHeight: integer("image_height").notNull(),

  description: text("description"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});