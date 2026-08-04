import type { Request, Response } from "express";

import * as userService from "./users.service.js";

import { userUpdateSchema } from "@daily-pic/shared/schemas"

// ========================================
// OBTENER MI USUARIO
// ========================================
export async function getMe(
  req: Request,
  res: Response
) {
  // Obtenemos el ID usuario logueado
  const userId = req.user.userId;

  // Obtenemos el perfil propio
  const profile = await userService.getMe(userId);

  // Retornamos el perfil
  return res.status(200).json(profile);
}

// ========================================
// ACTUALIZAR USUARIO
// ========================================
export async function updateMe(
  req: Request,
  res: Response
) {
  // Obtenemos el ID usuario logueado
  const userId = req.user.userId;

  // Como el boolean viene en string, aca lo volvemos boolean
  const body = {
    ...req.body,
    ...(req.body.isPrivate !== undefined && {
      isPrivate: req.body.isPrivate === "true",
    }),
  };

  // Obtenemos los datos actualizados
  const data = userUpdateSchema.parse(body);

  // Obtener perfil del usuario
  const profile = await userService.updateMe(
    userId,
    req.file?.buffer,
    data
  );

  // Retornamos el perfil
  return res.status(200).json(profile);
}


// ========================================
// OBTENER PERFIL DE USUARIO 
// ========================================
export async function getUser(
  req: Request,
  res: Response
) {
  // Obtenemos el usuario buscado
  const username = String(req.params.username);

  // Obtenemos el perfil propio
  const profile = await userService.getUserByUsername(username);

  // Retornamos el perfil
  return res.status(200).json(profile);
}