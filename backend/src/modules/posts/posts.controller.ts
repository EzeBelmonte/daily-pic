import type { Request, Response } from "express";

import * as postsService from "./posts.service.js";

import { postSchema } from "@daily-pic/shared/schemas";

// ========================================
// CREAR POST
// ========================================
export async function create(
  req: Request,
  res: Response
) {
  // ID del usuario autenticado
  const userId = req.user.userId;
  
  // Validamos los datos del body
  const data = postSchema.parse(req.body);

  // Creamos el post
  const post = await postsService.create(
    userId,
    req.file?.buffer,
    data,
  );

  // Retornamos el post
  return res.status(201).json(post);
}

// ========================================
// OBTENER UN POST
// ========================================
export async function getPost(
  req: Request,
  res: Response
) {
  // Obtenemos el ID del post
  const postId = Number(req.params.postId);

  // Obtenemos el post
  const post = await postsService.getPost(postId);

  // Retornamos el post
  return res.status(201).json(post);
}

// ========================================
// OBTENER MIS POST
// ========================================
export async function getMyPosts(
  req: Request,
  res: Response
) {
  // Obtenemos el ID del usuario
  const userId = req.user.userId;

  const posts = await postsService.getPosts(userId);

  // Retornamos los posts
  return res.status(201).json(posts);
}

// ========================================
// OBTENER DE USUARIO
// ========================================
export async function getUserPosts(
  req: Request,
  res: Response
) {
  // Obtenemos mi ID
  const myUserId = req.user.userId;

  // Obtenemos el ID del usuario
  const username = String(req.params.username);

  const posts = await postsService.getPostsByUsername(myUserId, username);

  // Retornamos los posts
  return res.status(201).json(posts);
}

// ========================================
// ACTUALIZAR POSTS
// ========================================
export async function update(
  req: Request,
  res: Response
) {
  // Obtenemos el ID del usuario
  const userId = req.user.userId;

  // Obtenemos el ID del post
  const postId = Number(req.params.postId);

  // Obtenmos los datos actualizados
  const data = postSchema.parse(req.body);

  // Obtenemos el post actualizado
  const post = await postsService.update(
    userId,
    postId,
    data
  );

  // Retornamos el post
  return res.status(200).json(post);
}

// ========================================
// ELIMINAR POSTS
// ========================================
export async function deleteRequest(
  req: Request,
  res: Response
) {
  // Obtenemos el ID del usuario
  const userId = req.user.userId;

  // Obtenemos el ID del post
  const postId = Number(req.params.postId);

  // Eliminamos el post
  await postsService.deleteById(
    userId,
    postId
  );

  // Devolvemos mensaje de exito
  return res.status(200).send();
}

// ========================================
// OBTENER ESTADO SI PUEDE PUBLICAR
// ========================================
export async function getPublicationStatus(
  req: Request,
  res: Response
) {
  const userId = req.user.userId;

  const status = await postsService.getPublicationStatus(
    userId
  );

  return res.status(200).json(status);
}

// ========================================
// TOP 3 POSTS
// ========================================
export async function getTopLikedPosts(
  req: Request,
  res: Response
) {
  const userId = req.user.userId;

  const top = await postsService.getTopLikedPosts(userId);

  return res.status(200).json(top);
}