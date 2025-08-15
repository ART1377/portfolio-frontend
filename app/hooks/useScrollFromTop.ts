import { useEffect, useState, useCallback } from "react";

const MAX_SCROLL = 80;
const SCROLL_START = 500;
const SCROLL_DIVISOR = 10;

export function useScrollFromTop() {
  const [scrollFromTop, setScrollFromTop] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    if (scrollY < SCROLL_START) {
      setScrollFromTop(0);
      return;
    }

    const calcScroll = Math.min(
      Math.floor((scrollY - SCROLL_START) / SCROLL_DIVISOR),
      MAX_SCROLL
    );

    setScrollFromTop(calcScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scrollFromTop;
}
