import { useEffect } from "react";

type Options = {
  key: string;
  callback: (event: KeyboardEvent) => void;
  enabled?: boolean; 
};


export function useKeyPressHandler({ key, callback, enabled = true }: Options) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [key, callback, enabled]);
}
