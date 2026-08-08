import type { NotificationWithSender } from "@daily-pic/shared/types";

import { useMarkNotificationAsRead } from "@/features/notifications/hooks/mutations/useMarkNotificationAsRead";

import AcceptedCard from "./cards/AcceptedCard";

type Props = {
  notification: NotificationWithSender;
};

const ContactAcceptedNotification = ({
  notification,
}: Props) => {

  const markAsReadMutation =
    useMarkNotificationAsRead();

  const handleNotification = () =>  {
      markAsReadMutation.mutate(notification.id);
  }

  return (
    <div className="
      w-full
      flex flex-col 
      items-center
    ">
      <div
        className="
          w-full max-w-[400px]
          p-2
          bg-[#222222] rounded-[10px]"
        onClick={handleNotification}
      >
        <AcceptedCard
          user={notification.sender}
        />

      </div>
    </div>
  );
}

export default ContactAcceptedNotification;