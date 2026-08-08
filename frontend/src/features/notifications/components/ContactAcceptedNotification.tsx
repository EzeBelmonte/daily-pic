import type { NotificationWithSender } from "@daily-pic/shared/types";

import { useMarkNotificationAsRead } from "@/features/notifications/hooks/mutations/useMarkNotificationAsRead";

import AcceptedCard from "./cards/AcceptedCard";

type Props = {
  notification: NotificationWithSender;
};

const ContactAcceptedNotification = ({
  notification,
}: Props) => {

  const markAsReadMutation =
    useMarkNotificationAsRead();

  const handleNotification = () =>  {
      markAsReadMutation.mutate(notification.id);
  }

  return (
    <section className="
      w-full
      flex flex-col 
      items-center
      border-b-2 border-white/20
      pb-3
    ">
      <h3 className="
        max-w-[250px]
        text-white text-[1.1rem]
        mb-3
        border-b border-white/30
      ">
        Solicitudes aceptadas
      </h3>

      <div
        className="
          w-full max-w-[400px]
          p-2
          bg-[#222222] rounded-[10px]"
        onClick={handleNotification}
      >
        <AcceptedCard
          user={notification.sender}
        />


      </div>
    </section>
  );
}

export default ContactAcceptedNotification;