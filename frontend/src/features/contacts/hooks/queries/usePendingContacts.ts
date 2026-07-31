import { useQuery } from "@tanstack/react-query";

import * as contactsApi from "@/api/contacts.api";

export function usePendingContacts() {
  return useQuery({
    queryKey: ["contacts", "pending"],
    queryFn: () => contactsApi.getPending(),
  });
}