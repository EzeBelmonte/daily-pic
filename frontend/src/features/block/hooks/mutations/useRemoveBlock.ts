import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as blocksAPi from "@/api/blocks.api";

export function useRemoveBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) =>
      blocksAPi.unblock(username),

    onSuccess: (_, username) => {
      queryClient.invalidateQueries({
        queryKey: ["blocks", username],
      });
    },
  });
}