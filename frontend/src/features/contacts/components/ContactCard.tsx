import type { User } from "@daily-pic/shared/types";

import { 
  Image,
  Button,
} from "@/components";

type Props = {
  user: User;
  contactId: number;
}

const ContactCard = ({ user, contactId }: Props) => {

  return (
    <div className="
      w-full
      flex flex-col
      p-2
      bg-[#222222]
      border border-white/20
      rounded
    ">
      <div className="
        flex
        w-full
        gap-2
      ">
        <Image 
          src={user.profileImageUrl}
          alt="Foto de perfil"
          className="w-[50px] h-[50px] rounded-[7px]"
        />

        <div>
          <p className="text-white"><span>{user.name} </span><span>{user.lastname}</span></p>
          <p className="text-gray-500 text-[.8rem]">@{user.username}</p>
        </div>
      </div>

      <div className="
        flex 
        justify-between
        text-white text-[.8rem]
        mt-3 px-1
      ">
        <Button className="
          text-green-300
        ">
          Eliminar contacto
        </Button>

        <Button className="
          text-red-300
        ">
          Bloquear
        </Button>
      </div>
    </div>
  );
}

export default ContactCard;