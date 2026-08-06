import type { User } from "@daily-pic/shared/types";

import { Image } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  user: User;
  className?: string;
  onClick?: () => void;
}

const PostUser = ({ 
  user,
  className,
  onClick,
}: Props) => {

  return (
    <div className={cn(`
        min-w-[200px]
        flex items-center
        gap-3 p-1
        absolute
        z-20
        bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(255,255,255,0)]
        rounded-tl`,
        className
      )}
    >
      <Image 
        src={user.profileImageUrl}
        alt="Foto perfil"
        className={cn(
          "w-10 rounded-[10px]",
          onClick && "cursor-pointer"
        )}
        onClick={onClick}
      />

      {/* Nombre y apellido, y usuario */}
      <div className="text-white">
        <p className="text-[1.1rem]"><span>{user.name} </span><span>{user.lastname}</span></p>
        <p className="text-[.85rem] text-gray-400">@{user.username}</p>
      </div>
    </div>
  );
}

export default PostUser;