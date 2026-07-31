import api from "./axios";

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