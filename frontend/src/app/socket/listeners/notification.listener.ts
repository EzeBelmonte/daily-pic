import type { QueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";

import type { 
  Notification,
} from "@daily-pic/shared/types";


export function registerNotificationListener(
  queryClient: QueryClient
) {
  const handleNotification = (
    notification: Notification,
  ) => {
    console.log(
      "🔔 Nueva notificación:",
      notification
    );

    // Actualizamos queries relacionadas
    switch (notification.type) {
      case "contactRequest":
        queryClient.setQueryData<Notification[]>(
          ["notifications"],
          (old) => [
            notification,
            ...(old ?? []),
          ]
        );

        queryClient.invalidateQueries({
          queryKey: ["contacts", "pending"],
        });
      break;

      case "contactAccepted":
        queryClient.setQueryData<Notification[]>(
          ["notifications"],
          (old) => [
            notification,
            ...(old ?? []),
          ]
        );

        queryClient.invalidateQueries({
          queryKey: ["contacts", "accepted"],
        });

      break;

      case "postLike":
        queryClient.setQueryData<Notification[]>(
          ["notifications"],
          (old) => [
            notification,
            ...(old ?? []),
          ]
        );

        queryClient.invalidateQueries({
          queryKey: ["postlike"],
        });
      break;
    }
  };

  socket.on(
    "notification",
    handleNotification
  );

  return () => {
    socket.off(
      "notification",
      handleNotification
    );
  };
}