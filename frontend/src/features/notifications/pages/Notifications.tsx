import { useSearchParams } from "react-router-dom";

import {
  LoaderSection,
  Alert,
  AlertError,
} from "@/components";

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

  // Agrupamos las notificaciones por tipo
  const groupedNotifications = {
    contactRequest: notifications.filter(
      (notification) =>
        notification.type === "contactRequest"
    ),

    contactAccepted: notifications.filter(
      (notification) =>
        notification.type === "contactAccepted"
    ),

    postLike: notifications.filter(
      (notification) =>
        notification.type === "postLike"
    ),

    message: notifications.filter(
      (notification) =>
        notification.type === "message"
    ),
  };

  // Indicadores: solamente existen si hay
  // al menos una notificación sin leer.
  const notificationState = {
    contact:
      groupedNotifications.contactRequest.some(
        (notification) => !notification.read
      ) ||
      groupedNotifications.contactAccepted.some(
        (notification) => !notification.read
      ),

    likes:
      groupedNotifications.postLike.some(
        (notification) => !notification.read
      ),
  };

  const sectionStyle =
    "flex flex-col px-1 py-3 gap-2";

  const h3Style =
    "w-[300px] mx-auto text-white text-[1.2rem] mb-2 border-b border-white text-center";

  return (
    <div className="w-full">

      {/* Filtros */}
      <NotificationsNavButtons
        notificationFilter={notificationFilter}
        onFilterChange={changeFilter}
        notificationState={notificationState}
      />

      {/* Contactos */}
      {(notificationFilter === "all" ||
        notificationFilter === "contacts") && (
        <>
          {groupedNotifications.contactRequest.length >
            0 && (
            <section className={sectionStyle}>
              <h3 className={h3Style}>
                Solicitudes pendientes
              </h3>

              {groupedNotifications.contactRequest.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                )
              )}
            </section>
          )}

          {groupedNotifications.contactAccepted.length >
            0 && (
            <section className={sectionStyle}>
              <h3 className={h3Style}>
                Solicitudes aceptadas
              </h3>

              {groupedNotifications.contactAccepted.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                )
              )}
            </section>
          )}
        </>
      )}

      {/* Me gusta */}
      {(notificationFilter === "all" ||
        notificationFilter === "likes") &&
        groupedNotifications.postLike.length > 0 && (
          <section className={sectionStyle}>
            <h3 className={h3Style}>
              Me gusta
            </h3>

            {groupedNotifications.postLike.map(
              (notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              )
            )}
          </section>
        )}
    </div>
  );
};

export default Notifications;