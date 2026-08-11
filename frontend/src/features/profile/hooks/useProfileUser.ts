import { useMe } from "@/app/hooks/queries/useMe";
import { useUser } from "@/app/hooks/queries/useUser";

export function useProfileUser(username?: string) {
  // Siempre necesitamos saber quién soy yo
  const meQuery = useMe();

  // Solo se ejecuta cuando estamos visitando otro perfil
  const userQuery = useUser(username ?? "");

  // Se obtiene mis datos o del usuario dependiendo el caso
  const user = username
    ? userQuery.data
    : meQuery.data;

  const isOwner = !!user && !!meQuery.data
    ? user.id === meQuery.data.id
    : false;

  const isLoading = username
    ? userQuery.isLoading || meQuery.isLoading
    : meQuery.isLoading;

  const error = username
    ? userQuery.error
    : meQuery.error;

  return {
    user,
    isOwner,
    isLoading,
    error,
  }
}