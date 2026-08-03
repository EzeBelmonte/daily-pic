import { db } from "../../infrastructure/database/db.js";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { RegisterSchema } from "@daily-pic/shared/schemas";

// ========================================
// BUSCAR SI EXISTE EL EMAIL
// ========================================
export async function findByEmail(email: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
};

// ========================================
// BUSCAR SI EXISTE EL USERNAME
// ========================================
export async function findByUsername(username: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
};

// ========================================
// CREAR USUARIO
// ========================================
export async function create(data: RegisterSchema) {
  const [user] = await db
    .insert(users)
    .values({
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      username: data.username,
      password: data.password,
    })
    .returning();

    return user;
};