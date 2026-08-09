import type { NotificationWithSender } from "@daily-pic/shared/types";

import { 
  ContactRequestNotification,
  ContactAcceptedNotification,
  PostLikeNotification
} from "./sections";

type Props = {
  notification: NotificationWithSender;
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
        <PostLikeNotification
          notification={notification}
        />
      );

    default:
      return null;
  }
};

export default NotificationItem;