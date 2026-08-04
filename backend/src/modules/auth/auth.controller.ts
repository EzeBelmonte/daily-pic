import type { Request, Response } from "express";

import { registerFormSchema, loginSchema } from "@daily-pic/shared/schemas";

import * as authService from "./auth.service.js";

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
  // Obtenemos los datos del inicio de sesión
  const data = loginSchema.parse(req.body);

  const token = await authService.login(data);

  // Retornamos el token
  return res.status(201).json(token);
}