export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
export const lowercase = (str: string): string => str.toLowerCase();
export const uppercase = (str: string): string => str.toUpperCase();
export const isString = (val: any): val is string => typeof val === 'string';
export const reverseString = (str: string): string => str.split('').reverse().join('');
export const truncate = (str: string, len: number): string => str.length > len ? str.substring(0, len) + '...' : str;
export const camelCase = (str: string): string => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, '');
