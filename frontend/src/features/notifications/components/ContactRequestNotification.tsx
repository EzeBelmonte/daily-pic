import { usePendingContacts } from "@/features/contacts/hooks/queries/usePendingContacts";

import PendingCard from "./cards/PendingCard";

import { LoaderSection, AlertError } from "@/components";

import type { AppNotification } from "@daily-pic/shared/types";

type Props = {
  notification: AppNotification;
};

const ContactRequestNotification = ({
  notification,
}: Props) => {

  const {
    data: pending,
    isLoading,
    error,
  } = usePendingContacts();

  if (isLoading) {
    return <LoaderSection />;
  }

  if (error) {
    return (
      <AlertError
        error="Error al obtener las solicitudes pendientes"
        className="w-[300px]"
      />
    );
  }

  const contact = pending?.find(
    (contact) =>
      contact.id === notification.contactId
  );

  if (!contact) {
    return null;
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
        Solicitud de amistad
      </h3>

      <PendingCard
        contact={contact}
      />
    </section>
  );
};

export default ContactRequestNotification;