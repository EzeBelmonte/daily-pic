import { createContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";

import * as usersApi from "@/api/users.api";

import type { UserContextType } from "../types/app.type";
import type { CompleteUser, UpdateUser } from "@shared/index";

import { getErrorMessage } from "@/utils/getErrorMessage";

export const UserContext =
  createContext<UserContextType | null>(null);

type Props = {
  children: ReactNode;
}

export function UserProvider({ children }: Props) {
  // ========================================
  // ESTADOS
  // ========================================
  const [completeUser, setCompleteUser] = useState<CompleteUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // ========================================
  // OBTENER PERFIL
  // ========================================
  const getUser = useCallback(async (force = false) => {
    // Así la primera vez carga, y las siguientes reutiliza los datos, salvo que se pase force = true
    if (loaded && !force) return;

    try {
      setIsLoading(true);
      setError(null);

      const user = await usersApi.getMyProfile();

      setCompleteUser(user);
      setLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [loaded]);

  useEffect(() => {
    getUser();
  }, []); // [getProfile]

  // ========================================
  // ACTUALIZAR PERFIL
  // ========================================
  const updateUser = useCallback(
  async (
    image: File | null,
    data: UpdateUser
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedUser =
        await usersApi.updateProfile(image, data);

      // Actualizamos el perfil local con la respuesta
      setCompleteUser(updatedUser);
      setLoaded(true);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========================================
  // LIMPIAR ESTADOS
  // ========================================
  const clearUser = useCallback(() => {
    setCompleteUser(null);
    setLoaded(false);
    setError(null);
  }, []);
  /*useEffect(() => {
    if (!token) {
      clearProfile();
      return;
    }

    getProfile(true);
  }, [token]);*/

  const value = useMemo(
    () => ({
      // Estado
      completeUser,
      isLoading,
      error,
      
      // Acciones
      getUser,
      updateUser,
      clearUser,
    }),
    [completeUser, isLoading, error, getUser, updateUser, clearUser]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}