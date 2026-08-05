import { useNavigate } from "react-router-dom";

import type { User } from "@daily-pic/shared/types";

import { Image } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  user: User;
  className?: string;
}

const FeedPostHeader = ({ 
  user,
  className,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={cn(`
        flex items-center
        gap-3 p-1
        absolute
        z-20`,
        className
      )}
    >
      <Image 
        src={user.profileImageUrl}
        alt="Foto perfil"
        className="w-10 rounded-[10px] cursor-pointer"
        onClick={() => navigate(`/profile/${user.username}`)}
      />

      {/* Nombre y apellido, y usuario */}
      <div className="text-white">
        <p className="text-[1.1rem]"><span>{user.name} </span><span>{user.lastname}</span></p>
        <p className="text-[.85rem] text-gray-400">@{user.username}</p>
      </div>
    </div>
  );
}

export default FeedPostHeader;