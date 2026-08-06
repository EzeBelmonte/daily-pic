import type { QueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";

import type { AppNotification } from "@/features/notifications/types/notification.type";

export function registerNotificationListeners(
  queryClient: QueryClient
) {
    const handleNotification = (notification: AppNotification) => {
      console.log("🔔 Nueva notificación:", notification);

      switch (notification.type) {
        case "contactRequest":
          queryClient.invalidateQueries({
            queryKey: ["contacts", "pending"],
          });
          break;

        case "contactAccepted":
          queryClient.invalidateQueries({
            queryKey: ["contacts"],
          });
          break;
        
        case "chatRequest":
          queryClient.invalidateQueries({
            queryKey: ["chats", "requests"],
          });
          break;
      }
    
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    }

  socket.on("notification", handleNotification);

  return () => {
    socket.off("notification", handleNotification);
  }
}