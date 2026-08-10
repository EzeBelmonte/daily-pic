import { UserRoundPlus } from "lucide-react";

import { useAcceptContact } from "@/features/contacts/hooks/mutations/useAcceptContact";
import { useRejectContact } from "@/features/contacts/hooks/mutations/useRejectContact";

import type { PendingContact } from "@daily-pic/shared/types";

import ContactInformation from "../../../contacts/components/ContactInformation";
import { Button, Card } from "@/components";

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
    <Card className="border-t border-b border-green-400">
      <div className="flex items-center justify-between">
        <ContactInformation user={contact.requester} />

        <UserRoundPlus 
          size={24}
          className="stroke-green-400"
        />
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
    </Card>
  );
};

export default PendingCard;