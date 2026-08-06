import api from "./api";

import type { 
  Post,
  PostWithUser, 
  PostTopLiked,
  MyPosts,
  UserPosts,
} from "@daily-pic/shared/types";
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
): Promise<Post> {
  const formData = new FormData();

  formData.append("image", image);

  // Obtenemos todos los datos que tengan el CreatePost
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const response =
    await api.post<Post>("/posts", formData);

  return response.data;
}

// ========================================
// ACTUALIZAR POST
// ========================================
export async function update(
  postId: number,
  data: PostSchema
): Promise<Post> {
  const response =
    await api.patch<Post>(
        `/posts/${postId}`,
      data
    );

  return response.data;
}

// ========================================
// OBTENER MIS POSTS
// ========================================
export async function getMyPosts(
  cursor?: string
): Promise<MyPosts> {
  const response = await api.get<MyPosts>(
    "/posts/me",
    {
      params: {
        limit: 20,
        cursor,
      },
    }
  );

  return response.data;
}

// ========================================
// OBTENER POSTS DE USUARIO
// ========================================
export async function getUserPosts(
  username: string,
  cursor?: string
): Promise<UserPosts> {
  const response = await api.get<UserPosts>(
    `/posts/user/${username}`,
    {
      params: {
        limit: 20,
        cursor,
      }
    }
  );

  return response.data;
}

// ========================================
// OBTENER UN POST
// ========================================
export async function getPost(
  postId: number
): Promise<PostWithUser | null> {
  const response =
    await api.get<PostWithUser | null>(`/posts/${postId}`);

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
// OBTENER ESTADO SI PUEDE PUBLICAR
// ========================================
export async function getPublicationStatus(
): Promise<PublicationStatus> {
  const response =
    await api.get<PublicationStatus>("/posts/publication-status");

  return response.data;
}

// ========================================
// TOP 3 POSTS
// ========================================
export async function getTopLikedPosts(
): Promise<PostTopLiked[] | []> {
  const response =
    await api.get<PostTopLiked[] | []>("/posts/top-liked");

  return response.data;
}