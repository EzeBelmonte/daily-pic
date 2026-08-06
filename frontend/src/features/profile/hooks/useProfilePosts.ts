import { useMyPosts } from "@/features/posts/hooks/queries/useMyPosts";
import { useUserPosts } from "@/features/posts/hooks/queries/useUserPosts";

export function useProfilePosts(username?: string) {
  // Verificar si estoy visitando o no un perfil
  const isVisitor = !!username;
  
  // Mis posts
  const myPosts = useMyPosts(!isVisitor);
  // Post de usuario
  const userPosts = useUserPosts(username);

  // Guardamos los posts dependiendo el caso
  const query  = isVisitor
    ? userPosts
    : myPosts;

  const posts = query.data?.pages.flatMap(
    (page) => page.posts
  ) ?? [];

  return {
    posts,

    isLoading: query.isLoading,
    error: query.error,

    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchNextPageError,

    fetchNextPage: query.fetchNextPage,

    refetch: query.refetch,
  }
}