"use client";

import { useEffect, RefObject } from "react";

export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent) => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      const clickedInside = refs.some((ref) =>
        ref.current?.contains(event.target as Node)
      );
      if (!clickedInside) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [refs, handler, enabled]);
}
