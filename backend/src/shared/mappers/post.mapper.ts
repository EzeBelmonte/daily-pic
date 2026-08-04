import type { InferSelectModel } from "drizzle-orm";

import { posts } from "../../infrastructure/database/schemas/posts.js";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { Post, PostResponse } from "@daily-pic/shared/types";

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
    imagePublicId: post.imagePublicId,
    imageWidth: post.imageWidth,
    imageHeight: post.imageHeight,
    description: post.description ?? "",

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
    imagePublicId: post.imagePublicId,
    imageWidth: post.imageWidth,
    imageHeight: post.imageHeight,
    description: post.description ?? "",

    createdAt: post.createdAt.toString(),
  };
}

// ========================================
// OBTENER POSTS DE USUARIOS
// ========================================
export function toUserPostDTO(
  post: PostType,
  user: UserType
): PostResponse {
  return {
    id: post.id,
    imageUrl: post.imageUrl,
    imagePublicId: post.imagePublicId,
    imageWidth: post.imageWidth,
    imageHeight: post.imageHeight,
    description: post.description ?? "",

    user: {
      id: user.id,
      username: user.username,
    },

    createdAt: post.createdAt.toString(),
  };
}