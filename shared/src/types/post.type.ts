import type { PostSchema } from "../schemas/post.schema.js";

// Frontend y Backend
export interface Post extends PostSchema { // b
  id: number;
  imageUrl: string;
  imagePublicId: string;

  imageWidth: number;
  imageHeight: number;

  createdAt: string;
}

// Frontend y Backend
export interface PostResponse extends Post {
  user: {
    id: number;
    username: string;
  };
}