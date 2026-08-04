import DesktopSidebar from "./components/DesktopSidebar";
import MobileNavbarTop from "./components/MobileNavbarTop"
import MobileNavbarBottom from "./components/MobileNavbarBottom";

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
          <DesktopSidebar />
        </div>
      </div>
    </>
  );
}

export default Navbar;