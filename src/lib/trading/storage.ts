import { useCallback, useEffect, useState } from "react";

/**
 * SSR-safe localStorage state. Value is read after mount so server HTML and
 * first client render match.
 */
export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* corrupted or unavailable storage — keep defaults */
    }
    setHydrated(true);
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* storage full or blocked — state still updates in memory */
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update, hydrated] as const;
}
