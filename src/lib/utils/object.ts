export const isObject = (val: any): val is Record<string, any> => val !== null && typeof val === 'object' && !Array.isArray(val);
export const keys = <T extends object>(obj: T): (keyof T)[] => Object.keys(obj) as (keyof T)[];
