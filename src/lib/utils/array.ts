export const unique = <T>(arr: T[]): T[] => Array.from(new Set(arr));
export const chunk = <T>(arr: T[], size: number): T[][] => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
export const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
export const flatten = <T>(arr: any[]): T[] => arr.flat(Infinity) as T[];
export const head = <T>(arr: T[]): T | undefined => arr[0];
export const tail = <T>(arr: T[]): T[] => arr.slice(1);
export const last = <T>(arr: T[]): T | undefined => arr[arr.length - 1];
