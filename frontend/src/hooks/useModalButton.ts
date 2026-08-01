import { useState } from "react"

export function useModalButton () {
  const [open, setOpen] = useState(false);

  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  }
}