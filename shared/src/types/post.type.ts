import type { User } from "./user.type.js";

// Frontend y Backend
export interface Post { // b
  id: number;

  imageUrl: string;
  imageWidth: number;
  imageHeight: number;

  description: string | null;

  createdAt: string;
}

// Frontend y Backend
export interface PostWithUser extends Post {
  user: User;
}

// Frontend y Backend
export interface PostTopLiked {
  id: number;
  countLikes: number;
  imageUrl: string;
}

// Frontend y Backend
export type MyPosts = {
  posts: Post[];
  nextCursor: string | null;
}

// Frontend y Backend
export type UserPosts = {
  posts: PostWithUser[];
  nextCursor: string | null;
}