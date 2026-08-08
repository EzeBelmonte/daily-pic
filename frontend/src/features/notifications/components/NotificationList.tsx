import { LoaderSection, Alert, AlertError } from "@/components";

import { useNotifications } from "../hooks/queries/useNotifications";
import NotificationItem from "../components/NotificationItem";

const NotificationList = () => {
  const {
    data: notifications,
    isLoading,
    error,
  } = useNotifications();

  if (isLoading) {
    return <LoaderSection />;
  }

  if (error) {
    return (
      <AlertError
        error="Error al obtener las notificaciones"
        className="w-[300px]"
      />
    );
  }

  if (!notifications || notifications.length === 0) {
    return <Alert message="Sin notificaciones" />;
  }

  return (
    <div className="
      w-full
      flex flex-col
      items-center
      gap-5
    ">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
};

export default NotificationList;