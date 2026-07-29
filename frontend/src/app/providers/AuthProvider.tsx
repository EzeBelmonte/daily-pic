import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { useQueryClient } from "@tanstack/react-query";

import type { AuthContextType } from "../types/app.type";
import { registerLogout } from "@/app/services/auth.service";

export const AuthContext =
  createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;

  // El useCallback recuerda la función y no la está creando por cada render
  const login = useCallback((token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");

    setToken(null);

    queryClient.clear();
  }, [queryClient]);

  // Cuando alguien pide de manera global un logout, se ejecuta
  useEffect(() => {
    registerLogout(logout);
  }, [logout]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated,
      isLoading,

      login,
      logout,
    }),
    [token, isAuthenticated, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}