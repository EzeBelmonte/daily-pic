import { usePendingContacts } from "@/features/contacts/hooks/queries/usePendingContacts";

import PendingCard from "./PendingCard";

import { 
  LoaderSection,
  Alert,
  AlertError,
} from "@/components";

const PendingList = () => {
  const {
    data: pending,
    isLoading,
    error,
  } = usePendingContacts();

  if (isLoading) {
    return <LoaderSection />
  }

  if (error) {
    return (
      <AlertError 
        error={"Error al obtener las solicitudes pendientes"}
        className="w-[300px]"
      />
    );
  }

  return (
    <div className="
      w-full 
      flex flex-col 
      justify-center items-center
      gap-5
    ">
      {pending?.length === 0 || pending === undefined ? (
        <Alert message={"Sin notificaciones"}/>
      ) : (
        pending.map((contact) => (
          <PendingCard 
            key={contact.id} 
            contact={contact}
          />
        ))
      )}
    </div>
  );
}

export default PendingList;