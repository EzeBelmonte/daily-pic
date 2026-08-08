import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import * as notificationsApi
  from "@/api/notifications.api";

import type { NotificationWithSender } from "@daily-pic/shared/types";

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:
      notificationsApi.markAsRead,

    onSuccess: (notification) => {
      queryClient.setQueryData<NotificationWithSender[]>(
        ["notifications"],
        (old) =>
          old?.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  read: notification.read,
                }
              : item
          )
      );
    },
  });
}