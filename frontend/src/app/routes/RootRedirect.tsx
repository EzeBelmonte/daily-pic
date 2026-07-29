import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Navigate
      to={isAuthenticated ? "/home" : "/login"}
      replace
    />
  );
}

export default RootRedirect;