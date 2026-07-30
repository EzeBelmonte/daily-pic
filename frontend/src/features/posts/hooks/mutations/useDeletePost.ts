import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) =>
      postsApi.deletePost(postId),

    onSuccess: (_, postId) => {
      // Eliminamos/actualizamos el post individual
      queryClient.removeQueries({
        queryKey: ["posts", postId],
      });

      // actualizamos las listas de posts
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}