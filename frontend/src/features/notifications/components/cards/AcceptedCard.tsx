import ContactInformation from "../../../contacts/components/ContactInformation";

import type { User } from "@daily-pic/shared/types";

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
    <div className={cn(`
      w-full max-w-[400px]
      p-2
      bg-[#222222] rounded-[10px]`,
      !read && "border border-amber-400/50 cursor-pointer"
    )}>
      
        <ContactInformation 
          user={user} 
        />
      
    </div>
  );
}

export default AcceptedCard;