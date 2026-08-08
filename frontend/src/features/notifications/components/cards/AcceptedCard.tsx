import CardInformation from "./CardInformation";

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
      <CardInformation user={user} />

    </div>
  );
}

export default AcceptedCard;