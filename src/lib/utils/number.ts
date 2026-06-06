export const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
export const clamp = (val: number, min: number, max: number): number => Math.min(Math.max(val, min), max);
export const inRange = (num: number, min: number, max: number): boolean => num >= min && num <= max;
export const round = (num: number, decimals: number = 0): number => Number(Math.round(Number(num + 'e' + decimals)) + 'e-' + decimals);
export const isNumber = (val: any): val is number => typeof val === 'number' && !isNaN(val);
export const toFixed = (num: number, decimals: number = 2): string => num.toFixed(decimals);
export const isEven = (num: number): boolean => num % 2 === 0;
export const isOdd = (num: number): boolean => Math.abs(num % 2) === 1;
