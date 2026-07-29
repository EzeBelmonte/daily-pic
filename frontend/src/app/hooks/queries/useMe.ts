import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../useAuth";
import { meQueryOptions } from "./me.query";

export function useMe() {
  const { token } = useAuth();

  return useQuery({
    ...meQueryOptions,
    enabled: !!token,
    retry: false,
  });
}