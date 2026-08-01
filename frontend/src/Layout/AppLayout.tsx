import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { cn } from "@/utils/cn";

import Navbar from "./navbar/Navbar";

type Props = {
  children?: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const hasChildren = !!children;

  return (
    <div className={cn(`
      min-h-screen 
      grid grid-cols-1 sm:mt-0 sm:grid-cols-[220px_minmax(0,1fr)]`,
      hasChildren && "tablet:grid-cols-[220px_minmax(0,1fr)_230px]"
    )}>
      <Navbar />

      <main className="min-w-0">
        <Outlet />
      </main>

      {children}
    </div>
  );
}

export default AppLayout;