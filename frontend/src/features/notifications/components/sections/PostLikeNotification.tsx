import type { NotificationWithSender } from "@daily-pic/shared/types";

import { useMarkNotificationAsRead } from "@/features/notifications/hooks/mutations/useMarkNotificationAsRead";

import AcceptedCard from "../cards/AcceptedCard";

type Props = {
  notification: NotificationWithSender;
};

const PostLikeNotification = ({
  notification
}: Props) => {

  const markAsReadMutation =
    useMarkNotificationAsRead();

  const handleNotification = () =>  {
    markAsReadMutation.mutate(notification.id);
  }

  return (

    <div
      className="w-full flex flex-col items-center"
      onClick={handleNotification}
    >
      
      <AcceptedCard
        user={notification.sender}
        read={notification.read}
      />

    </div>
  );
}

export default PostLikeNotification;