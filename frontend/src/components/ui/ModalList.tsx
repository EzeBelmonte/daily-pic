import * as Dialog from "@radix-ui/react-dialog";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const ModalList = ({
  open,
  onClose,
  children,
  className = "",
}: ModalProps) => {

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        {/* Fondo Principal */}
        <Dialog.Overlay
          className="
            fixed inset-0
            z-50
          "
        />

        <Dialog.Content
          className={cn(`
            fixed
            top-10
            left-0
            z-50
            w-full max-w-[170px]
            rounded-bl rounded-br
            shadow-xl
            outline-none`,
            className
          )}

          asChild
        >
          <motion.div
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .95 }}
          >
            
            {children}

          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ModalList;