import type { QueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";


export function registerPostLikeListener(
  queryClient: QueryClient
) {
  const handleLike = () => {
    queryClient.invalidateQueries({
      queryKey: ["postlike"],
    });
  };

  socket.on("addLike", handleLike);

  return () => {
    socket.off("addLike", handleLike)
  }
};
