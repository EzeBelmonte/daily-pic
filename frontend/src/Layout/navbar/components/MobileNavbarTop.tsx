import { useScroll } from "@/hooks/useScroll"; 

import logo from "@/assets/daliy_pic.svg";

import { cn } from "@/utils/cn";
import { Image } from "@/components";

import ProfileNavButton from "./buttons/ProfileNavButton"
import NotificationNavButton from "./buttons/NotificationNavButton";

type Props = {
  className?: string;
}

const Topbar = ({ className }: Props) => {
  const { scrollingUp } = useScroll();

  return (
    <nav className={cn(`
      w-full
      flex justify-between items-center
      fixed top-0 left-0
      px-4 py-1
    bg-[rgb(31,31,31)] text-white
    
      transform transition-all duration-200 ease-in
      `,
      scrollingUp
        ? "translate-y-0 opacity-100"
        : "-translate-y-10 opacity-0",
      className
    )}>
      <ProfileNavButton 
        variant={"compact"} 
      />

      <Image 
        src={logo}
        alt="Logo"
        className="w-30"
      />

      <NotificationNavButton />
    </nav>
  );
}

export default Topbar;