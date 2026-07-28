import { cn } from "@/utils/cn";

import { navItems } from "../constants/navItems";
import NavItem from "./NavItem";

type Props = {
  className?: string;
}

const DesktopSidebar = ({ className = "" }: Props) => {

  return (
    <nav className={cn(`
        border border-e-[#e0d5d5]
        flex-col items-center
      `,
      className
    )}>
      <div className="
        flex flex-col 
        gap-7 mt-20
      ">
        {navItems.map((item) => (
          <NavItem 
            key={item.id} 
            item={item} 
            showLabel={true}
            className="
              text-white
              flex items-center 
              gap-2 px-4 py-2
              hover:bg-[rgba(255,255,255,0.1)] rounded
              text-[1.05rem] font-semibold

              transition-colors duration-200
            "
          />
        ))}
      </div>
    </nav>
  );
}

export default DesktopSidebar;