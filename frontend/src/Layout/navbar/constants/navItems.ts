import { House, UserRound, Search, Settings } from "lucide-react";

// Opciones del menú
export const navItems = [
  { 
    label: "Inicio", 
    href: "/",
    icon: House,
  },
  { 
    label: "Perfil", 
    href: "/profile",
    icon: UserRound,
  },
  {
    label: "Buscar",
    href: "",
    icon: Search
  },
  { 
    label: "Configuración",
    href: "/config",
    icon: Settings
  },
];