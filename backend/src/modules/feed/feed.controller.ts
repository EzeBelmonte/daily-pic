import type { Request, Response } from "express";

import * as feedService from "./feed.service.js";
import { decodeCursor } from "./feed.cursor.js";

// ========================================
// FEED DE CONTACTOS
// ========================================
export async function getAccepted(
  req: Request,
  res: Response
) {
  try {
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
      await feedService.getAccepted(
        userId,
        limit,
        cursor
      );

    return res.status(200).json(feed);

  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}