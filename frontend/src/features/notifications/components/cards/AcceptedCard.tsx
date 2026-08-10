import { UserRound } from "lucide-react";

import ContactInformation from "../../../contacts/components/ContactInformation";

import type { User } from "@daily-pic/shared/types";

import { Card } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  user: User;
  read?: boolean;
}

const AcceptedCard = ({ 
  user,
  read,
}: Props) => {

  return (
    <Card
      className={cn(`
        flex items-center`,
        !read && 
        "border-t border-b border-blue-400 cursor-pointer")}
    >
      
      <ContactInformation 
        user={user} 
      />

      <UserRound 
        size={30}
        className="fill-cyan-500 stroke-cyan-600"
      />
      
    </Card>
  );
}

export default AcceptedCard;