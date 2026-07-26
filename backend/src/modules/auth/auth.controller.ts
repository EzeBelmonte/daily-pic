import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema.js";

import type { CreateUserDTO } from "@shared/index.js";

import * as authService from "./auth.service.js";

// ========================================
// REGISTRO
// ========================================
export async function register(
  req: Request, 
  res: Response
) {
  try {
    // Parseamos para inpedir que el apellido sea undefined
    const parsed = registerSchema.parse(req.body);

    // Guardamos los datos recibido del frontend
    const data: CreateUserDTO = {
      name: parsed.name,
      email: parsed.email,
      username: parsed.username,
      password: parsed.password,
      ...(parsed.lastname !== undefined
        ? { lastname: parsed.lastname }
        : {}),
    };

    const user = await authService.register(data);

    // Retornamos el usuario registrado
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// ========================================
// INICIO SESIÓN
// ========================================
export async function login(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos los datos del inicio de sesión
    const data = loginSchema.parse(req.body);

    const result = await authService.login(data);

    // Retornamos la sesión
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}