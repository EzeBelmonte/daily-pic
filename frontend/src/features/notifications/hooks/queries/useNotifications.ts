import { useQuery } from "@tanstack/react-query";

import * as notificationApi from "@/api/notifications.api";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationApi.getNotifications,
  });
}