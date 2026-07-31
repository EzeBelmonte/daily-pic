import * as postsRepository from "./posts.repository.js";
import * as cloudinaryService from "../../infrastructure/cloudinary/cloudinary.service.js";

import { toCreatePostDTO, toPostDTO } from "../../shared/mappers/post.mapper.js";

import type { CreatePost, Post, PostResponse, UpdatePost } from "@shared/index.js";

import { 
  getExistingUserByUsername,
  getExistingUserById,
 } from "../../shared/helpers/getExistingUser.js";

// ========================================
// CREAR POST
// ========================================
export async function createPost(
  userId: number,
  imageBuffer: Buffer | undefined,
  data: CreatePost,
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
  
  const post = await postsRepository.createPost({
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
// OBTENER MIS POST
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
// ACTUALIZAR POST
// ========================================
export async function updatePost(
  userId: number,
  postId: number,
  data: UpdatePost
) {
  // Obtenemos el post
  const post = await postsRepository.findById(postId);

  if (!post) {
    throw new Error("El post no existe");
  }

  if (post.userId !== userId) {
    throw new Error("No tienes permiso para editar este post");
  }

  const updatePost = await postsRepository.updatePost(postId, data);

  return updatePost;
}

// ========================================
// ELIMINAR POST
// ========================================
export async function deletePost(
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
  await postsRepository.deletePost(postId);
}

// ========================================
// CONTAR POSTS
// ========================================
export async function countPost(
  userId: number
) {
  // Obtenemos el usuario
  const user = await getExistingUserById(userId);

  if (!user) {
    throw new Error("El usuario no existe");
  }
  
  const count = await postsRepository.countPost(userId);

  return count;
}


// ========================================
// OBTENER POST DE USUARIO
// ========================================
export async function getPostsByUsername(
  username: string
): Promise<Post[]> {
  const user = await getExistingUserByUsername(username);

  if (!user) {
    throw new Error("El usuario no existe");
  }

  if (user.isPrivate) {
    return [];
  }
  
  const posts = await postsRepository.findByUserId(user.id);

  return posts.map((post) => 
    toPostDTO(post, user)
  );
}