import { House, UserRound, Search, MessageSquare } from "lucide-react";

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
    id: "mensaje",
    label: "mensaje",
    href: "",
    icon: MessageSquare
  },
];