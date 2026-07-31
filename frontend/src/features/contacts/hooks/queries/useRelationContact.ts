import { useQuery } from "@tanstack/react-query";

import * as contactsApi from "@/api/contacts.api";

export function useRelationContact(userId: number) {
  return useQuery({
    queryKey: ["contacts", userId],
    queryFn: () => contactsApi.getRelationship(userId),
    enabled: !!userId
  })
}