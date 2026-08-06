import type { Request, Response } from "express";

import * as feedService from "./feed.service.js";
import { decodeCursor } from "../../shared/helpers/InfiniteScrollLoader.js"

// ========================================
// FEED DE CONTACTOS
// ========================================
export async function getFeedAccepted(
  req: Request,
  res: Response
) {
  // Usuario autenticado
  const userId = req.user.userId;

  // Cantidad solicitada
  const requestedLimit = Number(req.query.limit);

  const limit = Math.min(
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? requestedLimit
      : 20,
    30
  );

  // Cursor
  const cursor =
    typeof req.query.cursor === "string"
      ? decodeCursor(req.query.cursor)
      : undefined;

  // Obtenemos el feed
  const feed =
    await feedService.getFeedAccepted(
      userId,
      limit,
      cursor
    );

  return res.status(200).json(feed);
}