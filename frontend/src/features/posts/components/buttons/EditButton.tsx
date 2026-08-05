import { Edit } from "lucide-react";

import { useModalButton } from "@/hooks/useModalButton";

import EditPost from "../EditPost";
import { Button, Modal } from "@/components";

const EditButton = () => {
  const {
    open,
    openModal,
    closeModal,
  } = useModalButton();
  return (
    <>
      <Button
        onClick={openModal}
        className="
          text-[.85rem] flex items-center gap-2
          text-white
        "
      >
        <Edit size={14} />
        Editar
      </Button>

      <Modal
        open={open}
        onClose={closeModal}
      >
        <EditPost onClose={closeModal}/>
      </Modal>
    </>
  );
}

export default EditButton;