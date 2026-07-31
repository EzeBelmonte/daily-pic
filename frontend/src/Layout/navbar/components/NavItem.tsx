import { Link } from "react-router-dom";

import type { NavItemData } from "../types/navItem.type";

type Props = {
  item: NavItemData;
  showLabel?: boolean;
  className?: string;
}

const NavItem = ({ 
  item, 
  showLabel = false, 
  className = "" ,
}: Props) => {
  const Icon = item.icon;

  return (
    <Link 
      to={item.href}
      className={className}
    >
      <Icon size={20} />

      {showLabel && item.label}
    </Link>
  );
}

export default NavItem;