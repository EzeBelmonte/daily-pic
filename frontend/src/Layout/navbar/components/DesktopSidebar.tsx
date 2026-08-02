import { usePendingContacts } from "@/features/contacts/hooks/queries/usePendingContacts";

import Logo from "@/components/branding/Logo";

import { navItems } from "../constants/navItems";
import ProfileNavButton from "./buttons/ProfileNavButton";

import NavItem from "./NavItem";

import CreatePostMenuButton from "./buttons/CreatePostMenuButton";

const DesktopSidebar = () => {
  const { 
    data: pendingContacts,
  } = usePendingContacts();

  const pendingCount = pendingContacts?.length ?? 0;

  const itemStyle = `
    text-white text-[1.05rem] font-semibold 
    flex items-center 
    gap-2 px-4 py-2
    hover:bg-[rgba(255,255,255,0.1)] rounded 
    transition-colors duration-200
  `;

  return (
    <nav className="flex flex-col h-[100%] pt-5">
      <Logo 
        className="w-[180px]" 
        iconScale={0.6}
        iconY={50}
        textX={-50}
        centered 
      />

      <div className="
        flex flex-col 
        gap-3 mt-10
      ">
        <CreatePostMenuButton className={itemStyle}/>

        {navItems
          .filter((item) => item.showOn.includes("desktop"))
          .map((item) => (
            <div 
              key={item.id} 
              className="relative" 
            >
              <NavItem 
                item={item} 
                showLabel={true}
                className={itemStyle}
              />

              {pendingCount > 0 && item.id === "notifications" && (
                <span className="
                  absolute
                  top-0.5 right-10
                  min-w-4
                  h-4
                  px-1
                  rounded
                  bg-red-500
                  text-white text-[10px]
                  flex items-center justify-center
                ">
                  {pendingCount}
                </span>
              )}
          </div>
        ))}
      </div>

      <ProfileNavButton 
        variant={"expanded"} 
        className="mt-auto mb-3"
      />
    </nav>
  );
}

export default DesktopSidebar;