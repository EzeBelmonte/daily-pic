import { useNavigate } from "react-router-dom";
import { Settings, SquareArrowRightExit } from "lucide-react";

import { useAuth } from "@/app/hooks/useAuth";

import { Button } from "@/components";

type Props = {
  onClose: () => void;
}

const ProfileItemsList = ({ onClose }: Props) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleConfig = () => {
    onClose();
    navigate("/config");
  }

  const buttonStyle = "w-full flex items-center px-2 py-1 gap-3 bg-[rgba(59,59,59,0.5)] rounded text-white";

  return (
    <div className="
      flex flex-col gap-2
    ">
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