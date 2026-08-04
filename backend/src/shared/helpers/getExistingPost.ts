import * as postsRepository from "../../modules/posts/posts.repository.js";

import { NotFoundError } from "../errors/errors.js";

export async function getExistingPostsById(
  postId: number
) {
  const post = await postsRepository.findById(postId);

  if (!post) {
    throw new NotFoundError(
      "Error al obtener la publicación"
    );
  }

  return post;
}