import Logo from "@/components/branding/Logo";

import { navItems } from "../../constants/navItems";
import ProfileNavButton from "../mobileNavbarTop/ProfileNavButton";

import NavItem from "../NavItem";

import CreatePostMenuButton from "./CreatePostMenuButton";
import NotificationBadge from "@/features/notifications/components/NotificationBadge";

const DesktopSidebarLeft = () => {

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
        className="w-[180px] flex items-center gap-1 justify-center"
        iconClassName="w-[50px]"
        textClassName="text-white text-[2rem]"
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

              {item.id === "notifications" && (
                <NotificationBadge />
              )}
            </div>
          ))
        }
      </div>

      <ProfileNavButton 
        variant={"expanded"} 
        className="mt-auto mb-3"
      />
    </nav>
  );
}

export default DesktopSidebarLeft;