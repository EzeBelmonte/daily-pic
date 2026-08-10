import type { Notification } from "@daily-pic/shared/types";

import { 
  ContactRequestNotification,
  ContactAcceptedNotification,
  PostLikedNotification,
} from "./sections";

type Props = {
  notification: Notification;
};

const NotificationItem = ({
  notification,
}: Props) => {

  switch (notification.type) {
    case "contactRequest":
      return (
        <ContactRequestNotification
          notification={notification}
        />
      );

    case "contactAccepted":
      return (
        <ContactAcceptedNotification
          notification={notification}
        />
      );

    case "postLike":
      return (
        <PostLikedNotification
          notification={notification}
        />
      );

    default:
      return null;
  }
};

export default NotificationItem;