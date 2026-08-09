import { usePendingContacts } from "@/features/contacts/hooks/queries/usePendingContacts";

import PendingCard from "../cards/PendingCard";

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
    <div className="w-full flex flex-col items-center">
      <PendingCard
        contact={contact}
      />
    </div>
  );
};

export default ContactRequestNotification;