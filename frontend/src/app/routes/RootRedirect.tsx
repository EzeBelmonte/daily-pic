import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const RootRedirect = () => {
  const { user } = useAuth();

  return (
    <Navigate
      to={user ? "/home" : "/login"}
      replace
    />
  );
}

export default RootRedirect;