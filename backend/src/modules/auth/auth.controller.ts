import type { Request, Response } from "express";
import { loginSchema } from "./auth.schema.js";

import type { CreateUserForm } from "./auth.type.js";

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
    //const parsed = registerSchema.parse(req.body);

    // Guardamos los datos recibido del frontend
    /*const data = {
      name: parsed.name,
      email: parsed.email,
      username: parsed.username,
      password: parsed.password,
      ...(parsed.lastname !== undefined
        ? { lastname: parsed.lastname }
        : {}),
    };*/

    // Parseamos para inpedir que el apellido sea undefined
    const formData: CreateUserForm = req.body;

    const user = await authService.register(formData);

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

    const token = await authService.login(data);

    // Retornamos el token
    return res.status(201).json(token);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}