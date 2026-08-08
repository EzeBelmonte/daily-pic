import type { AppNotification } from "@daily-pic/shared/types";

import ContactRequestNotification
  from "./ContactRequestNotification";

/*import ContactAcceptedNotification
  from "./ContactAcceptedNotification";

import PostLikeNotification
  from "./PostLikeNotification";

import MessageNotification
  from "./MessageNotification";*/

type Props = {
  notification: AppNotification;
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

    /*case "contactAccepted":
      return (
        <ContactAcceptedNotification
          notification={notification}
        />
      );

    case "postLike":
      return (
        <PostLikeNotification
          notification={notification}
        />
      );

    case "message":
      return (
        <MessageNotification
          notification={notification}
        />
      );*/

    default:
      return null;
  }
};

export default NotificationItem;