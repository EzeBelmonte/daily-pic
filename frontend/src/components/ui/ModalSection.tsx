import * as Dialog from "@radix-ui/react-dialog";
//import { X } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const ModalSection = ({
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
            bg-black/50
            backdrop-blur-sm
            z-50
          "
        />

        <Dialog.Content
          className={cn(`
            fixed
            left-1/2 top-1/2
            z-50
            w-full max-w-[600px]
            -translate-x-1/2 -translate-y-1/2
            p-2
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
            {/*<Dialog.Close asChild>
              <button
                className="
                  absolute
                  right-2
                  top-2
                  rounded-md
                  p-1
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-black
                "
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </Dialog.Close>*/}

            {children}

          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ModalSection;