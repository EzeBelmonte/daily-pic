import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../errors/AppError.js";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: "Error interno del servidor",
  });
}