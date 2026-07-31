import DesktopSidebar from "./components/DesktopSidebar";
import MobileNavbar from "./components/MobileNavbar";

const Navbar = () => {
  
  return (
    <>
      <MobileNavbar className="sm:hidden" />

      <div className="hidden sm:block">
        <div
          className="
            fixed
            top-0 left-0
            h-screen w-[200px]
            border border-e-[rgba(255,255,255,0.4)]
            px-2
          "
        >
          <DesktopSidebar />
        </div>
      </div>
    </>
  );
}

export default Navbar;