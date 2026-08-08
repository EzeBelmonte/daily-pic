import type { Request, Response } from "express";

import * as notificationsService from "./notifications.service.js";

// ========================================
// OBTENER NOTIFICACIÓN
// ========================================
export async function getNotifications(
  req: Request,
  res: Response
) {
  const userId = req.user.userId;

  const notifications =
    await notificationsService.getNotifications(userId);

  return res.status(200).json(notifications);
}

// ========================================
// MARCAR COMO LEIDO
// ========================================
/*export async function markAsRead(
  req: Request,
  res: Response
) {
  const notificationId =
    Number(req.params.notificationId);

  const notification =
    await notificationsService.markAsRead(
      notificationId
    );

  return res.status(200).json(notification);
}*/