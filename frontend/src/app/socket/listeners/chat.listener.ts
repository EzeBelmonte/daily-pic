import type { QueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";

import type { ChatMessage } from "@/features/chat/types/chat.type";

export function registerChatListener(
  queryClient: QueryClient
) {
  const handleMessage = (message: ChatMessage) => {
    queryClient.setQueryData<ChatMessage[]>(
      ["messages", message.conversationId],
      (old = []) => [...old, message]
    );

    queryClient.invalidateQueries({
      queryKey: ["conversations"],
    });
  };

  socket.on("chatMessage", handleMessage);

  return () => {
    socket.off("chatMessage", handleMessage);
  };
}