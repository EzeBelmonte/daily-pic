import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
    <main className="min-w-0">
      <Outlet />
    </main>
  );
}

export default AuthLayout;