import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

import type { UpdatePost } from "@daily-pic/shared/types";

export function useEditPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: number;
      data: UpdatePost;
    }) => postsApi.editPost(postId, data),

    onSuccess: (_, variables) => {
      // Actualiza el post individual
      queryClient.invalidateQueries({
        queryKey: ["posts", variables.postId],
      });

      // Actualiza las listas de posts
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}