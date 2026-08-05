import { useState } from "react";
import { Edit } from "lucide-react";

import EditPost from "../EditPost";
import { Button, Modal } from "@/components";

type Props = {
  onClose: () => void;
}

const EditButton = ({ onClose }: Props) => {
  const [openLocalModal, setOpenLocalModal] = useState(false);

  const handleCancel = () => {
    onClose();
    setOpenLocalModal(false);
  }

  return (
    <>
      <Button
        onClick={() => setOpenLocalModal(true)}
        className="
          text-[.85rem] flex items-center gap-2
          text-white
        "
      >
        <Edit size={14} />
        Editar
      </Button>

      <Modal
        open={openLocalModal}
        onClose={handleCancel}
      >
        <EditPost onClose={handleCancel}/>
      </Modal>
    </>
  );
}

export default EditButton;