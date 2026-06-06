export const now = (): number => Date.now();
export const isDate = (val: any): val is Date => val instanceof Date && !isNaN(val.getTime());
