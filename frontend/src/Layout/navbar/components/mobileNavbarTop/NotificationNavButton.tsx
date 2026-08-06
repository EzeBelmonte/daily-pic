import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

import { usePendingContacts } from "@/features/contacts/hooks/queries/usePendingContacts";

const NotificationNavButton = () => {
  const navigate = useNavigate();

  const { 
    data: pendingContacts,
  } = usePendingContacts();

  const pendingCount = pendingContacts?.length ?? 0;
  
  return (
    <div 
      className="relative"
      onClick={() => navigate("/notifications")}
    >
      <Bell size={24}/>

      {pendingCount > 0 && (
        <span className="
          absolute
          top-0
          -right-2
          min-w-4
          h-4
          px-1
          rounded
          bg-red-500
          text-white
          text-[10px]
          flex
          items-center
          justify-center
        ">
          {pendingCount}
        </span>
      )}
    </div>
  );
}

export default NotificationNavButton;