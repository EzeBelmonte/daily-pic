import { useAcceptContact } from "@/features/contacts/hooks/mutations/useAcceptContact";
import { useRejectContact } from "@/features/contacts/hooks/mutations/useRejectContact";

import type { PendingContact } from "@daily-pic/shared/types";

import { Image, Button } from "@/components";

type Props = {
  contact: PendingContact;
}

const PendingCard = ({ contact }: Props) => {
  const acceptContactMutation = useAcceptContact();
  const rejectContactMutation = useRejectContact(); 

  return (
    <div className="
      w-full max-w-[450px]
      flex flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      p-2 mt-10
      bg-[#222222]
      border border-white/20
      rounded
    ">
      {/* Información */}
      <div className="flex gap-2">
        {/* Foto de perfil */}
        <Image 
          src={contact.requester.profileImageUrl}
          alt="Foto de perfil"
          className="w-[50px] h-[50px] rounded-[7px]"
        />
        <div>
          <p className="text-white">
            <span>{contact.requester.name} </span>
            <span>{contact.requester.lastname ?? ""}</span>
          </p>

          <p className="text-gray-500 text-[.8rem]">
            @{contact.requester.username}
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="
        flex
        justify-between
        mt-3
        px-1
        text-white text-[.8rem]

        sm:mt-0
        sm:justify-normal
        sm:gap-6
      ">
        <Button 
          onClick={() => acceptContactMutation.mutate(contact.id)}
          className="text-green-300"
        >
          Aceptar
        </Button>

        <Button
          onClick={() => 
            rejectContactMutation.mutate({
              requestId: contact.id,
              userId: contact.requester.id }
          )}
          className="text-red-300"
        >
          Rechazar
        </Button>
      </div>
    </div>
  );
}

export default PendingCard;