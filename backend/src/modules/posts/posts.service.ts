import * as postsRepository from "./posts.repository.js";
import { findRelationship } from "../contacts/contacts.repository.js";

import {
  getCurrentPublicationPeriodStart,
  getNextPublicationPeriodStart
} from "../../shared/utils/publicationPeriod.js";

import * as cloudinaryService from "../../infrastructure/cloudinary/cloudinary.service.js";

import { toPostDTO, toTopLikedPost, toUserPostDTO } from "../../shared/mappers/post.mapper.js";

import type { Post, PostWithUser, PostTopLiked, MyPosts, UserPosts } from "@daily-pic/shared/types";
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

import {
  encodeCursor,
  type ScrollLoader,
} from "../../shared/helpers/InfiniteScrollLoader.js";

export { toPostDTO };

// ========================================
// CREAR POST
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
    description: data.description ?? null,
    ...data,
  });

  if (!post) {
    throw new NotFoundError(
      "Error al crear la publicación"
    );
  }

  return toPostDTO(post);
}

// ========================================
// ACTUALIZAR POST
// ========================================
export async function update(
  userId: number,
  postId: number,
  data: PostSchema
): Promise<Post> {
  // Obtenemos el post
  const post = await getExistingPostsById(postId);

  if (post.userId !== userId) {
    throw new NotFoundError(
      "No tienes permiso para editar este post"
    );
  }

  const updatePost = await postsRepository.update(postId, data);

  if (!updatePost) {
    throw new NotFoundError(
      "Error al actualizar la publicación"
    );
  }

  return toPostDTO(updatePost);
}

// ========================================
// OBTENER MIS POSTS
// ========================================
export async function getPosts(
  userId: number,
  limit: number,
  cursor?: ScrollLoader
): Promise<MyPosts> {  
  const result = 
     await postsRepository.findByUserId(
      userId,
      limit,
      cursor
    );

  const posts = result.map((post) => 
    toPostDTO(post)
  );

  const lastPost =
    result[result.length - 1];

  const nextCursor = lastPost
    ? encodeCursor({
        createdAt: lastPost.createdAt,
        id: lastPost.id,
      })
    : null;
  
  return {
    posts,
    nextCursor,
  }
}

// ========================================
// OBTENER POSTS DE USUARIO
// ========================================
export async function getPostsByUsername(
  myUserId: number,
  username: string,
  limit: number,
  cursor?: ScrollLoader
): Promise<UserPosts> {
  const user = await getExistingUserByUsername(username);

  const relation = await findRelationship(
    myUserId, 
    user.id
  );

  if (
    user.isPrivate &&
    relation?.status !== "accepted"
  ) {
    return {
      posts: [],
      nextCursor: null,
    }
  }
  
  const result = 
    await postsRepository.findByUserId(
      user.id,
      limit,
      cursor
    );

  const posts = result.map((post) => 
    toUserPostDTO(post, user)
  );
  
  const lastPost =
    result[result.length - 1];

  const nextCursor = lastPost
    ? encodeCursor({
        createdAt: lastPost.createdAt,
        id: lastPost.id,
      })
    : null;
  
  return {
    posts,
    nextCursor,
  }
}


// ========================================
// OBTENER UN POST
// ========================================
export async function getPost(
  postId: number
): Promise<PostWithUser | null> {
  const post = await getExistingPostsById(postId);

  const user = await getExistingUserById(post.userId);

  return toUserPostDTO(post, user);
}


// ========================================
// ELIMINAR POST
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

// ========================================
// TOP 3 POSTS
// ========================================
export async function getTopLikedPosts(
  userId: number
): Promise<PostTopLiked[] | []> {
  const result = await postsRepository.findTopLikedPosts(userId);

  return result.map((item) => (
    toTopLikedPost(item.post, item.likes)
  ));
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

