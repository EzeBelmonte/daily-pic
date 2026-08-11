import api from "./api";

import type { Block } from "@daily-pic/shared/types";

// ========================================
// BLOQUEAR
// ========================================
export async function block(
  username: string
) {
  
  await api.post(`/block/add/${username}`);

}

// ========================================
// DESBLOQUEAR
// ========================================
export async function unblock(
  username: string
) {
  
  await api.delete(`/block/remove/${username}`);
  
}

// ========================================
// OBTENER SI HAY BLOQUEO O NO
// ========================================
export async function getBlock(
  username: string
): Promise<Block | null> {
  const response = await api.get<Block | null>(
    `/block/${username}`
  );

  return response.data;
}