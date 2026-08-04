import api from "./api";

import type { Post, PostResponse } from "@daily-pic/shared/types";
import type { PostSchema } from "@daily-pic/shared/schemas";

export interface PublicationStatus {
  canPublish: boolean;
  nextPublicationAt: string | null;
}

// ========================================
// CREAR POST
// ========================================
export async function create(
  image: File,
  data: PostSchema
) {
  const formData = new FormData();

  formData.append("image", image);

  // Obtenemos todos los datos que tengan el CreatePost
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const response =
    await api.post("/posts", formData);

  return response.data;
}

// ========================================
// OBTENER MIS POSTS
// ========================================
export async function getMyPosts() {
  const response =
    await api.get<Post[]>("/posts/me");

  return response.data;
}

// ========================================
// EDITAR POST
// ========================================
export async function update(
  postId: number,
  data: PostSchema
) {
  const response =
    await api.patch<PostSchema>(
        `/posts/${postId}`,
      data
    );

  return response.data;
}

// ========================================
// ELIMINAR POST
// ========================================
export async function deleteRequest(
  postId: number
) {
  const response = 
    await api.delete(`/posts/${postId}`);

  return response.data;
}

// ========================================
// OBTENER UN POST
// ========================================
export async function getPost(
  postId: number
) {
  const response =
    await api.get<PostResponse>(`/posts/${postId}`);

  return response.data;
}

// ========================================
// OBTENER TODOS LOS POSTS DE UN USUARIO
// ========================================
export async function getUserPosts(
  username: string
) {
  const response =
    await api.get<PostResponse[]>(`/posts/user/${username}`);

  return response.data;
}

// ========================================
// OBTENER ESTADO SI PUEDE PUBLICAR
// ========================================
export async function getPublicationStatus(): Promise<PublicationStatus> {
  const response =
    await api.get("/posts/publication-status");

  return response.data;
}