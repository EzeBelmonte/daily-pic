import { Plus } from "lucide-react";

import { useScroll } from "@/hooks/useScroll";

import { Button, ModalSection } from "@/components";
import { CreatePost } from "@/features";

import { cn } from "@/utils/cn";

import { useCreatePostButton } from "@/Layout/hooks/useCreatePostButton";

const CreatePostFloatingButton = () => {
  const { open, openModal, closeModal } = useCreatePostButton()

  const { scrollingUp } = useScroll();

  return (
    <>
      <Button
        onClick={openModal}
        className={cn(
          "fixed bottom-0 right-0 z-50 transition-all duration-300 ease-in-out rounded sm:hidden",
          scrollingUp 
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <Plus 
          size={28}
          className="
            bg-[#3474eb] rounded-[10px]
            text-white
            fixed
            bottom-10 right-2
            p-0.5
          "
        />
  
      </Button>

      <ModalSection
        open={open}
        onClose={closeModal}
      >
        <CreatePost onClose={closeModal}/>
      </ModalSection>
    </>
  );
}

export default CreatePostFloatingButton;