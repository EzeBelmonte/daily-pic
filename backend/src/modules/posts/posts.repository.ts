import { eq, desc, count } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

import { posts } from "../../infrastructure/database/schemas/posts.js";
import { db } from "../../infrastructure/database/db.js";

import type { UpdatePost } from "@shared/index.js";

type NewPost = InferInsertModel<typeof posts>;


// ========================================
// CREAR POST
// ========================================
export async function createPost(
  data: NewPost
) {
  const [post] = await db
    .insert(posts)
    .values(data)
    .returning();
  
  return post;
}

// ========================================
// OBTENER POST
// ========================================
export async function findById(id: number) {
  return await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
  });
}

// ========================================
// OBTENER TODOS LOS POST DE UN USUARIO
// ========================================
export async function findByUserId(userId: number) {
  return await db.query.posts.findMany({ // findMany devuelve un arreglo con los post del usuario
    where: (posts, { eq }) => eq(posts.userId, userId),
    orderBy: (posts) => [desc(posts.createdAt)],
  });
}

// ========================================
// EDITAR POST
// ========================================
export async function updatePost(
  postId: number,
  data: UpdatePost
) {
  const [post] = await db
    .update(posts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, postId))
    .returning();

  return post;
}

// ========================================
// ELIMINAR POST
// ========================================
export async function deletePost(
  postId: number
) {
  const [post] = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning()

  return post;
}

// ========================================
// CONTAR FOTOS SUBIDAS
// ========================================
export async function countPost(
  userId: number
): Promise<number> {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(posts)
    .where(eq(posts.userId, userId));

  return result?.count ?? 0;
}