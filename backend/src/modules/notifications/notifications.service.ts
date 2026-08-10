import * as notificationsRepository
  from "./notifications.repository.js";

import type {
  AppNotification,
  Notification,
} from "@daily-pic/shared/types";

import { NotFoundError }
  from "../../shared/errors/errors.js";

// ========================================
// CREAR NOTIFICACIÓN
// ========================================
export async function create(
  type: AppNotification["type"],
  fromUserId: number,
  userId: number,
  contactId: number | null,
  postId: number | null,
  conversationId: number | null,
): Promise<AppNotification> {

  const notification =
    await notificationsRepository.create(
      type,
      fromUserId,
      userId,
      contactId,
      postId,
      conversationId,
    );

  if (!notification) {
    throw new NotFoundError(
      "Error al crear la notificación"
    );
  }

  return notification;
}

// ========================================
// OBTENER TODAS LAS NOTIFICACIONES
// ========================================
export async function getNotifications(
  userId: number
): Promise<Notification[]> {

  const notifications =
    await notificationsRepository.findByUserId(
      userId
    );

  return notifications.flatMap(
    (notification): Notification[] => {

      switch (notification.type) {

        case "contactRequest":
          return [{
            ...notification,
            type: "contactRequest",
          }];

        case "contactAccepted":
          return [{
            ...notification,
            type: "contactAccepted",
          }];

        case "postLike":

          if (!notification.post) {
            return [];
          }

          return [{
            ...notification,
            type: "postLike",
            post: notification.post,
          }];

        default:
          return [];
      }
    }
  );
}

// ========================================
// ACTUALIZAR NOTIFICACIÓN
// ========================================
export async function updateContactNotification(
  contactId: number,
) {
  return notificationsRepository
    .updateContactNotification(contactId);
}

// ========================================
// ELIMINAR NOTIFICACIÓN
// ========================================
export async function deleteContactRequest(
  contactId: number
) {
  return notificationsRepository
    .deleteContactRequest(contactId);
}

// ========================================
// OBTENER NOTIFICACIÓN POR ID
// ========================================
export async function findById(
  notificationId: number
) {
  return notificationsRepository.findById(
    notificationId
  );
}

// ========================================
// MARCAR COMO LEÍDO
// ========================================
export async function markAsRead(
  notificationId: number,
) {
  return notificationsRepository.markAsRead(
    notificationId
  );
}