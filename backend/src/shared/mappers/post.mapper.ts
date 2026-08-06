import { type InferSelectModel } from "drizzle-orm";

import { posts } from "../../infrastructure/database/schemas/posts.js";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { Post, PostWithUser, PostTopLiked } from "@daily-pic/shared/types";

type PostType = InferSelectModel<typeof posts>;
type UserType = InferSelectModel<typeof users>;

// ========================================
// CREAR POST
// ========================================
export function toCreatePostDTO(
  post: PostType,
): Post {
  return {
    id: post.id,
    imageUrl: post.imageUrl,
    imageWidth: post.imageWidth,
    imageHeight: post.imageHeight,

    description: post.description ?? null,

    createdAt: post.createdAt.toISOString(),
  };
}

// ========================================
// OBTENER MIS POSTS
// ========================================
export function toPostDTO(
  post: PostType,
): Post {
  return {
    id: post.id,
    imageUrl: post.imageUrl,
    imageWidth: post.imageWidth,
    imageHeight: post.imageHeight,
    description: post.description ?? null,

    createdAt: post.createdAt.toString(),
  };
}

// ========================================
// OBTENER POSTS DE USUARIOS
// ========================================
export function toUserPostDTO(
  post: PostType,
  user: UserType
): PostWithUser {
  return {
    id: post.id,
    imageUrl: post.imageUrl,
    imageWidth: post.imageWidth,
    imageHeight: post.imageHeight,
    description: post.description ?? null,

    user: {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
    },

    createdAt: post.createdAt.toString(),
  };
}

// ========================================
// OBTENER TOP 3 POSTS
// ========================================
export function toTopLikedPost(
  post: PostType,
  likes: number,
) {
  return {
    id: post.id,
    countLikes: likes,
    imageUrl: post.imageUrl,
  }
}