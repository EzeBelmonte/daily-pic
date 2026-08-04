import { eq, and, isNull } from "drizzle-orm";

import { db } from "../../infrastructure/database/db.js";
import { sessions } from "../../infrastructure/database/schemas/sessions.js";

// ========================================
// CREAR SESIÓN
// ========================================
export async function create(
  userId: number,
  refreshTokenHash: string,
  expiresAt: Date
) {
  const [session] = await db
    .insert(sessions)
    .values({
      userId,
      refreshTokenHash,
      expiresAt,
    })
    .returning();

  return session;
}

// ========================================
// BUSCAR SESIÓN
// ========================================
export async function findActiveByUserId(
  userId: number
) {
  return db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.userId, userId),
        isNull(sessions.revokedAt)
      )
    );
}

// ========================================
// REVOCAR SESIÓN
// ========================================
export async function revoke(
  id: number
) {
  const [session] = await db
    .update(sessions)
    .set({
      revokedAt: new Date(),
    })
    .where(eq(sessions.id, id))
    .returning();

  return session;
}