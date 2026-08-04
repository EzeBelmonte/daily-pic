import type { Request, Response } from "express";

import { registerFormSchema, loginSchema } from "@daily-pic/shared/schemas";

import * as authService from "./auth.service.js";

import { UnauthorizedError } from "../../shared/errors/errors.js";

// ========================================
// REGISTRO
// ========================================
export async function register(
  req: Request, 
  res: Response
) {
  // Parseamos para inpedir que el apellido sea undefined
  const data = registerFormSchema.parse(req.body);

  const user = await authService.register(data);

  // Retornamos el usuario registrado
  return res.status(201).json(user);
}

// ========================================
// INICIO SESIÓN
// ========================================
export async function login(
  req: Request,
  res: Response
) {
  const data = loginSchema.parse(req.body);

  const {
    accessToken,
    refreshToken,
  } = await authService.login(data);

  res.cookie(
    "refreshToken",
    refreshToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    }
  );

  return res.status(200).json({
    accessToken,
  });
}

// ========================================
// REFRESH SESSION
// ========================================
export async function refresh(
  req: Request,
  res: Response
) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new UnauthorizedError(
      "Refresh token requerido"
    );
  }

  const tokens = await authService.refresh(
    refreshToken
  );

  return res.status(200).json(tokens);
}

// ========================================
// CERRAR SESIÓN
// ========================================
export async function logout(
  req: Request,
  res: Response
) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new UnauthorizedError(
      "Refresh token requerido"
    );
  }

  await authService.logout(refreshToken);
return res.status(200).json({
  message: "Sesión cerrada correctamente",
});
 // return res.status(204).send();
}