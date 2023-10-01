import { useState, useEffect, useRef } from "react";

export default function useComponentVisible<T extends HTMLElement>(
  initialIsVisible: boolean,
  onClickOutside?: () => void,
) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<T | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
      onClickOutside?.();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line
  }, []);

  return [ref, isComponentVisible, setIsComponentVisible] as const;
}
