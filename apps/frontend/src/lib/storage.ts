export const safeGetStorage = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading localStorage", error);
    return defaultValue;
  }
};

/**
 * Safely stringifies and stores a value in localStorage
 */
export const safeSetStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage", error);
  }
};

/**
 * Safely removes an item from localStorage
 */
export const safeRemoveStorage = (key: string) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage", error);
  }
};
