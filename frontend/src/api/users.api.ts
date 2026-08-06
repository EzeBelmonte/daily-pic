import api from "./api";

import type {  
  CompleteUser,
} from "@daily-pic/shared/types";

import type { UserUpdateSchema } from "@daily-pic/shared/schemas";

// ========================================
// MI USUARIO
// ========================================
export async function getMe(
): Promise<CompleteUser | null> {
  const response =
    await api.get<CompleteUser | null>("/users/me");

  return response.data;
}

// ========================================
// ACTUALIZAR MI USUARIO
// ========================================
export async function updateMe(
  image: File | null,
  data: UserUpdateSchema
) {
  const formData = new FormData();

  if (image) {
    formData.append("image", image);
  }
  // Obtenemos todos los datos recibidos
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  await api.patch<CompleteUser>("/users/me", formData);
}

// ========================================
// OBTENER USUARIO
// ========================================
export async function getUserByUsername(
  username: string
): Promise<CompleteUser | null> {
  const response =
    await api.get<CompleteUser | null>(`/users/${username}`);

  return response.data;
}
