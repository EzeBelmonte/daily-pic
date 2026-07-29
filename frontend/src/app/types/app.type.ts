import type { 
  CompleteUser,
  UpdateUser,
  Post,
} from "@shared/index";

import type { PostSchema } from "@/features/posts/schemas/posts.schema";

// ========================================
// AUTH
// ========================================
export interface AuthContextType {
  token: string | null;
  isLoading: boolean;

  isAuthenticated: boolean;

  login: (token: string) => void;
  logout: () => void;

}

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
    data: UpdateUser
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
// FOLLOWS
// ========================================
