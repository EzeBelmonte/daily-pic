import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as blocksAPi from "@/api/blocks.api";

export function useAddBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) =>
      blocksAPi.block(username),

    onSuccess: (_, username) => {
      queryClient.invalidateQueries({
        queryKey: ["blocks", username],
      });
    },
  });
}