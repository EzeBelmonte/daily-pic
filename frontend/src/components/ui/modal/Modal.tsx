import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

import { cn } from "@/utils/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({
  open,
  onClose,
  children,
  className = "",
}: Props) => {

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        {/* Fondo Principal */}
        <Dialog.Overlay
          className="
            fixed inset-0
            bg-black/50
            backdrop-blur-sm
            z-50
          "
        />

        <Dialog.Content
          asChild
          className={cn(`
            fixed left-1/2 top-1/2 z-50
            w-full max-w-[600px]
            -translate-x-1/2 -translate-y-1/2
            px-2
            outline-none`,
            className
          )}
        >
          <motion.div
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
        
            {children}

          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;