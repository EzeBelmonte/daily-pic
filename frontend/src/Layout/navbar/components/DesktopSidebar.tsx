import { navItems } from "../constants/navItems";

import NavItem from "./NavItem";

import CreatePostMenuButton from "./CreatePostMenuButton";

const DesktopSidebar = () => {
  const itemStyle = `
    text-white text-[1.05rem] font-semibold 
    flex items-center 
    gap-2 px-4 py-2
    hover:bg-[rgba(255,255,255,0.1)] rounded 
    transition-colors duration-200
  `;

  return (
    <nav className="flex-col items-center">
      <div className="
        flex flex-col 
        gap-7 mt-20
      ">
        <CreatePostMenuButton className={itemStyle}/>

        {navItems.map((item) => (
          <NavItem 
            key={item.id} 
            item={item} 
            showLabel={true}
            className={itemStyle}
          />
        ))}
      </div>
    </nav>
  );
}

export default DesktopSidebar;