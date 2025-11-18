import { useEffect, useState } from "react";

interface FormData {
  [key: string]: any;
}

export function useFormPersistence<T extends FormData>(
  storageKey: string,
  defaultValues: T
) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted data on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setIsHydrated(true);
        return parsed;
      } catch (error) {
        console.error("Error parsing stored form data:", error);
        localStorage.removeItem(storageKey);
      }
    }
    setIsHydrated(true);
  }, [storageKey]);

  // Save data to localStorage
  const saveData = (data: T) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  // Clear persisted data
  const clearData = () => {
    localStorage.removeItem(storageKey);
  };

  // Get persisted data
  const getPersistedData = (): T | null => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing stored form data:", error);
        return null;
      }
    }
    return null;
  };

  return {
    isHydrated,
    saveData,
    clearData,
    getPersistedData,
  };
}
