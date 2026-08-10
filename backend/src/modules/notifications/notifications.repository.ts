import { db } from "../../infrastructure/database/db.js";
import { and, eq } from "drizzle-orm";

import { notifications } from "../../infrastructure/database/schemas/notifications.js";

type NotificationType =
  | "contactRequest"
  | "contactAccepted"
  | "postLike";

// ========================================
// CREAR NOTIFICACIÓN
// ========================================
export async function create(
  type: NotificationType,
  fromUserId: number,
  userId: number,
  contactId: number | null,
  postId: number | null,
  conversationId: number | null,
) {
  try {
    const [notification] = await db
      .insert(notifications)
      .values({
        type,
        fromUserId,
        userId,
        contactId,
        postId,
        conversationId,
      })
      .returning();

    return notification;
  } catch (error) {
    console.error("❌ ERROR INSERT NOTIFICATION:", error);
    throw error;
  }
}

// ========================================
// OBTENER TODAS LAS NOTIFICACIONES
// DE UN USUARIO
// ========================================
export async function findByUserId(userId: number) {
  return db.query.notifications.findMany({
    where: (notifications, { eq }) =>
      eq(notifications.userId, userId),

    with: {
      sender: {
        columns: {
          id: true,
          username: true,
          name: true,
          lastname: true,
          profileImageUrl: true,
        },
      },

      post: {
        columns: {
          id: true,
          imageUrl: true,
        },
      },
    },

    orderBy: (notifications, { desc }) =>
      [desc(notifications.createdAt)],
  });
}

// ========================================
// ACTUALIZAR LA NOTIFICACIÓN
// DE SOLICITUD DE CONTACTO
// ========================================
export async function updateContactNotification(
  contactId: number,
) {
  const [notification] = await db
    .update(notifications)
    .set({
      type: "contactAccepted",
      read: true,
    })
    .where(
      and(
        eq(notifications.contactId, contactId),
        eq(
          notifications.type,
          "contactRequest"
        )
      )
    )
    .returning();

  console.log(
    "🔔 NOTIFICACIÓN ACTUALIZADA:",
    notification
  );

  return notification;
}

// ========================================
// ELIMINAR LA NOTIFICACIÓN
// ========================================
export async function deleteContactRequest(
  contactId: number
) {
  try {
    await db
      .delete(notifications)
      .where(
        and(
          eq(notifications.contactId, contactId),
          eq(
            notifications.type,
            "contactRequest"
          )
        )
      );
  } catch (error) {
    console.error(
      "❌ ERROR DELETE CONTACT NOTIFICATION:",
      error
    );

    throw error;
  }
}

// ========================================
// OBTENER DATOS DE UNA NOTIFICACIÓN
// ========================================
export async function findById(id: number) {
  return db.query.notifications.findFirst({
    where: (notifications, { eq }) =>
      eq(notifications.id, id),

    with: {
      sender: {
        columns: {
          id: true,
          username: true,
          name: true,
          lastname: true,
          profileImageUrl: true,
        },
      },

      post: {
        columns: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });
}

// ========================================
// MARCAR COMO LEÍDO
// ========================================
export async function markAsRead(
  notificationId: number,
) {
  const [notification] = await db
    .update(notifications)
    .set({
      read: true,
    })
    .where(
      eq(notifications.id, notificationId)
    )
    .returning();

  return notification;
}