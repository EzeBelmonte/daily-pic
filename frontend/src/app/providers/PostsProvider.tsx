import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

import * as postApi from "@/api/posts.api";

import type { PostContextType } from "../types/app.type";
import type { Post } from "@shared/index";
import type { PostSchema } from "@/features/posts/schemas/posts.schema";

import { getErrorMessage } from "@/utils/getErrorMessage";

export const PostContext =
  createContext<PostContextType | null>(null);

type Props = {
  children: ReactNode;
}

export function PostsProvider({ children }: Props) {
  // ========================================
  // ESTADOS
  // ========================================
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // ========================================
  // CREAR POST
  // ========================================
  const createPost = useCallback(async(
    image: File,
    data: PostSchema
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const newPost = await postApi.createPost(image, data);

      if (loaded) {
        setPosts((current) => [newPost, ...current]);
      }

      return newPost;
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [loaded]);

  // ========================================
  // ELIMINAR POST
  // ========================================
  const deletePost = useCallback(async(
    postId: number
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      await postApi.deletePost(postId);

      if (loaded) {
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post.id !== postId)
        );
      }
      
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [loaded]);

  // ========================================
  // OBTENER MIS POSTS
  // ========================================
  const getPosts = useCallback(async (force = false) => {
    // Así la primera vez carga, y las siguientes reutiliza los datos, salvo que se pase force = true
    if (loaded && !force) return;

    try {
      setIsLoading(true);
      setError(null);

      const posts = await postApi.getPosts();

      setPosts(posts);
      setLoaded(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [loaded]);

  // ========================================
  // LIMPIAR ESTADOS
  // ========================================
  const clearPosts = useCallback(() => {
    setPosts([]);
    setLoaded(false);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      // Estado
      posts,
      isLoading,
      error,
      
      // Acciones
      createPost,
      deletePost,
      clearPosts,
      getPosts,
    }),
    [posts, isLoading, error, getPosts, clearPosts, createPost, deletePost]
  );

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}