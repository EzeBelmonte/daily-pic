import { useState, useEffect, useRef } from "react";

export function useScroll() {
    // Abir y cerrar el menu
  const [scrollingUp, setScrollingUp] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  // Bloquear el scroll cuando el menu está abierto
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollingUp(currentScrollY < lastScrollY.current);

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return { scrollingUp }
}