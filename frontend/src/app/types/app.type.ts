import type { 
  CompleteUser,
  Post,
} from "@daily-pic/shared/types";

import type { UserUpdateSchema } from "@daily-pic/shared/schemas";

import type { PostSchema } from "@daily-pic/shared/schemas";

// ========================================
// USER
// ========================================
export interface UsersContextType {
  // Estado
  completeUser: CompleteUser | null;
  isLoading: boolean;
  error: string | null;

  getUser: (force?: boolean) => Promise<void>;
  updateUser: (
    image: File | null,
    data: UserUpdateSchema
  ) => Promise<void>;
   clearUser: () => void;
}

// ========================================
// POST
// ========================================
export interface PostContextType {
  // Estado
  posts: Post[];
  isLoading: boolean;
  error: string | null;

  // Acciones
  getPosts: (force?: boolean) => Promise<void>;
  createPost: (
    image: File,
    data: PostSchema
  ) => Promise<Post>;

  deletePost: (postId: number) => Promise<void>;
  clearPosts: () => void;
}

// ========================================
// 
// ========================================
