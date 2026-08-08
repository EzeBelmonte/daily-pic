import { useNavigate } from "react-router-dom";

import type { User } from "@daily-pic/shared/types";

import { useRejectContact } from "../hooks/mutations/useRejectContact";

import ContactInformation from "./ContactInformation";

import { Button } from "@/components";

type Props = {
  user: User;
  contactId: number;
}

const ContactCard = ({ user, contactId }: Props) => {
  const navigate = useNavigate();

  const rejectContactMutation = useRejectContact();

  const handleDeleteContact = () => {
    rejectContactMutation.mutate({
      requestId: contactId,
      userId: user.id,
    });
  }

  return (
    <div className="
      w-full
      flex flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      p-2
      bg-[#222222]
      border border-white/20
      rounded
    ">
      <ContactInformation 
        user={user} 
        onClick={() => navigate(`/profile/${user.username}`)}
      />

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
          onClick={handleDeleteContact}
          className="text-white"
        >
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