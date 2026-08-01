import AppLayout from "./AppLayout";

import SidebarInformation from "./navbar/SidebarInformation";

import CreatePostFloatingButton from "@/Layout/navbar/components/buttons/CreatePostFloatingButton";

const LayoutWithSidebar = () => {
  return (
    <>
      <AppLayout>
        <SidebarInformation />
        <CreatePostFloatingButton />
      </AppLayout>
    </>
  );
}

export default LayoutWithSidebar;