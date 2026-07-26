import type { InferSelectModel } from "drizzle-orm";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { User, CompleteUser } from "@shared/index.js";

type Users = InferSelectModel<typeof users>;

// ========================================
// OBTENER USUARIO
// ========================================
export function toUserDTO(
  user: Users,
): User {
  return {
    id: user.id,
    name: user.name,
    lastname: user.lastname || "",
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  }
}

// ========================================
// OBTENER DATOS COMPLETOS
// ========================================
export function toCompleteUserDTO(
  user: Users,
  contactsCount: number,
  postsCount: number,
): CompleteUser {
  return {
    id: user.id,
    name: user.name,
    lastname: user.lastname || "",
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    bio: user.bio || "",
    isPrivate: user.isPrivate,

    contactsCount,
    postsCount,

    createdAt: user.createdAt.toISOString(),
  }
}