import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as likesApi from "@/api/likes.api";

export function useAddLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => 
      likesApi.like(postId),
    
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({
        queryKey: ["likes", postId],
      });
    },
  });
}