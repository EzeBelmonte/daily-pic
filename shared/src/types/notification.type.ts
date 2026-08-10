export type NotificationType =
  | "contactRequest"
  | "contactAccepted"
  | "postLike"
  | "message";

import type { User } from "./user.type.js";

// ========================================
// NOTIFICACIÓN
// ========================================
export interface AppNotification {
  id: number;
  // Usuario que recibe
  userId: number;
  // Usuario que genera
  fromUserId: number;
  // Usuario de la notificación
  contactId: number | null;

  type: NotificationType;

  // Sólo se utiliza para postLike
  postId: number | null;
  // Sólo se utiliza para message
  conversationId: number | null;

  read: boolean;

  createdAt: Date;
}

// ========================================
// OBTENER NOTIFICACIÓN CON USUARIO
// ========================================
export interface NotificationWithSender extends AppNotification{
  sender: User
}

// ========================================
// OBTENER NOTIFICACIÓN CON POST
// ========================================
export interface NotificationWithPost extends NotificationWithSender{
  post: {
    id: number;
    imageUrl: string;
  };
}