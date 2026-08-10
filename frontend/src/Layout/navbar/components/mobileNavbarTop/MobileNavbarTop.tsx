import { useScroll } from "@/hooks/useScroll"; 

import { cn } from "@/utils/cn";

import Logo from "@/components/branding/Logo";

import ProfileNavButton from "./ProfileNavButton"
import NotificationNavButton from "./NotificationNavButton";

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

      <Logo 
        className="w-[110px] flex items-center gap-1"
        iconClassName="w-[30px]"
        textClassName="text-white text-[1.1rem]"
      />

      <NotificationNavButton />
    </nav>
  );
}

export default Topbar;