import { relations } from "drizzle-orm";

import { users } from "./users.js";
import { posts } from "./posts.js";
import { contacts } from "./contacts.js";
import { blocks } from "./blocks.js";
import { sessions } from "./sessions.js";

// ========================================
// USERS
// ========================================
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),

  sessions: many(sessions),

  // Solicitudes enviadas
  sentContactRequests: many(contacts, {
    relationName: "requester",
  }),

  // Solicitudes recibidas
  receivedContactRequests: many(contacts, {
    relationName: "addressee",
  }),

  // Bloqueo de usuarios
  blockedUsers: many(blocks, {
    relationName: "blocker",
  }),

  blockedByUsers: many(blocks, {
    relationName: "blocked",
  }),
}));

// ========================================
// POSTS
// ========================================
export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

// ========================================
// CONTACTS
// ========================================
export const contactsRelations = relations(contacts, ({ one }) => ({
  // Usuario que sigue
  requester: one(users, {
    fields: [contacts.requesterId],
    references: [users.id],
    relationName: "requester",
  }),

  // Usuario seguido
  following: one(users, {
    fields: [contacts.addresseeId],
    references: [users.id],
    relationName: "addressee",
  }),
}));

// ========================================
// BLOCKS
// ========================================
export const blocksRelations = relations(blocks, ({ one }) => ({
  blocker: one(users, {
    fields: [blocks.blockerId],
    references: [users.id],
    relationName: "blocker",
  }),

  blocked: one(users, {
    fields: [blocks.blockedId],
    references: [users.id],
    relationName: "blocked",
  }),
}));

// ========================================
// SESSIONS
// ========================================
export const sessionsRelations = relations(
  sessions,
  ({ one }) => ({
    user: one(users, {
      fields: [sessions.userId],
      references: [users.id],
    }),
  })
);