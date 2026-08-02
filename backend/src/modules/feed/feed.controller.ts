import type { Request, Response } from "express";

import * as feedService from "./feed.service.js";
import { decodeCursor } from "./feed.cursor.js";

// ========================================
// FEED DE CONTACTOS
// ========================================
export async function getContactsFeed(
  req: Request,
  res: Response
) {
  try {
    const userId = req.user.userId;

    const limit = Math.min(
      Number(req.query.limit) || 20,
      50
    );

    const cursor =
      typeof req.query.cursor === "string"
        ? decodeCursor(req.query.cursor)
        : undefined;

    const feed =
      await feedService.getContactsFeed(
        userId,
        limit,
        cursor
      );

    return res.status(200).json(feed);

  } catch (error) {
    console.error("❌ ERROR FEED:", error);
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error desconocido",
    });
  }
}