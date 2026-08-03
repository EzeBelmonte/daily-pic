import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as usersApi from "@/api/users.api";
import { meQueryOptions } from "../queries/me.query";

import type { UserUpdateSchema } from "@daily-pic/shared/schemas";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      image,
      data,
    }: {
      image: File | null;
      data: UserUpdateSchema;
    }) => usersApi.updateMe(image, data),

    onSuccess: () => {
      // Esto indica que la información que existia del usuario no es confiable
      // Entonces, si algún componente tiene useUser(), lo ejecuta automáticamente
      // y se actualiza el caché
      queryClient.invalidateQueries({
        queryKey: meQueryOptions.queryKey,
      });
    },
  });
}