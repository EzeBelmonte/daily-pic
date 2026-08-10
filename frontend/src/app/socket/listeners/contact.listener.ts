import type { QueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";

export function registerContactListener(
  queryClient: QueryClient
) {
  const handleAccepted = () => {
    queryClient.invalidateQueries({
      queryKey: ["contacts"],
    });
  };

  socket.on("contactAccepted", handleAccepted);

  return () => {
    socket.off("contactAccepted", handleAccepted);
  };
}