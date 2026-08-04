import * as likesRepository from "../likes/likes.repository.js";

import { 
  getExistingPostsById 
} from "../../shared/helpers/getExistingPost.js";

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
) {
  await getExistingPostsById(postId);

  await likesRepository.create(userId, postId);
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