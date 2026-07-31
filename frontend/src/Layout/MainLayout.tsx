import { Outlet } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import CreatePostFloatingButton from "@/Layout/navbar/components/CreatePostFloatingButton";

const MainLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 sm:grid-cols-[200px_minmax(0,1fr)]">
      <Navbar />

      <main className="min-w-0">
        <Outlet />
      </main>

      <CreatePostFloatingButton />
    </div>
  );
}

export default MainLayout;