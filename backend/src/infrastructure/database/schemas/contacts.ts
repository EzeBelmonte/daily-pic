import {
  pgTable,
  pgEnum,
  serial,
  timestamp,
  integer,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const contactStatus = pgEnum("friendship_status", [
  "pending",
  "accepted",
]);

export const contacts = pgTable("contacts", 
  {
    id: serial("id").primaryKey(),

    requesterId: integer("requester_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    addresseeId: integer("addressee_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    status: contactStatus("status")
      .default("pending")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
    
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("unique_friendship").on(
      table.requesterId,
      table.addresseeId
    ),
  ]
);