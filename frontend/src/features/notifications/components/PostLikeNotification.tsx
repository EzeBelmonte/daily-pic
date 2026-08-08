import type { NotificationWithSender } from "@daily-pic/shared/types";

import { useMarkNotificationAsRead } from "@/features/notifications/hooks/mutations/useMarkNotificationAsRead";


type Props = {
  notification: NotificationWithSender;
};

const PostLikeNotification = ({
  notification
}: Props) => {
  
  return (
    <></>
  );
}

export default PostLikeNotification;