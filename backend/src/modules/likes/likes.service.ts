import * as likesRepository from "../likes/likes.repository.js";
import * as notificationsService from "../notifications/notifications.service.js";

import type { NotificationWithPost } from "@daily-pic/shared/types";

import { 
  getExistingPostsById 
} from "../../shared/helpers/getExistingPost.js";

import { NotFoundError } from "../../shared/errors/errors.js";

// ========================================
// CONTAR LIKES
// ========================================
export async function count(
  postId: number
) {
  await getExistingPostsById(postId);

  const response = await likesRepository.countById(postId);

  return response;
}

// ========================================
// DAR LIKE
// ========================================
export async function like(
  userId: number,
  postId: number
): Promise<{
  addresseeId: number,
  notification: NotificationWithPost | null,
}> {
  const post = await getExistingPostsById(postId);

  await likesRepository.create(userId, postId);

  const addresseeId = post.userId;

  const notification = 
    await notificationsService.create(
      "postLike",
      userId,
      addresseeId,
      null,       // contactId
      postId,     // postId
      null        // conversationId
    );

  if (!notification) {
    throw new NotFoundError(
      'Error al crear la notificación'
    );
  }
  
  const notificationWithSender =
    await notificationsService.findById(
      notification.id
    );

  if (!notificationWithSender) {
    throw new NotFoundError(
      "Error al obtener la notificación"
    );
  }

  const notificationResponse = {
    ...notificationWithSender,
    post: {
      id: post.id,
      imageUrl: post.imageUrl,
    }
  }
  
  return {
    addresseeId,
    notification: notificationResponse ?? null,
  }
}

// ========================================
// QUITAR LIKE
// ========================================
export async function dislike(
  userId: number,
  postId: number
) {
  await getExistingPostsById(postId);

  await likesRepository.deleteByUserAndPost(userId, postId);
}

// ========================================
// YA DIO LIKE?
// ========================================
export async function hasLiked(
  userId: number,
  postId: number
) {
  await getExistingPostsById(postId);

  const response = await likesRepository.exists(userId, postId);

  return response;
}