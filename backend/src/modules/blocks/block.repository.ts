import { db } from "../../infrastructure/database/db.js";
import { blocks } from "../../infrastructure/database/schemas/blocks.js";
import { and, eq, or, count } from "drizzle-orm";
import { users } from "../../infrastructure/database/schemas/users.js";

// ========================================
// BLOQUEAR USUARIO
// ========================================
export async function create(
  blockerId: number,
  blockedId: number
) {
  await db
    .insert(blocks)
    .values({
      blockerId,
      blockedId,
    });
}

// ========================================
// DESBLOQUEAR USUARIO
// ========================================
export async function deleteByUserId(
  userId: number
) {
  await db
    .delete(blocks)
    .where(
      eq(blocks.blockerId, userId)
    );
}

// ========================================
// OBTENER RELACIÓN userA <--> userB
// ========================================
export async function findBlockBetweenUsers(
  userIdA: number,
  userIdB: number,
) {
  const [block] = await db
    .select()
    .from(blocks)
    .where(
      or(
        and(
          eq(blocks.blockerId, userIdA),
          eq(blocks.blockedId, userIdB)
        ),
        and(
          eq(blocks.blockerId, userIdB),
          eq(blocks.blockedId, userIdA)
        )
      )
    )
    .limit(1);

  return block;
}