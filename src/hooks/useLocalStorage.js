import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  if (typeof window === "undefined") return initValue;

  const localValue = localStorage.getItem(key);
  if (localValue !== null && localValue !== undefined) {
    try {
      return JSON.parse(localValue);
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
    }
  }

  if (typeof initValue === "function") return initValue();

  return initValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
