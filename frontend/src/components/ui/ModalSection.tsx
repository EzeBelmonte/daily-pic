import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from ".."

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};


const ModalSection = ({
  isOpen,
  onClose,
  children,
  title = "",
}: Props) => {

  // Bloquear scroll
  useEffect(() => {

    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };

  }, [isOpen]);

  // Escape
  useEffect(() => {

    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {

      if (event.key === "Escape") {
        onClose();
      }

    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };

  }, [isOpen, onClose]);

  return createPortal(

    <AnimatePresence>

      {isOpen && (

        // Fondo general del Modal
        <motion.div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm
            p-2 sm:p-6
          "
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Contenedor interno */}
          <motion.div
            className="
              relative
              w-full md:w-[700px]
              max-h-[70vh]
              rounded
              bg-[rgba(32,36,37,0.88)]
              px-2 pb-6 pt-4
              shadow-2xl overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
            initial={{
              scale: 0.95,
              opacity: 0,
              y: 10,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >

            <div className="mb-10">
              
              <h3 className="text-[.8rem] font-semibold text-white">{title}</h3>

              <Button
                onClick={onClose}
                className="
                  absolute right-2 top-2
                  text-2xl text-white/70
                  hover:text-[#c96464] cursor-pointer
                "
              >
                <X  size={14}/>
              </Button>

            </div>

            <div className="flex flex-col items-center">
              {children}
            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>,

    document.body
  );
};

export default ModalSection;