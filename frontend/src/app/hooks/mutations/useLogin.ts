import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as authApi from "@/api/auth.api";
import { meQueryOptions } from "../queries/me.query";

import { useAuth } from "../useAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
  mutationFn: authApi.login,

  onSuccess: async (data) => {
    const { accessToken } = data;

    login(accessToken);

    await queryClient.fetchQuery(meQueryOptions);
  },
});
}