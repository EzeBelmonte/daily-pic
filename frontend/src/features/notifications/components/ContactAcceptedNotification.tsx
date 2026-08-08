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
    <div
      onClick={handleNotification}
    >
      <AcceptedCard
        user={notification.sender}
      />
    </div>
  );
}

export default ContactAcceptedNotification;