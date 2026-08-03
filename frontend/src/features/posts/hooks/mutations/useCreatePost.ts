import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

import type { PostSchema } from "@daily-pic/shared/schemas"; 

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      image,
      data,
    }: {
      image: File;
      data: PostSchema;
    }) => postsApi.createPost(image, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}