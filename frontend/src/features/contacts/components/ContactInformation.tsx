import type { User } from "@daily-pic/shared/types";

import { Image } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  user: User;
  onClick?: () => void;
}

const ContactInformation = ({ 
  user,
  onClick
}: Props) => {

  return (
    <div 
      className={cn(
        "flex gap-3",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* Foto de perfil */}
      <Image
        src={user.profileImageUrl}
        alt={user.username}
        className="
          w-[55px] h-[55px]
          rounded-[10px]
        "
      />

      <div>
        <p className="text-white">
          {user.name}{" "}
          {user.lastname ?? ""}
        </p>

        <p className="text-gray-500 text-[.8rem]">
          @{user.username}
        </p>
      </div>
    </div>
  );
}

export default ContactInformation;