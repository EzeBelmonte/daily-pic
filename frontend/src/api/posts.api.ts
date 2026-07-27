import api from "./axios";

import type { CreatePost, Post, UpdatePost } from "@shared/index";

// ========================================
// CREAR POST
// ========================================
export async function createPost(
  image: File,
  data: CreatePost
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
export async function getPosts() {
  const response =
    await api.get<Post[]>("/posts/me");

  return response.data;
}

// ========================================
// EDITAR POST
// ========================================
export async function editPost(
  postId: number
) {
  const response =
    await api.patch<UpdatePost>(`/posts/${postId}`);

  return response.data;
}

// ========================================
// ELIMINAR POST
// ========================================
export async function deletePost(
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
    await api.get<Post>(`/posts/${postId}`);

  return response.data;
}

// ========================================
// OBTENER TODOS LOS POSTS DE UN USUARIO
// ========================================
export async function getUserPosts(
  username: string
) {
  const response =
    await api.get<Post[]>(`/posts/user/${username}`);

  return response.data;
}

// ========================================
// CONTAR LIKES
// ========================================
export async function getLikes(
  postId: number
) {
  const response =
    await api.get(`/posts/${postId}/count`);

  return response.data;
}

// ========================================
// DAR LIKE
// ========================================
export async function addLike(
  postId: number
) {

  await api.post(`/posts/${postId}/add-like`);

}

// ========================================
// QUITAR LIKE
// ========================================
export async function removeLike(
  postId: number
) {

  await api.post(`/posts/${postId}/remove-like`);

}

// ========================================
// YA DIO LIKE
// ========================================
export async function hasLiked(
  postId: number
) {
  const response =
    await api.get(`/posts/${postId}/has-liked`);

  return response.data;
}