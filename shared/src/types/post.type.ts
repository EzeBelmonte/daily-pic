import type { PostSchema } from "../schemas/post.schema.js";
import type { User } from "./user.type.js";

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
  user: User;
}

// Frontend y Backend
export interface PostTopLiked {
  id: number;
  countLikes: number;
  imageUrl: string;
}

// Frontend
export type MyPosts = {
  posts: Post[];
  nextCursor: string | null;
}

// Frontend
export type UserPosts = {
  posts: PostResponse[];
  nextCursor: string | null;
}