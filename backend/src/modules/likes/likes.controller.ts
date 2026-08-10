import type { Request, Response } from "express";

import * as likesService from "./likes.service.js";

import { getIO } from "../../socket.js";

// ========================================
// CONTAR LIKES
// ========================================
export async function count(
  req: Request,
  res: Response
) {
  const postId = Number(req.params.postId);

  const likes = await likesService.count(postId);

  return res.status(200).json(likes);
}

// ========================================
// DAR LIKE
// ========================================
export async function like(
  req: Request,
  res: Response
) {
  // Obtenemos el ID del usuario
  const userId = req.user.userId;

  // Obtenemos el ID del post
  const postId = Number(req.params.postId);
  
  const {
    addresseeId,
    notification,
  } = await likesService.like(userId, postId);

  if (notification) {
    getIO()
      .to(`user:${addresseeId}`)
      .emit("notification", notification);
  }

  return res.sendStatus(204);
}

// ========================================
// QUITAR LIKE
// ========================================
export async function dislike(
  req: Request,
  res: Response
) {
  // Obtenemos el ID del usuario
  const userId = req.user.userId;

  // Obtenemos el ID del post
  const postId = Number(req.params.postId);

  await likesService.dislike(userId, postId);

  return res.sendStatus(204);
}

// ========================================
// YA DIO LIKE?
// ========================================
export async function hasLiked(
  req: Request,
  res: Response
) {
  // Obtenemos el ID del usuario
  const userId = req.user.userId;

  // Obtenemos el ID del post
  const postId = Number(req.params.postId);

  const hasLiked = await likesService.hasLiked(userId, postId);

  return res.status(200).json(hasLiked);
}