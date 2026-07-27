import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
}

export function ProtectedRoute({
  children
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  // Esperando a que termine de verificar el token
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  // Verificar si está o no autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Está autenticado
  return children;
}