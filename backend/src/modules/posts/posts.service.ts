import * as postsRepository from "./posts.repository.js";
import { findRelationship } from "../contacts/contacts.repository.js";

import * as cloudinaryService from "../../infrastructure/cloudinary/cloudinary.service.js";

import { toCreatePostDTO, toPostDTO } from "../../shared/mappers/post.mapper.js";

import type { Post, PostResponse } from "@daily-pic/shared/types";
import type { PostSchema } from "@daily-pic/shared/schemas";

import { 
  getExistingUserByUsername,
  getExistingUserById,
 } from "../../shared/helpers/getExistingUser.js";

// ========================================
// CREAR 
// ========================================
export async function create(
  userId: number,
  imageBuffer: Buffer | undefined,
  data: PostSchema,
): Promise<Post> {
  const user = getExistingUserById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  if (!data) {
    throw new Error("La imagen es obligatoria");
  }

  let imageUrl: string;
  let imagePublicId: string;

  if (imageBuffer === undefined || imageBuffer === null) {
    throw new Error ("La imagen es obligatoria");
  }

  // Subimos la imagen y obtenemos los datos que necesitamos
  const upload = await cloudinaryService.uploadImage(imageBuffer);
  imageUrl = upload.imageUrl;
  imagePublicId = upload.imagePublicId;
  
  const post = await postsRepository.create({
    userId,
    imageUrl,
    imagePublicId,
    ...data,
  });

  if (!post) {
    throw new Error("Error al crear la publicación");
  }

  return toCreatePostDTO(post);
}

// ========================================
// OBTENER POST
// ========================================
export async function getPost(
  postId: number
): Promise<PostResponse> {
  const post = await postsRepository.findById(postId);

  if (!post) {
    throw new Error("Error al obtener la publicación");
  }

  const user = await getExistingUserById(post.userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return toPostDTO(post, user);
}

// ========================================
// OBTENER MIS POSTS
// ========================================
export async function getPosts(
  userId: number
): Promise<Post[]> {  

  const posts = await postsRepository.findByUserId(userId);
  
  const user = await getExistingUserById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  return posts.map((post) => 
    toPostDTO(post, user)
  );
}

// ========================================
// OBTENER DE USUARIO
// ========================================
export async function getPostsByUsername(
  myUserId: number,
  username: string
): Promise<PostResponse[]> {
  console.log("entre");
  const user = await getExistingUserByUsername(username);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  const relation = await findRelationship(
    myUserId, 
    user.id
  );

  console.log({
    myUserId,
    profileUserId: user.id,
    username,
    isPrivate: user.isPrivate,
    relation,
  });

  if (
    user.isPrivate &&
    relation?.status !== "accepted"
  ) {
    return [];
  }
  
  const posts = await postsRepository.findByUserId(user.id);

  return posts.map((post) => 
    toPostDTO(post, user)
  );
}

// ========================================
// ACTUALIZAR
// ========================================
export async function update(
  userId: number,
  postId: number,
  data: PostSchema
) {
  // Obtenemos el post
  const post = await postsRepository.findById(postId);

  if (!post) {
    throw new Error("El post no existe");
  }

  if (post.userId !== userId) {
    throw new Error("No tienes permiso para editar este post");
  }

  const updatePost = await postsRepository.update(postId, data);

  return updatePost;
}

// ========================================
// ELIMINAR
// ========================================
export async function deleteById(
  userId: number,
  postId: number
) {
  // Buscamos el post a eliminar
  const post = await postsRepository.findById(postId);

  if (!post) {
    throw new Error("El post no existe");
  }

  if (post.userId !== userId) {
    throw new Error("No tienes permiso para eliminar este post");
  }

  await cloudinaryService.deleteImage(post.imagePublicId);
  await postsRepository.deleteById(postId);
}

// ========================================
// CONTAR
// ========================================
export async function countById(
  userId: number
) {
  // Obtenemos el usuario
  const user = await getExistingUserById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }
  
  const count = await postsRepository.countById(userId);

  return count;
}


export { toPostDTO };