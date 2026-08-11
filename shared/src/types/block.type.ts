// ========================================
// ESTRUCTURA DE LOS BLOQUEOS
// ========================================
export interface Block {
  id: number;
  blockerId: number;
  blockedId: number;
  createdAt: Date;
}