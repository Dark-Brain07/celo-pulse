export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
export const lowercase = (str: string): string => str.toLowerCase();
export const uppercase = (str: string): string => str.toUpperCase();
export const isString = (val: any): val is string => typeof val === 'string';
