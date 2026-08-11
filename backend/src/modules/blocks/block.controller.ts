import type { Request, Response } from "express";

import * as blocksService from "./block.service.js";

// ========================================
// BLOQUEAR USUARIO
// ========================================
export async function blockUser(
  req: Request,
  res: Response
) {
  // Usuario que bloquea
  const blockerId = req.user.userId;

  const usernameBlocked = String(req.params.username);

  await blocksService.blockUser(
    blockerId,
    usernameBlocked
  );

  return res.sendStatus(204);
}

// ========================================
// DESBLOQUEAR USUARIO
// ========================================
export async function unblockUser(
  req: Request,
  res: Response
) {

  const userId = req.user.userId;
  
  await blocksService.unblockUser(userId);
  
  return res.sendStatus(204);
}


// ========================================
// OBTENER RELACIÓN 
// ========================================
export async function getBlockBetweenUsers(
  req: Request,
  res: Response
) {

  const userIdA = req.user.userId;

  const username = String(req.params.username);

  const blockRelation = 
    await blocksService.getBlockBetweenUsers(
      userIdA,
      username
    );

  return res.status(200).json(blockRelation);
}