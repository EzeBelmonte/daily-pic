import { useSearchParams } from "react-router-dom";

import { LoaderSection, Alert, AlertError, Button } from "@/components";

import { useNotifications } from "../hooks/queries/useNotifications";
import NotificationItem from "../components/NotificationItem";

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

  return (
    <section className="w-full flex flex-col gap-5">

      {/* Filtros */}
      <div className="
        grid grid-cols-3
        py-1 sm:py-2 md:py-3
        font-semibold
        text-white
        bg-[rgba(31,31,31,0.5)]
        border-b border-white/20
      ">
        <Button
          onClick={() => changeFilter("all")}
          className={
            notificationFilter === "all"
              ? "text-blue-500"
              : "mx-auto w-[150px]"
          }
        >
          Todas
        </Button>

        <Button
          onClick={() => changeFilter("contacts")}
          className={
            notificationFilter === "contacts"
              ? "text-blue-500"
              : "mx-auto w-[150px]"
          }
        >
          Contactos
        </Button>

        <Button
          onClick={() => changeFilter("likes")}
          className={
            notificationFilter === "likes"
              ? "text-blue-500"
              : "mx-auto w-[150px]"
          }
        >
          Me gusta
        </Button>
      </div>

      {/* Notificaciones */}
      <div className="
        w-full
        flex flex-col
        gap-3
        p-3
      ">
        {filteredNotifications.length === 0 ? (
          <Alert message="Sin notificaciones" />
        ) : (
          filteredNotifications.map(
            (notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            )
          )
        )}
      </div>

    </section>
  );
};

export default Notifications;