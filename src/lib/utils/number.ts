export const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
export const clamp = (val: number, min: number, max: number): number => Math.min(Math.max(val, min), max);
export const inRange = (num: number, min: number, max: number): boolean => num >= min && num <= max;
export const round = (num: number, decimals: number = 0): number => Number(Math.round(Number(num + 'e' + decimals)) + 'e-' + decimals);
