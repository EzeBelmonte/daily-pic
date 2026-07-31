import { DiamondPlus } from "lucide-react";

import { useCreatePostButton } from "@/Layout/hooks/useCreatePostButton";

import { Button, ModalSection } from "@/components";
import { CreatePost } from "@/features";

import { cn } from "@/utils/cn";

type Props = {
  className?: string;
}
const CreatePostMenuButton = ({ className }: Props) => {
  const { open, openModal, closeModal } = useCreatePostButton();

  return (
    <>
      <Button
        onClick={openModal}
        className={cn(
          "flex gap-2 text-white",
          className
        )}
      >
        <DiamondPlus size={20} />
        Publicar
      </Button>

      <ModalSection
        open={open}
        onClose={closeModal}
      >
        <CreatePost onClose={closeModal} />
      </ModalSection>
    </>
  );
}

export default CreatePostMenuButton;