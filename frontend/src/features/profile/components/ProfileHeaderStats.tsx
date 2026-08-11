import { useRelationContacts } from "@/features/contacts/hooks/queries/useRelationContacts";
import { useAddContact } from "@/features/contacts/hooks/mutations/useAddContact";
import { useRejectContact } from "@/features/contacts/hooks/mutations/useRejectContact";

import { useBlock } from "@/features/block/hooks/queries/useBlock";
import { useAddBlock } from "@/features/block/hooks/mutations/useAddBlock";
import { useRemoveBlock } from "@/features/block/hooks/mutations/useRemoveBlock";

import type { CompleteUser } from "@daily-pic/shared/types";

import { cn } from "@/utils/cn";

import { Button } from "@/components";

type Props = {
  user: CompleteUser;
  isOwner: boolean;
  className?: string;
}

const ProfileHeaderStats = ({ 
  user, 
  isOwner,
  className
}: Props) => {
  const addContactMutation = useAddContact();
  const rejectContactMutation = useRejectContact();

  const addBlockMutation = useAddBlock();
  const removeBlockMutation = useRemoveBlock();

  const {
    data: relation,
  } = useRelationContacts(user.id);

  const {
    data: block,
  } = useBlock(user.username);

  // Obtener relación
  const hasContactRelation =
    relation &&
    (relation.status === "pending" || relation.status === "accepted");

  // Agregar o eliminar amistad
  const handleSendContact = () => {
    if (hasContactRelation) {
      rejectContactMutation.mutate({
        requestId: relation.id,
        userId: user.id,
      });

      return;
    }

    addContactMutation.mutate(user.id);
  }

  // Bloquear o desbloquear usuario
  const handleBlock = () => {
    if (block) {
      removeBlockMutation.mutate(user.username);

      if (hasContactRelation) {
        rejectContactMutation.mutate({
          requestId: relation.id,
          userId: user.id,
        });
      }
      
      return;
    }

    addBlockMutation.mutate(user.username);
  }

  // flex-1: Hace que ambos botones ocupen el mismo espacio disponible
  const buttonStyle = "flex-1 sm:flex-none sm:w-[140px] rounded text-[.9rem] py-0.5";

  const isBlocking =
    addBlockMutation.isPending ||
    removeBlockMutation.isPending;

  return (
    <>
      {/* Botón de seguir y bloquear */}
      {!isOwner &&
        <div className={cn(
          "flex gap-5 text-white",
          className
        )}>
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
                : "Dejar de seguir"
            }
          </Button>

          <Button 
            onClick={handleBlock}
            className={cn(
              isBlocking ? "bg-gray-400" : "bg-[#b30e0e]",
              buttonStyle
            )}
            disabled={isBlocking}
          >
            {block ? "Desbloquear" : "Bloquear"}
          </Button>
        </div>
      }
    </>
  );
}

export default ProfileHeaderStats;