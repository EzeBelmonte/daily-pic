import { socket } from "@/lib/socket";

export function useSocketActions() {
  const sendMessage = (
    conversationId: string,
    content: string,
  ) => {
    socket.emit("sendMessage", {
      conversationId,
      content,
    });
  }

  const sendContactRequest = (
    receiverId: string,
  ) => {
    socket.emit("sendContactRequest", {
      receiverId,
    });
  }

  const typing = (
    conversationId: string,
  ) => {
    socket.emit("typing", {
      conversationId,
    });
  }

  return {
    sendMessage,
    sendContactRequest,
    typing,
  }
}