import { eq, desc, count } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

import { posts } from "../../infrastructure/database/schemas/posts.js";
import { db } from "../../infrastructure/database/db.js";

import type { PostSchema } from "@daily-pic/shared/schemas";

type NewPost = InferInsertModel<typeof posts>;


// ========================================
// CREAR POST
// ========================================
export async function create(
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
export async function update(
  postId: number,
  data: PostSchema
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
export async function deleteById(
  postId: number
) {
  const [post] = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning()

  return post;
}

// ========================================
// CONTAR POSTS
// ========================================
export async function countById(
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

// ========================================
// ÚLTIMO POST
// ========================================
export async function findLastByUserId(userId: number) {
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.userId, userId))
    .orderBy(desc(posts.createdAt))
    .limit(1);

  return post;
}