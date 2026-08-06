import { DiamondPlus } from "lucide-react";

import { useModalButton } from "@/hooks/useModalButton";

import { Button, Modal } from "@/components";
import { CreatePost } from "@/features";

import { cn } from "@/utils/cn";

type Props = {
  className?: string;
}
const CreatePostMenuButton = ({ className }: Props) => {
  const { 
    open, 
    setOpen 
  } = useModalButton()

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        className={cn(
          "flex gap-2 text-white",
          className
        )}
      >
        <DiamondPlus size={20} />
        Publicar
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <CreatePost onClose={handleClose} />
      </Modal>
    </>
  );
}

export default CreatePostMenuButton;