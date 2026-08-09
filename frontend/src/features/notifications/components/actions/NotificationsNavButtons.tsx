import NotificationsNavButton from "./NotificationsNavButton";

type NotificationFilter = "all" | "contacts" | "likes";

type Props = {
  notificationFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
};

const NotificationsNavButtons = ({
  notificationFilter,
  onFilterChange,
}: Props) => {
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
        <NotificationsNavButton
          active={notificationFilter === "all"}
          onClick={() => onFilterChange("all")}
        >
          Todas
        </NotificationsNavButton>

        <NotificationsNavButton
          active={notificationFilter === "contacts"}
          onClick={() => onFilterChange("contacts")}
        >
          Contactos
        </NotificationsNavButton>

        <NotificationsNavButton
          active={notificationFilter === "likes"}
          onClick={() => onFilterChange("likes")}
        >
          Me gusta
        </NotificationsNavButton>
    </div>
  );
};

export default NotificationsNavButtons;