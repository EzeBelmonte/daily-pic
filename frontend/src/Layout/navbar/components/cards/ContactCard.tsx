import type { Contact } from "@shared/index";

type Props = {
  contact: Contact;
}

const ContactCard = ({ contact }: Props) => {

  return (
    <div>
      <p>{contact.addresseeId}</p>
    </div>
  );
}

export default ContactCard;