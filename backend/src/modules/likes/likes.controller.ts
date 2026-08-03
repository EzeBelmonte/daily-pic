import type { Request, Response } from "express";

import * as likesService from "./likes.service.js";

// ========================================
// CONTAR LIKES
// ========================================
export async function count(
  req: Request,
  res: Response
) {
  try {
    const postId = Number(req.params.postId);

    const likes = await likesService.count(postId);

    return res.status(200).json(likes);
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
export async function like(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    // Obtenemos el ID del post
    const postId = Number(req.params.postId);

    await likesService.like(userId, postId);

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
export async function dislike(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID del usuario
    const userId = req.user.userId;

    // Obtenemos el ID del post
    const postId = Number(req.params.postId);

    await likesService.dislike(userId, postId);

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

    const hasLiked = await likesService.hasLiked(userId, postId);

    return res.status(200).json(hasLiked);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}