import { useRelationContacts } from "@/features/contacts/hooks/queries/useRelationContacts";
import { useAddContact } from "@/features/contacts/hooks/mutations/useAddContact";
import { useRejectContact } from "@/features/contacts/hooks/mutations/useRejectContact";

import type { CompleteUser } from "@shared/index";

import { cn } from "@/utils/cn";

import { Button } from "@/components";

type Props = {
  user: CompleteUser;
  isOwner: boolean;
}

const ProfileHeaderStats = ({ 
  user, 
  isOwner 
}: Props) => {
  const addContactMutation = useAddContact();
  const rejectContactMutation = useRejectContact();

  const {
    data: relation,
  } = useRelationContacts(user.id);

  const handleSendContact = () => {
    if (
      relation &&
      (relation.status === "pending" || relation.status === "accepted")
    ) {
      rejectContactMutation.mutate({
        requestId: relation.id,
        userId: user.id,
    });
      return;
    }

    addContactMutation.mutate(user.id);
  }
  // flex-1: Hace que ambos botones ocupen el mismo espacio disponible
  const buttonStyle = "flex-1 sm:flex-none sm:w-[140px] rounded text-[.9rem] py-0.5";

  return (
    <>
      {/* Botón de seguir y bloquear */}
      {!isOwner &&
        <div className="
          flex gap-5 text-white
        ">
          <Button 
            onClick={handleSendContact}
            className={cn(
              "bg-[#145fb4]",
              buttonStyle
            )}
          >
            
            {relation === undefined || relation === null
              ? "Seguir" 
              : relation.status === "pending"
                ? "Pendiente"
                : "Siguiendo"
            }
          </Button>

          <Button className={cn(
            "bg-[#b30e0e]",
            buttonStyle
          )}>
            Boquear
          </Button>
        </div>
      }
    </>
  );
}

export default ProfileHeaderStats;