import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { verifyAccessToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../errors/errors.js";

export function optionalAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  // No hay token:
  // continuamos como usuario no autenticado.
  if (!authHeader) {
    return next();
  }

  const [scheme, token] = authHeader.split(" ");

  // Hay header, pero está mal formado.
  if (scheme !== "Bearer" || !token) {
    return next(
      new UnauthorizedError("Token inválido")
    );
  }

  try {
    // Verificamos el access token.
    const payload = verifyAccessToken(token);

    // Si es válido, guardamos el usuario.
    req.user = payload;

    return next();
  } catch (error) {
    return next(
      new UnauthorizedError("Token inválido")
    );
  }
}
