import DesktopSidebar from "./components/DesktopSidebar";
import MobileNavbar from "./components/MobileNavbar";

const Navbar = () => {

  return (
    <>
      <MobileNavbar className="sm:hidden" />
      <DesktopSidebar className="hidden sm:flex" />
    </>
  );
}

export default Navbar;