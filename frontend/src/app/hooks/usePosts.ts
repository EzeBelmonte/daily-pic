import { useContext } from "react";
import { PostContext } from "../providers/PostsProvider";

export function usePosts() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error(
      "usePost debe usarse dentro de PostProvider"
    );
  }

  return context;
}