import * as likesRepository from "../likes/likes.repository.js";
import * as postRepository from "../posts/posts.repository.js";

import { 
  getExistingUserById,
} from "../../shared/helpers/getExistingUser.js";

// ========================================
// CONTAR LIKES
// ========================================
export async function count(
  postId: number
) {
  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("Error al obtener la publicación");
  }

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
  const user = await getExistingUserById(userId);
  
  if (!user) {
    throw new Error("El usuario no existe");
  }

  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("Error al obtener la publicación");
  }

  await likesRepository.create(userId, postId);
}

// ========================================
// QUITAR LIKE
// ========================================
export async function dislike(
  userId: number,
  postId: number
) {
  const user = await getExistingUserById(userId);
  
  if (!user) {
    throw new Error("El usuario no existe");
  }

  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("Error al obtener la publicación");
  }

  await likesRepository.deleteByUserAndPost(userId, postId);
}

// ========================================
// YA DIO LIKE
// ========================================
export async function hasLiked(
  userId: number,
  postId: number
) {
  const user = await getExistingUserById(userId);
  
  if (!user) {
    throw new Error("El usuario no existe");
  }

  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("Error al obtener la publicación");
  }

  const response = await likesRepository.exists(userId, postId);

  return response;
}