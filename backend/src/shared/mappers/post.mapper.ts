import type { InferSelectModel } from "drizzle-orm";

import { posts } from "../../infrastructure/database/schemas/posts.js";

import type { Post } from "@shared/index.js";

type Posts = InferSelectModel<typeof posts>;

export function toPostDTO(
  post: Posts
): Post {
  return {
    id: post.id,
    imageUrl: post.imageUrl,
    imagePublicId: post.imagePublicId,
    description: post.description ?? "",
    createdAt: post.createdAt.toISOString(),
  };
}