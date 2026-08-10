export type NotificationType =
  | "contactRequest"
  | "contactAccepted"
  | "postLike";

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

export interface ContactRequestNotification
  extends NotificationWithSender {
  type: "contactRequest";
}

export interface ContactAcceptedNotification
  extends NotificationWithSender {
  type: "contactAccepted";
}

// ========================================
// OBTENER NOTIFICACIÓN CON POST
// ========================================
export interface PostLikeNotification
  extends NotificationWithSender {
  type: "postLike";
  post: {
    id: number;
    imageUrl: string;
  };
}

// ========================================
// EXPORTAR
// ========================================
export type Notification =
  | ContactRequestNotification
  | ContactAcceptedNotification
  | PostLikeNotification;