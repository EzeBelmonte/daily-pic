import { useQuery } from "@tanstack/react-query";

import { userQueryOption } from "./user.query";

export function useUser(username: string) {
  return useQuery({
    ...userQueryOption(username),
    enabled: !!username,
  });
}