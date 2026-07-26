import type { Request, Response } from "express";

import * as postService from "./posts.service.js";

import type { UpdatePost } from "@shared/index.js";

// ========================================
// CREAR POST
// ========================================
export async function createPost(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;
    
    // Datos del post, en este caso el único que tenemos que es la descripción
    const data = req.body;

    // Creamos el post
    const post = await postService.createPost(
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
    const post = await postService.getPost(postId);

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
export async function getPosts(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    const posts = await postService.getPosts(userId);

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
// ACTUALIZAR POST
// ========================================
export async function updatePost(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    // Obtenemos el ID del post
    const postId = Number(req.params.postId);

    // Obtenmos los datos actualizados
    const data: UpdatePost = req.body;

    // Obtenemos el post actualizado
    const post = await postService.updatePost(
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
// ELIMINAR POST
// ========================================
export async function deletePost(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    // Obtenemos el ID del post
    const postId = Number(req.params.postId);

    // Eliminamos el post
    await postService.deletePost(
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

// ========================================
// OBTENER POSTS DE USUARIO
// ========================================
export async function getUserPosts(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const username = String(req.params.username);

    const posts = await postService.getPostsByUsername(username);

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