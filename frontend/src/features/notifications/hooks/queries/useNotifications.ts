import { useQuery } from "@tanstack/react-query";

import * as notificationApi from "@/api/notifications.api";

import type { NotificationWithSender } from "@daily-pic/shared/types";

export function useNotifications() {
  return useQuery<NotificationWithSender[]>({
    queryKey: ["notifications"],
    queryFn: notificationApi.getNotifications,
  });
}