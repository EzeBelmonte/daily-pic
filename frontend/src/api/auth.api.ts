import api from "@/api/axios";

import type { RegisterSchema, LoginSchema } from "@daily-pic/shared/schemas";

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
export async function login(data: LoginSchema) {
  const response = await api.post("/auth/login", data);

  return response.data;
}