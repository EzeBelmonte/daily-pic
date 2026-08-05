import { useAcceptedContacts } from "../hooks/queries/useAcceptedContacts";

import type { AcceptedContact } from "@daily-pic/shared/types";

import { 
  LoaderSection, 
  AlertError,
} from "@/components";

import ContactCard from "./ContactCard";

const ContactsList = () => {

  const {
    data: contacts = [],
    isLoading,
    error,
  } = useAcceptedContacts();

  if (isLoading) {
    return <LoaderSection />
  }

  if (error) {
    return (
      <AlertError 
        error={"Error al cargar los contactos"}
        className="w-[200px]"
      />
    );
  }

  return (
    <div
      className="
        flex flex-col
        w-full h-[70vh]
        items-center 
        bg-[#1b1b1b]
        border border-white/20
        rounded
        px-4 py-1 gap-3
        overflow-y-scroll
      ">
      <h2 className="
        w-[90%]
        text-white text-[1.1rem] text-center
        px-2 my-3 
        border-b border-white
      ">Contactos</h2>

      {contacts?.length === 0 || contacts === undefined ? (
          <p className="text-white">Sin contactos</p>
      ) : (
        contacts.map((contact) => (
          <ContactCard 
            key={contact.id}
            user={contact.user}
            contactId={contact.id}
          />
        ))
      )}
    </div>
  );
}

export default ContactsList;