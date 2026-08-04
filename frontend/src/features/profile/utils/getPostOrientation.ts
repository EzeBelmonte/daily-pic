import type { Post } from "@daily-pic/shared/types";

export type PostOrientation =
 | "portrait"
 | "landscape"
 | "square";

export function getPostOrientation(
  post: Post
): PostOrientation {
  const ratio = post.imageWidth / post.imageHeight;

  if (ratio <0.9) {
    return "portrait";
  }

  if (ratio > 1.1) {
    return "landscape";
  }

  return "square";
}