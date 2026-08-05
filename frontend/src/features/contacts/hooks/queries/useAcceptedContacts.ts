import { useQuery } from "@tanstack/react-query";

import * as contactsApi from "@/api/contacts.api";

export function useAcceptedContacts() {
  return useQuery({
    queryKey: ["contacts", "accepted"],
    queryFn: contactsApi.getAccepted,
  });
}