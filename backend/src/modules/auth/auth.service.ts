import bcrypt from "bcryptjs";

import * as authRepository from "./auth.repository.js";
import * as sessionsRepository from "./sessions.repository.js";

import { toUserDTO } from "../../shared/mappers/user.mapper.js";

import type { User } from "@daily-pic/shared/types";
import type { RegisterFormSchema, LoginSchema } from "@daily-pic/shared/schemas";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../shared/utils/jwt.js";

import { 
  ConflictError,
  UnauthorizedError,
} from "../../shared/errors/errors.js";

import { verifyRefreshToken } from "../../shared/utils/jwt.js";

// ========================================
// REGISTRO
// ========================================
export async function register(
  data: RegisterFormSchema
): Promise<User> {
  // Buscamos si existe el email
  const existingEmail = await authRepository.findByEmail(data.email);

  if (existingEmail) {
    throw new ConflictError(
      "El email ya existe"
    );
  }

  // Buscamos si existe el usuario
  const existingUsername = await authRepository.findByUsername(data.username);

  if (existingUsername) {
    throw new ConflictError(
      "El usuario ya existe"
    );
  }

  if (data.password !== data.repeatPassword) {
    throw new ConflictError(
      "Las contraseñas no coinciden"
    );
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
    throw new ConflictError(
      "Error al crear el usuario"
    );
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
    throw new UnauthorizedError(
      "Credenciales inválidas"
    );
  }

  // Validamos la contraseña
  const isValidPassword = await bcrypt.compare(
    data.password,
    user.password,
  );

  // Si la contraseña es incorrecta
  if (!isValidPassword) {
    throw new UnauthorizedError(
      "Credenciales inválidas"
    );
  }

  // Creamos el refresh token
  const refreshToken = generateRefreshToken({
    userId: user.id,
  });

  const refreshTokenHash = await bcrypt.hash(
    refreshToken,
    10
  );

  // Duración de la sesión: 30 días
  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + 30
  );

  // Creamos la sesión
  const session = await sessionsRepository.create(
    user.id,
    refreshTokenHash,
    expiresAt
  );

  if (!session) {
    throw new Error(
      "No se pudo crear la sesión"
    );
  }

  // Creamos el access token asociado a la sesión
  const accessToken = generateAccessToken({
    userId: user.id,
    sessionId: session.id,
  });

  return {
    accessToken,
    refreshToken,
  };
}

// ========================================
// REFRESH SESSION
// ========================================
export async function refresh(
  refreshToken: string
) {
  const payload = verifyRefreshToken(refreshToken);

  const sessions = await sessionsRepository.findActiveByUserId(
    payload.userId
  );

  let session = undefined;

  for (const currentSession of sessions) {
    const matches = await bcrypt.compare(
      refreshToken,
      currentSession.refreshTokenHash
    );

    if (matches) {
      session = currentSession;
      break;
    }
  }

  if (!session) {
    throw new UnauthorizedError(
      "Refresh token inválido"
    );
  }

  const accessToken = generateAccessToken({
    userId: payload.userId,
    sessionId: session.id,
  });

  return {
    accessToken,
  };
}

// ========================================
// CERRAR SESIÓN
// ========================================
export async function logout(
  refreshToken: string
) {
  const payload = verifyRefreshToken(refreshToken);

  const sessions = await sessionsRepository.findActiveByUserId(
    payload.userId
  );

  for (const session of sessions) {
    const matches = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash
    );

    if (matches) {
      await sessionsRepository.revoke(session.id);
      return;
    }
  }

  throw new UnauthorizedError(
    "Refresh token inválido"
  );
}