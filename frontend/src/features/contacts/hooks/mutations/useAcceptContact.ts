import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as contactsApi from "@/api/contacts.api";

export function useAcceptContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: number) => 
      contactsApi.acceptRequest(requestId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts", "pending"],
      });

      queryClient.invalidateQueries({
        queryKey: ["contacts", "accepted"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
}