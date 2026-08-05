import { useState } from "react";

export function useModalButton(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);

  return {
    open,
    setOpen,
  };
}