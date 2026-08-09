import { useSearchParams } from "react-router-dom";

import { LoaderSection, Alert, AlertError } from "@/components";

import { useNotifications } from "../hooks/queries/useNotifications";
import NotificationItem from "../components/NotificationItem";

import NotificationsNavButtons from "../components/actions/NotificationsNavButtons";

type NotificationFilter =
  | "all"
  | "contacts"
  | "likes";

const Notifications = () => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useNotifications();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const typeParam =
    searchParams.get("type") as NotificationFilter;

  const notificationFilter: NotificationFilter =
    typeParam === "contacts"
      ? "contacts"
      : typeParam === "likes"
        ? "likes"
        : "all";

  const changeFilter = (
    type: NotificationFilter
  ) => {
    setSearchParams({ type });
  };

  if (isLoading) {
    return <LoaderSection />;
  }

  if (error) {
    return (
      <AlertError
        error="Error al obtener las notificaciones"
      />
    );
  }

  if (!notifications || notifications.length === 0) {
    return <Alert message="Sin notificaciones" />;
  }

  const filteredNotifications =
    notifications.filter((notification) => {
      switch (notificationFilter) {
        case "contacts":
          return (
            notification.type === "contactRequest" ||
            notification.type === "contactAccepted"
          );

        case "likes":
          return notification.type === "postLike";

        case "all":
        default:
          return true;
      }
    });

  // Agrupamos las notificaciones por tipo
  const groupedNotifications = {
    contactRequest: filteredNotifications.filter(
      (notification) => notification.type === "contactRequest"
    ),

    contactAccepted: filteredNotifications.filter(
      (notification) => notification.type === "contactAccepted"
    ),

    postLike: filteredNotifications.filter(
      (notification) => notification.type === "postLike"
    ),

    message: filteredNotifications.filter(
      (notification) => notification.type === "message"
    ),
  };

  const sectionStyle = "flex flex-col px-1 py-3 gap-2";
  const h3Style = "text-white text-[1.2rem] mb-2 border-b border-white text-center";

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Filtros */}
      <NotificationsNavButtons
        notificationFilter={notificationFilter}
        onFilterChange={changeFilter}
      />

      {/* Notificaciones */}
      {/* contactRequest */}
      {groupedNotifications.contactRequest.length > 0 && (
        <section className={sectionStyle}>
          <h3 className={h3Style}>Solicitudes pendientes</h3>

          {groupedNotifications.contactRequest.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </section>
      )}

      {/* contactRequest */}
      {groupedNotifications.contactAccepted.length > 0 && (
        <section className={sectionStyle}>
          <h3 className={h3Style}>Solicitudes aceptadas</h3>

          {groupedNotifications.contactAccepted.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </section>
      )}

    </div>
  );
};

export default Notifications;