export const unique = <T>(arr: T[]): T[] => Array.from(new Set(arr));
export const chunk = <T>(arr: T[], size: number): T[][] => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
