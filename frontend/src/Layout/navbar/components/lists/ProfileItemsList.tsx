import { useNavigate } from "react-router-dom";
import { UserRound, Settings, SquareArrowRightExit } from "lucide-react";

import { useAuth } from "@/app/hooks/useAuth";

import { Button } from "@/components";

type Props = {
  onClose: () => void;
}

const ProfileItemsList = ({ onClose }: Props) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleProfile = () => {
    onClose();
    navigate("/profile");
  }

  const handleConfig = () => {
    onClose();
    navigate("/config");
  }

  const buttonStyle = `
    w-full 
    flex items-center
    px-2 py-1 gap-3 
    bg-[rgba(59,59,59,0.5)] rounded 
    text-white 
    hover:bg-[rgba(6,45,71,0.4)] 
    
    transition-colors duration-200
  `;

  return (
    <div className="
      flex flex-col 
      px-3 py-5 gap-4
      bg-[#202020] rounded
      border border-white/10
    ">
      <Button
        onClick={handleProfile}
        className={`hidden sm:flex ${buttonStyle}`}
      >
        <UserRound size={20}/>
        Perfil
      </Button>

      <Button
        onClick={handleConfig}
        className={buttonStyle}
      >
        <Settings size={20}/>
        Configuración
      </Button>

      <Button
        onClick={logout}
        className={buttonStyle}
      >
        <SquareArrowRightExit size={20}/>
        Cerrar sesión
      </Button>
    </div>
  );
}

export default ProfileItemsList;