import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@shared/index";
import type { AuthContextType } from "../types/app.type";
import { getMe } from "@/api/users.api";
import { registerLogout } from "@/app/services/auth.service";

export const AuthContext =
  createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // El useCallback recuerda la función y no la está creando por cada render
  const login = useCallback(async (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);

    const user = await getMe();
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  }, []);

  // Cuando alguien pide de manera global un logout, se ejecuta
  useEffect(() => {
    registerLogout(logout);
  }, []);

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await getMe();

        setUser(user);
      } catch (error) {
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, [token]);


  const value = useMemo(
    () => ({
      user,
      token,

      isAuthenticated,
      isLoading,

      login,
      logout,
    }),
    [user, token, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}