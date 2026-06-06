export const now = (): number => Date.now();
export const isDate = (val: any): val is Date => val instanceof Date && !isNaN(val.getTime());
export const toUnix = (date: Date): number => Math.floor(date.getTime() / 1000);
export const fromUnix = (unix: number): Date => new Date(unix * 1000);
export const addDays = (date: Date, days: number): Date => { const d = new Date(date); d.setDate(d.getDate() + days); return d; };
