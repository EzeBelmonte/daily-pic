import { Outlet } from "react-router-dom";

import Navbar from "./navbar/Navbar";

import CreatePostFloatingButton from "@/Layout/navbar/components/buttons/CreatePostFloatingButton";

const MainLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 mt-10 sm:mt-2 sm:grid-cols-[220px_minmax(0,1fr)]">
      <Navbar />

      <main className="min-w-0">
        <Outlet />
      </main>

      <CreatePostFloatingButton />
    </div>
  );
}

export default MainLayout;