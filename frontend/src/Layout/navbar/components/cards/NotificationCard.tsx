import { usePendingContacts } from "@/features/contacts/hooks/queries/usePendingContacts";

import ContactCard from "./ContactCard";

type Props = {
  onClose: () => void;
}

const NotificationCard = ({ onClose }: Props) => {
  const {
    data: pending,
    isLoading,
    error,
  } = usePendingContacts();

  const listStyle = "flex flex-col bg-[#222222] px-2 py-4 gap-3";

  if (isLoading) {
    return (
      <div className={listStyle}>
        <p className="text-white">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={listStyle}>
        <p className="text-white">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#222222] px-2 py-4 gap-3">
      {pending?.length === 0 || pending === undefined ? (
        <p className="text-white">Sin notificaciones</p>
      ) : (
        pending.map((contact) => (
          <ContactCard 
            key={contact.id} 
            contact={contact} 
          />
        ))
      )}
    </div>
  );
}

export default NotificationCard;