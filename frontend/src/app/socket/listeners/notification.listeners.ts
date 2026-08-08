import type { QueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";

import type { AppNotification } from "@daily-pic/shared/types";

export function registerNotificationListeners(
  queryClient: QueryClient
) {
  const handleNotification = (
    notification: AppNotification
  ) => {
    console.log(
      "🔔 Nueva notificación:",
      notification
    );

    // Actualizamos queries relacionadas
    switch (notification.type) {
      case "contactRequest":
        queryClient.setQueryData<AppNotification[]>(
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
        queryClient.setQueryData<AppNotification[]>(
          ["notifications"],
          (old) =>
            (old ?? []).map((item) =>
              item.id === notification.id
                ? notification
                : item
            )
        );

        queryClient.invalidateQueries({
          queryKey: ["contacts", "accepted"],
        });

        break;

      case "message":
        queryClient.invalidateQueries({
          queryKey: ["message"],
        });

        break;

      case "postLike":
        // No necesitamos invalidar nada
        // por ahora.
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