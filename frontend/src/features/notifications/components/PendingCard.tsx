import { useAcceptContact } from "@/features/contacts/hooks/mutations/useAcceptContact";
import { useRejectContact } from "@/features/contacts/hooks/mutations/useRejectContact";

import { useMarkNotificationAsRead } from "@/features/notifications/hooks/mutations/useMarkNotificationAsRead";

import type { PendingContact } from "@daily-pic/shared/types";

import { Image, Button } from "@/components";

type Props = {
  contact: PendingContact;
};

const PendingCard = ({
  contact,
}: Props) => {
  const acceptContactMutation = useAcceptContact();
  const rejectContactMutation = useRejectContact();

  const markAsReadMutation =
    useMarkNotificationAsRead();

  const handleAccept = () => {
    acceptContactMutation.mutate(contact.id);
  };

  const handleReject = () => {
    rejectContactMutation.mutate(
      {
        requestId: contact.id,
        userId: contact.requester.id,
      }
    );
  };

  return (
    <div>
      {/* Información */}

      {/* Foto de perfil */}
      <Image
        src={contact.requester.profileImageUrl}
        alt={contact.requester.username}
      />

      <div>
        <p>
          {contact.requester.name}{" "}
          {contact.requester.lastname ?? ""}
        </p>

        <p className="text-gray-500 text-[.8rem]">
          @{contact.requester.username}
        </p>
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
          onClick={handleAccept}
          disabled={
            acceptContactMutation.isPending ||
            markAsReadMutation.isPending
          }
          className="text-green-300"
        >
          Aceptar
        </Button>

        <Button
          onClick={handleReject}
          disabled={
            rejectContactMutation.isPending ||
            markAsReadMutation.isPending
          }
          className="text-red-300"
        >
          Rechazar
        </Button>
      </div>
    </div>
  );
};

export default PendingCard;