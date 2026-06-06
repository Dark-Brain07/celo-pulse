export const isEmail = (str: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
export const isUrl = (str: string): boolean => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(str);
