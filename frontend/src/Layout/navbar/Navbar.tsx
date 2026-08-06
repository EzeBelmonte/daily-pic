import DesktopSidebarLeft from "./components/desktopSidebarLeft/DesktopSidebarLeft";
import MobileNavbarTop from "./components/mobileNavbarTop/MobileNavbarTop"
import MobileNavbarBottom from "./components/mobileNavbarBottom/MobileNavbarBottom";

const Navbar = () => {
  
  return (
    <>
      <MobileNavbarTop className="sm:hidden" />
      <MobileNavbarBottom className="sm:hidden" />

      <div className="hidden sm:block">
        <div className="
          fixed
          top-0 left-0
          h-screen w-[220px]
          border-e border-[rgba(255,255,255,0.4)]
          px-2
        ">
          <DesktopSidebarLeft />
        </div>
      </div>
    </>
  );
}

export default Navbar;