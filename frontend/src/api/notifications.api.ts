import api from "./api";

import type { Notification } from "@daily-pic/shared/types";

// ========================================
// CREAR NOTIFICACIÓN
// ========================================
export async function getNotifications(): Promise<Notification[]> {
  const response =
    await api.get<Notification[]>("/notifications");

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