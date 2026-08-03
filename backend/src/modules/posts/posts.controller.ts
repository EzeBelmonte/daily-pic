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
  try {
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

  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER UN POST
// ========================================
export async function getPost(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del post
    const postId = Number(req.params.postId);

    // Obtenemos el post
    const post = await postsService.getPost(postId);

    // Retornamos el post
    return res.status(201).json(post);

  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER MIS POST
// ========================================
export async function getMyPosts(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    const posts = await postsService.getPosts(userId);

    // Retornamos los posts
    return res.status(201).json(posts);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER DE USUARIO
// ========================================
export async function getUserPosts(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos mi ID
    const myUserId = req.user.userId;

    // Obtenemos el ID del usuario
    const username = String(req.params.username);

    const posts = await postsService.getPostsByUsername(myUserId, username);

    // Retornamos los posts
    return res.status(201).json(posts);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// ACTUALIZAR
// ========================================
export async function update(
  req: Request,
  res: Response
) {
  try {
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

  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// ELIMINAR
// ========================================
export async function deleteRequest(
  req: Request,
  res: Response
) {
  try {
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

  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}