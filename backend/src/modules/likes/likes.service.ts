import * as likesRepository from "../likes/likes.repository.js";
import * as postRepository from "../posts/posts.repository.js";

import { 
  getExistingUserById,
} from "../../shared/helpers/getExistingUser.js";

// ========================================
// CONTAR LIKES
// ========================================
export async function countLikes(
  postId: number
) {
  const post = await postRepository.findById(postId);

  if (!post) {
    throw new Error("Error al obtener la publicación");
  }

  const response = await likesRepository.countLikes(postId);

  return response;
}

// ========================================
// DAR LIKE
// ========================================
export async function addLike(
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

  await likesRepository.addLike(userId, postId);
}

// ========================================
// QUITAR LIKE
// ========================================
export async function removeLike(
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

  await likesRepository.removeLike(userId, postId);
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

  const response = await likesRepository.hasLiked(userId, postId);

  return response;
}