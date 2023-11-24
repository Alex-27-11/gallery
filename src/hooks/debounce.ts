import { useEffect, useState } from "react";

export function useDebounce(value: string, dilay = 300): string {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), dilay);
    return () => clearTimeout(handler);
  }, [value, dilay]);

  return debounced;
}
