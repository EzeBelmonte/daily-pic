import { useEffect } from "react";
import { X } from "lucide-react";

import { Button } from "@/components";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const ModalList = ({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) => {

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0
        flex flex-col
        z-50 mt-11
      "
    >
      <div
        className="
          w-[300px]
          max-h-[70vh]
          bg-zinc-800
          rounded-lg
          shadow-xl
          absolute right-0
        "
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h3 className="text-sm sm:text-[1rem] text-white">
            {title}
          </h3>

          <Button onClick={onClose}>
            <X 
              size={18} 
              className="text-red-400 cursor-pointer"
            />
          </Button>
        </div>

        <div className="flex flex-col gap-2 p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalList;