import NotificationsNavButton from "./NotificationsNavButton";

type NotificationFilter = "all" | "contacts" | "likes";

type NotificationState = {
  contact: boolean;
  likes: boolean;
}

type Props = {
  notificationFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  notificationState: NotificationState;
};

const NotificationsNavButtons = ({
  notificationFilter,
  onFilterChange,
  notificationState,
}: Props) => {

  const hasContactsNotification = notificationState.contact;
  const hasLikesNotification = notificationState.likes;
  const hasNotifications =
    hasContactsNotification || hasLikesNotification;

  const dotStyle = "absolute top-1 right-3 w-[7px] h-[7px] bg-yellow-500/70 rounded";

  return (
      <div className="
        flex
        w-full
        py-1 sm:py-2 md:py-3
        text-white font-semibold
        bg-[rgba(31,31,31,0.5)]
        border-b border-white/20
        mt-10 sm:mt-0
      ">
        <div className="flex-1 relative">
          <NotificationsNavButton
            active={notificationFilter === "all"}
            onClick={() => onFilterChange("all")}
          >
            Todas
          </NotificationsNavButton>

          {hasNotifications &&
            <div className={dotStyle} />
          }
        </div>

        <div className="flex-1 relative">
          <NotificationsNavButton
            active={notificationFilter === "contacts"}
            onClick={() => onFilterChange("contacts")}
          >
            Contactos
          </NotificationsNavButton>

          {hasContactsNotification &&
            <div className={dotStyle} />
          }
        </div>

        <div className="flex-1 relative">
          <NotificationsNavButton
            active={notificationFilter === "likes"}
            onClick={() => onFilterChange("likes")}
          >
            Me gusta
          </NotificationsNavButton>

          {hasLikesNotification &&
            <div className={dotStyle} />
          }
        </div>
    </div>
  );
};

export default NotificationsNavButtons;