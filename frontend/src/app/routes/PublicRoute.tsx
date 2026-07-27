import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type PublicRouteProps = {
  children: ReactNode;
};

export function PublicRoute({
  children,
}: PublicRouteProps) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  // Esperando a que termine de verificar el token
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  // Si ya está autenticado, lo redirigimos al inicio
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // No está autenticado, puede acceder a la ruta
  return children;
}