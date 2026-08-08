import type { User } from "@daily-pic/shared/types";

import { Image } from "@/components";

type Props = {
  user: User;
}

const CardInformation = ({ user }: Props) => {

  return (
    <div className="
      flex gap-3
    ">
      {/* Foto de perfil */}
      <Image
        src={user.profileImageUrl}
        alt={user.username}
        className="
          w-[60px] h-[60px]
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

export default CardInformation;