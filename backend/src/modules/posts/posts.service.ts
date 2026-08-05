import * as postsRepository from "./posts.repository.js";
import { findRelationship } from "../contacts/contacts.repository.js";

import {
  getCurrentPublicationPeriodStart,
  getNextPublicationPeriodStart
} from "../../shared/utils/publicationPeriod.js";

import * as cloudinaryService from "../../infrastructure/cloudinary/cloudinary.service.js";

import { toCreatePostDTO, toPostDTO, toUserPostDTO } from "../../shared/mappers/post.mapper.js";

import type { Post, PostResponse } from "@daily-pic/shared/types";
import type { PostSchema } from "@daily-pic/shared/schemas";

import { 
  getExistingUserByUsername,
  getExistingUserById,
 } from "../../shared/helpers/getExistingUser.js";

import { 
  getExistingPostsById 
} from "../../shared/helpers/getExistingPost.js";

import { NotFoundError } from "../../shared/errors/errors.js";
import { PublicationLimitError } from "../../shared/errors/PublicationLimitError.js";


export { toPostDTO };

// ========================================
// CREAR POSTS
// ========================================
export async function create(
  userId: number,
  imageBuffer: Buffer | undefined,
  data: PostSchema,
): Promise<Post> {
  const allowed = await canPublish(userId);
  
  if (!allowed) {
    throw new PublicationLimitError();
  }

  if (!data) {
    throw new NotFoundError(
      "La imagen es obligatoria"
    );
  }

  if (imageBuffer === undefined || imageBuffer === null) {
    throw new NotFoundError(
      "La imagen es obligatoria"
    );
  }

  // Subimos la imagen y obtenemos los datos que necesitamos
  const upload = await cloudinaryService.uploadImage(imageBuffer);

  const post = await postsRepository.create({
    userId,
    imageUrl:  upload.imageUrl,
    imagePublicId: upload.imagePublicId,
    imageWidth: upload.imageWidth,
    imageHeight: upload.imageHeight,
    ...data,
  });

  if (!post) {
    throw new NotFoundError(
      "Error al crear la publicación"
    );
  }

  return toCreatePostDTO(post);
}

// ========================================
// OBTENER UN POST
// ========================================
export async function getPost(
  postId: number
): Promise<PostResponse> {
  const post = await getExistingPostsById(postId);

  const user = await getExistingUserById(post.userId);

  return toUserPostDTO(post, user);
}

// ========================================
// OBTENER MIS POSTS
// ========================================
export async function getPosts(
  userId: number
): Promise<Post[]> {  
  const posts = await postsRepository.findByUserId(userId);

  return posts.map((post) => 
    toPostDTO(post)
  );
}

// ========================================
// OBTENER POSTS DE USUARIO
// ========================================
export async function getPostsByUsername(
  myUserId: number,
  username: string
): Promise<PostResponse[]> {
  const user = await getExistingUserByUsername(username);

  const relation = await findRelationship(
    myUserId, 
    user.id
  );

  if (
    user.isPrivate &&
    relation?.status !== "accepted"
  ) {
    return [];
  }
  
  const posts = await postsRepository.findByUserId(user.id);

  return posts.map((post) => 
    toUserPostDTO(post, user)
  );
}

// ========================================
// ACTUALIZAR POSTS
// ========================================
export async function update(
  userId: number,
  postId: number,
  data: PostSchema
) {
  // Obtenemos el post
  const post = await getExistingPostsById(postId);

  if (post.userId !== userId) {
    throw new NotFoundError(
      "No tienes permiso para editar este post"
    );
  }

  const updatePost = await postsRepository.update(postId, data);

  return updatePost;
}

// ========================================
// ELIMINAR POSTS
// ========================================
export async function deleteById(
  userId: number,
  postId: number
) {
  // Buscamos el post a eliminar
  const post = await getExistingPostsById(postId);

  if (post.userId !== userId) {
    throw new NotFoundError(
      "No tienes permiso para editar este post"
    );
  }

  await cloudinaryService.deleteImage(post.imagePublicId);
  await postsRepository.deleteById(postId);
}

// ========================================
// CONTAR POSTS
// ========================================
export async function countById(
  userId: number
) {
  const count = await postsRepository.countById(userId);

  return count;
}

// ========================================
// VERIFICAR SI PUEDE PUBLICAR
// ========================================
export async function canPublish(
  userId: number
) {
  const lastPost = await postsRepository.findLastByUserId(userId);

  // Nunca publicó
  if (!lastPost) { 
    return true;
  }

  const currentPeriodStart =
    getCurrentPublicationPeriodStart();

  // Si publicó antes de que comenzara
  // el período actual, puede publicar
  return lastPost.createdAt < currentPeriodStart;
}

// ========================================
// OBTENER ESTADO SI PUEDE PUBLICAR
// ========================================
export async function getPublicationStatus(
  userId: number
) {
  const lastPost = 
    await postsRepository.findLastByUserId(userId); 
    
  const currentPeriodStart = 
    getCurrentPublicationPeriodStart();

  // Si nunca publicó, solamente debe esperar
  // hasta la apertura de las 20:00.
  if (!lastPost) {
    return {
      canPublish: true,
      nextPublicationAt: null,
    }
  }

  // 24 horas después de la última publicación.
  if (lastPost.createdAt < currentPeriodStart) { 
    return { 
      canPublish: true, 
      nextPublicationAt: null, 
    }; 
  }

  // Próxima apertura de las 20:00.
  const nextPublicationAt = 
    getNextPublicationPeriodStart();

  return { 
    canPublish: false, 
    nextPublicationAt: nextPublicationAt.toISOString(), 
  };
}