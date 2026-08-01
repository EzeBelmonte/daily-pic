import { Bell } from "lucide-react";

import { usePendingContacts } from "@/features/contacts/hooks/queries/usePendingContacts";
import { useModalButton } from "@/hooks/useModalButton";

import { ModalList } from "@/components";
import NotificationsPendingList from "../lists/NotificationsPendingList";

const NotificationNavButton = () => {
  const { 
    data: pendingContacts,
  } = usePendingContacts();

  const {
    open,
    openModal,
    closeModal
  } = useModalButton();

  const pendingCount = pendingContacts?.length ?? 0;

  return (
    <>
      <div 
        className="relative"
        onClick={openModal}
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

      <ModalList
        open={open}
        onClose={closeModal}
        className="right-0 max-w-[250px]"
      >
        <NotificationsPendingList />
      </ModalList>
    </>
  );
}

export default NotificationNavButton;