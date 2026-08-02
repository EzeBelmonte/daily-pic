import type { 
  CompleteUser,
  UpdateMe,
  Post,
} from "@shared/index";

import type { PostSchema } from "@/features/posts/schemas/posts.schema";

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
    data: UpdateMe
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
