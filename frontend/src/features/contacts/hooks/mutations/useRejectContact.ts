import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as contactsApi from "@/api/contacts.api";

export function useRejectContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      userId,
    }: {
      requestId: number;
      userId: number;
    }) => contactsApi.deleteRequest(requestId),

    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["contacts", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["contacts", "pending"],
      });

      queryClient.invalidateQueries({
        queryKey: ["contacts", "accepted"],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"]
      });

      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
    },
  });
}