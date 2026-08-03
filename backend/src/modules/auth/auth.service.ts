import bcrypt from "bcryptjs";

import { generateToken } from "../../shared/utils/jwt.js";
import { toUserDTO } from "../../shared/mappers/user.mapper.js";

import * as authRepository from "./auth.repository.js";

import type { User } from "@daily-pic/shared/types";

import type { RegisterFormSchema, LoginSchema } from "@daily-pic/shared/schemas";

// ========================================
// REGISTRO
// ========================================
export async function register(
  data: RegisterFormSchema
): Promise<User> {
  // Buscamos si existe el email
  const existingEmail = await authRepository.findByEmail(data.email);

  if (existingEmail) {
    throw new Error("El email ya existe");
  }

  // Buscamos si existe el usuario
  const existingUsername = await authRepository.findByUsername(data.username);

  if (existingUsername) {
    throw new Error("El usuario ya existe");
  }

  if (data.password !== data.repeatPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  // Hasear la contraseña
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await authRepository.create({
    name: data.name,
    lastname: data.lastname ?? "",
    email: data.email,
    username: data.username,
    password: hashedPassword,
  });

  if (!user) {
    throw new Error("Error al crear el usuario");
  }

  return toUserDTO(user);
}

// ========================================
// INICIO SESIÓN
// ========================================
export async function login(data: LoginSchema) {
  const user = 
    (await authRepository.findByEmail(data.identifier)) ||
    (await authRepository.findByUsername(data.identifier));

  // Si no existe el email o usuario
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Validamos la contraseña
  const isValidPassword = await bcrypt.compare(
    data.password,
    user.password,
  );

  // Si la contraseña es incorrecta
  if (!isValidPassword) {
    throw new Error("Contraseña incorrecta");
  }

  const token = generateToken({
    userId: user.id,
  });

  return { 
    token,
  }
}