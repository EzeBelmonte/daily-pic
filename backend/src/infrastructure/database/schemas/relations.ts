import { relations } from "drizzle-orm";

import { users } from "./users.js";
import { posts } from "./posts.js";
import { contacts } from "./contacts.js";
import { blocks } from "./blocks.js";
import { sessions } from "./sessions.js";
import { conversations } from "./conversations.js";
import { messages } from "./messages.js";
import { notifications } from "./notifications.js";

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

  // Conversaciones
  conversationsAsUser1: many(conversations, {
    relationName: "user1",
  }),

  conversationsAsUser2: many(conversations, {
    relationName: "user2",
  }),

  // Mensajes enviados
  message: many(messages, {
    relationName: "sender",
  }),

  // Notificaciones recibidas
  notifications: many(notifications, {
    relationName: "recipient",
  }),

  // Notificaciones enviadas
  sentNotifications: many(notifications, {
    relationName: "sender",
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
  addressee: one(users, {
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

// ========================================
// CONVERSATIONS
// ========================================
export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    user1: one(users, {
      fields: [conversations.user1Id],
      references: [users.id],
      relationName: "user1",
    }),

    user2: one(users, {
      fields: [conversations.user2Id],
      references: [users.id],
      relationName: "user2",
    }),

    messages: many(messages),
  })
);

// ========================================
// MESSAGES
// ========================================
export const messagesRelations = relations(
  messages, 
  ({ one }) => ({
    conversation: one(conversations, {
      fields: [messages.conversationId],
      references: [conversations.id],
    }),

    sender: one(users, {
      fields: [messages.senderId],
      references: [users.id],
      relationName: "sender",
    }),
  })
);

// ========================================
// NOTIFICATIONS
// ========================================
export const notificationsRelations = relations(
  notifications,
  ({ one }) => ({
    recipient: one(users, {
      fields: [notifications.userId],
      references: [users.id],
      relationName: "recipient",
    }),

    sender: one(users, {
      fields: [notifications.fromUserId],
      references: [users.id],
      relationName: "sender",
    }),

    post: one(posts, {
      fields: [notifications.postId],
      references: [posts.id],
    }),

    conversation: one(conversations, {
      fields: [notifications.conversationId],
      references: [conversations.id],
    }),
  })
);
