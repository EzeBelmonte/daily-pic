import type { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../errors/errors.js";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  // Token no enviado
  if (!authHeader) {
    return next(
      new UnauthorizedError("Token requerido")
    );
  }

  const [scheme, token] = authHeader.split(" ");

  // Formato incorrecto
  if (scheme !== "Bearer" || !token) {
    return next(
      new UnauthorizedError("Token inválido")
    );
  }

  try {
    // Verificamos el access token
    const payload = verifyAccessToken(token);

    // Guardamos el payload para los controllers
    req.user = payload;

    return next();
  } catch(error) {
    return next(
      new UnauthorizedError("Token inválido")
    );
  }
}