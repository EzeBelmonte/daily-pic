import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "@/app/hooks/useAuth";
import { usePosts } from "@/app/hooks/usePosts";

import Navbar from "./navbar/Navbar";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const { clearPosts } = usePosts();

  useEffect(() => {
    if (!isAuthenticated) {
      clearPosts();
    }
  }, [isAuthenticated, clearPosts]);

  return (
    <div className="min-h-screen grid grid-cols-1 sm:grid-cols-[200px_minmax(0,1fr)]">
      <Navbar />

      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;