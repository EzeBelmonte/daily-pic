import { House, UserRound, Search, MessageSquare, Bell } from "lucide-react";

type Device = "mobile" | "desktop";

// Opciones del menú
export const navItems = [
  { 
    id: "home",
    label: "Inicio", 
    href: "/",
    icon: House,
    showOn: ["mobile", "desktop"] as Device[],
  },
  { 
    id: "profile",
    label: "Perfil", 
    href: "/profile",
    icon: UserRound,
    showOn: ["mobile"] as Device[],
  },
  { 
    id: "notifications",
    label: "Notificaciones", 
    href: "",
    icon: Bell,
    showOn: ["desktop"] as Device[],
  },
  {
    id: "search",
    label: "Buscar",
    href: "",
    icon: Search,
    showOn: ["mobile", "desktop"] as Device[],
  },
  { 
    id: "mensaje",
    label: "mensaje",
    href: "",
    icon: MessageSquare,
    showOn: ["mobile", "desktop"] as Device[],
  },
];