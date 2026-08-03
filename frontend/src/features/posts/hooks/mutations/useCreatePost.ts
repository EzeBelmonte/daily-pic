import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as postsApi from "@/api/posts.api";

import type { CreatePost } from "@daily-pic/shared/types";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      image,
      data,
    }: {
      image: File;
      data: CreatePost;
    }) => postsApi.createPost(image, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}