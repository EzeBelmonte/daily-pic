import type { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../errors/errors.js";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Guardamos todo lo que viene con el token
  const authHeader = req.headers.authorization;

  // Verificamos si lo recibimos bien 
  if (!authHeader) {
    return next(
      new UnauthorizedError("Token requerido")
    );
  }

  const[scheme, token] = authHeader.split(" ");

  // B e a r e r _ e y J h ...
  // 0 1 2 3 4 5 6 7
  // El token arranca a partir de la posición 7, entonces guardamos todo lo que viene desde esa posición en adelante
  if (scheme !== "Bearer" || !token) {
    return next(
      new UnauthorizedError("Token inválido")
    );
  }

  try {
    // Verificamos el token
    const payload = verifyToken(token);
    
    // Lo guardamos para poder usarlo en cualquier parte del backend
    req.user = payload;

    next();
  } catch (error) {
    return next(
      new UnauthorizedError("Token inválido")
    );
  }
}