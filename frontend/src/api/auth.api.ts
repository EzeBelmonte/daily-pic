import api from "@/api/axios";

import type { LoginResponse } from "@shared/index";

import type { RegisterSchema, LoginSchema } from "@/features/auth/schemas/auth.schema";

// ========================================
// REGISTRO
// ========================================
export async function register(
  data: RegisterSchema
) {
  const response =
    await api.post("/auth/register", data);

  return response.data;
}

// ========================================
// INICIO SESIÓN
// ========================================
export async function login(
  data: LoginSchema
) {
  const response =
    await api.post<LoginResponse>(
      "/auth/login",
      data
    );

  return response.data;
}