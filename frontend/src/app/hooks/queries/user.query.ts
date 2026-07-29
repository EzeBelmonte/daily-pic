import { queryOptions } from "@tanstack/react-query";

import * as usersApi from "@/api/users.api";

export function userQueryOption(username: string) {
  return queryOptions({
    queryKey: ["user", username],
    queryFn: () => usersApi.getUserByUsername(username),
  });
}