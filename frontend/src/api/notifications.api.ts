import api from "./api";

import type { NotificationWithSender } from "@daily-pic/shared/types";

// ========================================
// CREAR NOTIFICACIÓN
// ========================================
export async function getNotifications(
): Promise<NotificationWithSender[] | []> {
  const response =
    await api.get<NotificationWithSender[] | []>("/notifications");

  return response.data;
}

// ========================================
// MARCAR COMO LEIDO
// ========================================
export async function markAsRead(
  notificationId: number
) {
  const response =
    await api.patch(`/notifications/${notificationId}/read`);

  return response.data;
}