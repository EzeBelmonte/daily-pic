import { useAcceptContact } from "@/features/contacts/hooks/mutations/useAcceptContact";
import { useRejectContact } from "@/features/contacts/hooks/mutations/useRejectContact";

import type { PendingContact } from "@daily-pic/shared/types";

import ContactInformation from "../../../contacts/components/ContactInformation";
import { Button } from "@/components";

type Props = {
  contact: PendingContact;
};

const PendingCard = ({
  contact,
}: Props) => {
  const acceptContactMutation = useAcceptContact();
  const rejectContactMutation = useRejectContact();

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
    <div className="
      w-full max-w-[400px]
      p-2
      bg-[#222222] rounded-[10px]
    ">
      <ContactInformation user={contact.requester} />

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
            acceptContactMutation.isPending
          }
          className="text-green-300"
        >
          Aceptar
        </Button>

        <Button
          onClick={handleReject}
          disabled={
            rejectContactMutation.isPending
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