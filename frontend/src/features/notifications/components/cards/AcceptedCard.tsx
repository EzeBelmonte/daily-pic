import ContactInformation from "../../../contacts/components/ContactInformation";

import type { User } from "@daily-pic/shared/types";

type Props = {
  user: User;
}

const AcceptedCard = ({ 
  user,
}: Props) => {

  return (
    <div className="
      w-full max-w-[400px]
      p-2
      bg-[#222222] rounded-[10px]
    ">
      <ContactInformation user={user} />

    </div>
  );
}

export default AcceptedCard;