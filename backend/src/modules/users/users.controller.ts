import type { Request, Response } from "express";

import * as userService from "./users.service.js";

import type { UpdateUser } from "@shared/index.js";

// ========================================
// OBTENER MI USUARIO
// ========================================
export async function getMe(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtenemos el perfil propio
    const profile = await userService.getMe(userId);

    // Retornamos el perfil
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER USUARIO COMPLETO
// ========================================
export async function getMyCompleteUser(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtenemos el perfil propio
    const profile = await userService.getMyCompleteUser(userId);

    // Retornamos el perfil
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER PERFIL DE USUARIO 
// ========================================
export async function getCompleteUser(
  req: Request,
  res: Response
) {
  try {
    // Obtenemos el usuario buscado
    const username = String(req.params.username);

    // Obtenemos el perfil propio
    const profile = await userService.getCompleteUser(username);

    // Retornamos el perfil
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}

// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateProfileUser(
  req: Request,
  res: Response
) {
  try {
  
    // Obtenemos el ID usuario logueado
    const userId = req.user.userId;

    // Obtenemos los datos actualizados
    const data: UpdateUser = {
      ...req.body,
      isPrivate: req.body.isPrivate === "true",
    };

    // Obtener perfil del usuario
    const profile = await userService.updateUser(
      userId,
      req.file?.buffer,
      data
    );

    // Retornamos el perfil
    return res.status(200).json(profile);
    
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}