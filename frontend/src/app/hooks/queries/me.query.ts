import { queryOptions } from "@tanstack/react-query";

import * as usersApi from "@/api/users.api";

export const meQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: usersApi.getMe,
});