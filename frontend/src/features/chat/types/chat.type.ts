import type { User } from "@daily-pic/shared/types";

export type ChatMessage = {
  id: number;
  conversationId: number;

  sender: User;

  text: string;

  createdAt: Date;
};