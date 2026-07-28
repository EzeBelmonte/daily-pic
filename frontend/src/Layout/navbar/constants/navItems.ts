import { House, UserRound, Search, Settings } from "lucide-react";

// Opciones del menú
export const navItems = [
  { 
    id: "home",
    label: "Inicio", 
    href: "/",
    icon: House,
  },
  { 
    id: "profile",
    label: "Perfil", 
    href: "/profile",
    icon: UserRound,
  },
  {
    id: "search",
    label: "Buscar",
    href: "",
    icon: Search
  },
  { 
    id: "configuration",
    label: "Configuración",
    href: "/config",
    icon: Settings
  },
];