import type { NotificationWithSender } from "@daily-pic/shared/types";

import ContactRequestNotification
  from "./ContactRequestNotification";

import ContactAcceptedNotification
  from "./ContactAcceptedNotification";

import PostLikeNotification
  from "./PostLikeNotification";

type Props = {
  notification: NotificationWithSender;
};

const NotificationItem = ({
  notification,
}: Props) => {
  const articleStyle = "w-full flex flex-col items-center border-b border-white/20 py-3";

  switch (notification.type) {
    case "contactRequest":
      return (
        <article className={articleStyle}>
          <h3 className="
            w-full max-w-[250px]
            text-white text-center
            mb-6
            border-b border-white/40
          ">
            Solicitud de amistad
          </h3>

          <ContactRequestNotification
            notification={notification}
          />
        </article>
      );

    case "contactAccepted":
      return (
        <article className={articleStyle}>
          <h3 className="
            w-full max-w-[250px]
            text-white text-center
            mb-6
            border-b border-white/40
          ">
            Soliciutedes aceptadas
          </h3>

          <ContactAcceptedNotification
            notification={notification}
          />
        </article>
      );

    case "postLike":
      return (
        <article className={articleStyle}>
          <PostLikeNotification
            notification={notification}
          />
        </article>
      );

    default:
      return null;
  }
};

export default NotificationItem;