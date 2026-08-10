import { useQuery } from "@tanstack/react-query";

import * as notificationApi
  from "@/api/notifications.api";

import type { Notification }
  from "@daily-pic/shared/types";

export function useNotifications() {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: notificationApi.getNotifications,
  });
}