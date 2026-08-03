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
      w-full max-w-[350px]
      bg-[rgba(0,0,0,0.3)] rounded
      p-2 
      border border-white/10
    ">
      {/* Información */}
      <div className="flex gap-2">
        {/* Foto de perfil */}
        <Image 
          src={contact.requester.profileImageUrl}
          alt="Foto perfil"
          className="w-13 h-13 rounded"
        />

        <div>
          {/* Nombre y apellido */}
          <p className="text-[.85rem] text-white">{contact.requester.name} {contact.requester.lastname ?? ""}</p>
          {/* Usuario */}
          <p className="text-[.75rem] text-gray-400">@{contact.requester.username}</p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-1 text-[.9rem]">
        <Button 
          onClick={() => acceptContactMutation.mutate(contact.id)}
          className="text-[#6ed691]"
        >
          Aceptar
        </Button>

        <Button
          onClick={() => 
            rejectContactMutation.mutate({
              requestId: contact.id,
              userId: contact.requester.id }
          )}
          className="text-[#d66e6e]"
        >
          Rechazar
        </Button>
      </div>
    </div>
  );
}

export default PendingCard;