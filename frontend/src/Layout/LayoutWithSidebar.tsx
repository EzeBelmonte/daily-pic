import AppLayout from "./AppLayout";

import DesktopSidebarRight from "./navbar/components/desktopSidebarRight/DesktopSidebarRight";

import CreatePostFloatingButton from "@/Layout/navbar/components/mobileNavbarBottom/CreatePostFloatingButton";

const LayoutWithSidebar = () => {
  return (
    <>
      <AppLayout>
        <DesktopSidebarRight />
        <CreatePostFloatingButton />
      </AppLayout>
    </>
  );
}

export default LayoutWithSidebar;