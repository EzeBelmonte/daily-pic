import { useScroll } from "@/hooks/useScroll";

import { navItems } from "../../constants/navItems";
import { cn } from "@/utils/cn";
import NavItem from "../NavItem";

type Props = {
  className?: string;
}

const MobileNavbarBottom = ({ className = "" }:Props) => {
  const { scrollingUp } = useScroll();

  return (
    <nav 
      id="mobile-menu"
      aria-hidden={!scrollingUp}
      className={cn(`
        flex justify-around
        fixed bottom-0 left-0 w-full
        bg-[rgb(31,31,31)] text-white
        z-50 shadow-xl
        px-2 py-1.5

        transform transition-all duration-200 ease-in
      `,

      className,

      scrollingUp
        ? "translate-y-0 opacity-100"
        : "translate-y-12 opacity-0"
    )}
    
    >
      {navItems
        .filter((item) => item.showOn.includes("mobile"))
        .map((item) => (
          <NavItem
            key={item.id}
            item={item}
          />
      ))}
    </nav>
  );
}

export default MobileNavbarBottom;