import { useAcceptedContacts } from "../hooks/queries/useAcceptedContacts";

import { 
  LoaderSection, 
  AlertError,
} from "@/components";

import ContactCard from "./ContactCard";

type Props = {
  onClose: () => void;
}

const ContactsList = ({ onClose }: Props) => {
  const {
    data: contacts,
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

  if (!contacts) {
    return (
      <p>Sin contactos</p>
    );
  }

  return (
    <div
      className="
        flex flex-col
        w-full
        items-center
        bg-[#1b1b1b]
        border border-white/20
        rounded
        p-1
      ">
      <h2 className="
        w-[90%]
        text-white text-[1.1rem] text-center
        px-2 my-3 
        border-b border-white
      ">Contactos</h2>

      {contacts.map((contact) => (
        <ContactCard 
          key={contact.id}
          user={contact.user}
          contactId={contact.id}
        />
      ))}
    </div>
  );
}

export default ContactsList;