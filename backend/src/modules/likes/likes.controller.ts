import type { Request, Response } from "express";

import * as likesService from "./likes.service.js";

// ========================================
// CONTAR LIKES
// ========================================
export async function getLikes(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    const response = await likesService.countLikes(userId);

    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// DAR LIKE
// ========================================
export async function addLike(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    // Obtenemos el ID del post
    const postId = Number(req.params.postId);

    await likesService.addLike(userId, postId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// QUITAR LIKE
// ========================================
export async function removeLike(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    // Obtenemos el ID del post
    const postId = Number(req.params.postId);

    await likesService.removeLike(userId, postId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// YA DIO LIKE
// ========================================
export async function hasLiked(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    // Obtenemos el ID del post
    const postId = Number(req.params.postId);

    await likesService.hasLiked(userId, postId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}