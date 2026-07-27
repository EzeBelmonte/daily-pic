import api from "./axios";

import type {  
  User,
  CompleteUser,
  UpdateUser
} from "@shared/index";

// ========================================
// MI USUARIO
// ========================================
export async function getMe() {
  const response =
    await api.get<User>("/users/me");

  return response.data;
}

// ========================================
// OBTENER PERFIL
// ========================================
export async function getMyProfile() {
  const response =
    await api.get<CompleteUser>("/users/profile");

  return response.data;
}


// ========================================
// ACTUALIZAR PERFIL
// ========================================
export async function updateProfile(
  image: File | null,
  data: UpdateUser
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
    await api.patch<CompleteUser>("/users/config", formData);

  return response.data;
}