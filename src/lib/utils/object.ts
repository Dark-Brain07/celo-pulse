export const isObject = (val: any): val is Record<string, any> => val !== null && typeof val === 'object' && !Array.isArray(val);
