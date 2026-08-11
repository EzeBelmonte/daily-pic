import { getExistingUserByUsername } from "../../shared/helpers/getExistingUser.js";
import * as blocksRepository from "./block.repository.js";

import type { Block } from "@daily-pic/shared/types";

// ========================================
// BLOQUEAR USUARIO
// ========================================
export async function blockUser(
  blockerId: number,
  username: string,
) {

  const userBlocked = await getExistingUserByUsername(username);
  
  const blockedId = userBlocked.id;

  await blocksRepository.create(
    blockerId,
    blockedId,
  );

}

// ========================================
// DESBLOQUEAR USUARIO
// ========================================
export async function unblockUser(
  userId: number
) {
  
  await blocksRepository.deleteByUserId(userId);
  
}

// ========================================
// OBTENER RELACIÓN 
// ========================================
export async function getBlockBetweenUsers(
  userIdA: number,
  username: string
): Promise<Block | null> {
  
  const userB = await getExistingUserByUsername(username);

  const userIdB = userB.id;

  const block = 
    await blocksRepository.findBlockBetweenUsers(
      userIdA,
      userIdB,
    );

  return block ?? null;
}