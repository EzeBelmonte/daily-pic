import { db } from "../../infrastructure/database/db.js";
import { eq } from "drizzle-orm";

import { users } from "../../infrastructure/database/schemas/users.js";

import type { UpdateUser } from "@shared/index.js";
import type { ImageItem } from "../../shared/types/uploadedImage.type.js";

// ========================================
// OBTENER DATOS DEL USUARIO
// ========================================
export async function findById(userId: number) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
};


// ========================================
// OBTENER USUARIO MEDIANTE USERNAME
// ========================================
export async function findUserByUsername(username: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      posts: true, // Representa información adicional
    },
  });
}

// ========================================
// ACTUALIZAR USUARIO
// ========================================
export async function update(
  userId: number,
  data: UpdateUser,
  image?: ImageItem,
) {
  const values = {
    ...data,
    updatedAt: new Date(),
    ...(image && {
      profileImageUrl: image.imageUrl,
      profileImagePublicId: image.imagePublicId,
    }),
  };

  const [user] = await db
    .update(users)
    .set(values)
    .where(eq(users.id, userId))
    .returning();

  return user;
}