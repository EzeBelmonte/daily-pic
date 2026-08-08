import CardInformation from "./CardInformation";

import type { User } from "@daily-pic/shared/types";

type Props = {
  user: User;
}

const AcceptedCard = ({ 
  user,
}: Props) => {

  return (
    <>
      <CardInformation user={user} />
    </>
  );
}

export default AcceptedCard;