import api from "./axios";

import type {  
  CompleteUser,
} from "@daily-pic/shared/types";

import type { UserUpdateSchema } from "@daily-pic/shared/schemas";

// ========================================
// MI USUARIO
// ========================================
export async function getMe() {
  const response =
    await api.get<CompleteUser>("/users/me");

  return response.data;
}

// ========================================
// ACTUALIZAR MIS DATOS
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

  const response = 
    await api.patch<CompleteUser>("/users/me", formData);

  return response.data;
}


// ========================================
// OBTENER USUARIO
// ========================================
export async function getUserByUsername(
  username: string
) {
  const response =
    await api.get<CompleteUser>(`/users/${username}`);

  return response.data;
}
