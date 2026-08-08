import * as notificationsRepository from './notifications.repository.js';

import type { 
  AppNotification,
  NotificationWithSender,
} from '@daily-pic/shared/types';

import { NotFoundError } from '../../shared/errors/errors.js';

// ========================================
// CREAR NOTIFICACIÓN
// ========================================
export async function create(
  type: AppNotification['type'],
  fromUserId: number,
  userId: number,
  contactId: number,
): Promise<AppNotification | null> {

  const notification = await notificationsRepository.create(
    type,
    fromUserId,
    userId,
    contactId
  );

  if (!notification) {
    throw new NotFoundError(
      'Error al crear la notificación'
    );
  }

  return notification ?? null;
}

// ========================================
// OBTENER TODAS LAS NOTIFICACINES DE UN USUARIO
// ========================================
export async function getNotifications(
  userId: number
): Promise<NotificationWithSender[] | []> {

  const notifications = 
    await notificationsRepository.findByUserId(userId);

  return notifications || [];
}

// ========================================
// ACTUALIZAR LA NOTIFICACIÓN
// ========================================
export async function updateContactNotification(
  contactId: number,
) {
  const notification = 
    await notificationsRepository.updateContactNotification(
      contactId,
    );
    
  return notification;
}

// ========================================
// ELIMINAR LA NOTIFICACIÓN
// ========================================
export async function deleteContactRequest(
  contactId: number
) {
  return notificationsRepository.deleteContactRequest(
    contactId
  );
}

// ========================================
// OBTENER DATOS DEL USUARIO CON ID DE UNA NOTIFICACIÓN
// ========================================
export async function findById(
  notificationId: number
) {
  return notificationsRepository.findById(
    notificationId
  );
}

// ========================================
// MARCAR COMO LEIDO
// ========================================
export async function markAsRead(
  notificationId: number,
) {
  return notificationsRepository.markAsRead(
    notificationId
  );
}