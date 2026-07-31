import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as contactsApi from "@/api/contacts.api";

export function useAddContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) =>
      contactsApi.addContact(userId),

    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({
        queryKey: ["contacts", userId],
      });
    },
  });
}