import { useNotifications } from "../hooks/queries/useNotifications";

const NotificationBadge = () => {
  const { data: notifications } =
    useNotifications();

  const unreadCount =
    notifications?.filter(
      (notification) => !notification.read,
  ).length ?? 0;

  if (unreadCount === 0) {
    return null;
  }

  return (
    <span className="
      absolute
      top-0.5 right-10
      min-w-4
      h-4
      px-1
      rounded
      bg-red-500
      text-white text-[10px]
      flex items-center justify-center
    ">
      {unreadCount}
    </span>
  );
}

export default NotificationBadge;