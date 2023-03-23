import { useRef } from "react";

import { LocalStorageHook } from "./local-storage.model";

export function useLocalStorage(): LocalStorageHook {
  function get<T = unknown>(key: string): T | null {
    const data = localStorage.getItem(key);

    if (!data) return null;
    return JSON.parse(data);
  }

  function set(key: string, value: any): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  function remove(key: string): void {
    localStorage.removeItem(key);
  }

  function reset(): void {
    localStorage.clear();
  }

  function isExist(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  const { current: ls } = useRef({ get, isExist, remove, reset, set });

  return ls;
}
