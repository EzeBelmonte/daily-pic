import api from "./axios";

import type {  
  CompleteUser,
  UpdateMe
} from "@shared/index";

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
  data: UpdateMe
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
