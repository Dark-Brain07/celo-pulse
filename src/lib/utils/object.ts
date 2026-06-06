export const isObject = (val: any): val is Record<string, any> => val !== null && typeof val === 'object' && !Array.isArray(val);
export const keys = <T extends object>(obj: T): (keyof T)[] => Object.keys(obj) as (keyof T)[];
export const values = <T extends object>(obj: T): T[keyof T][] => Object.values(obj) as T[keyof T][];
export const entries = <T extends object>(obj: T): [keyof T, T[keyof T]][] => Object.entries(obj) as [keyof T, T[keyof T]][];
export const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => { const res = { ...obj }; keys.forEach(key => delete res[key]); return res; };
export const pick = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> => keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {} as Pick<T, K>);
export const merge = <T extends object, U extends object>(target: T, source: U): T & U => ({ ...target, ...source });
export const invert = (obj: Record<string, string>): Record<string, string> => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
