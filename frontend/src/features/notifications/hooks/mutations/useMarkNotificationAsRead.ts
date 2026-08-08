import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import * as notificationsApi
  from "@/api/notifications.api";

import type { AppNotification } from "@daily-pic/shared/types";

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:
      notificationsApi.markAsRead,

    onSuccess: (notification) => {
      queryClient.setQueryData<AppNotification[]>(
        ["notifications"],
        (old) =>
          old?.map((item) =>
            item.id === notification.id
              ? notification
              : item
          )
      );
    },
  });
}