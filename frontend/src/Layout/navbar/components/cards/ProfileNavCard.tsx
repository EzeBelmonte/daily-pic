import { useNavigate } from "react-router-dom";
import { Settings, SquareArrowRightExit } from "lucide-react";

import { useAuth } from "@/app/hooks/useAuth";

import { Button } from "@/components";

type Props = {
  onClose: () => void;
}

const ProfileNavCard = ({ onClose }: Props) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleConfig = () => {
    onClose();
    navigate("/config");
  }

  return (
    <div className="
      flex flex-col
      bg-[#222222]
      px-2 py-4 gap-3
    ">
      <Button
        onClick={handleConfig}
        className="
          w-full
          flex items-center
          px-2 py-1 gap-3
          bg-[#3b3b3b] rounded
          text-white
      ">
        <Settings size={20}/>
        Configuración
      </Button>

      <Button
        onClick={logout}
        className="
          w-full
          flex items-center
          px-2 py-1 gap-3
          bg-[#3b3b3b] rounded
          text-white
      ">
        <SquareArrowRightExit size={20}/>
        Cerrar sesión
      </Button>
    </div>
  );
}

export default ProfileNavCard;