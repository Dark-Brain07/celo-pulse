export const isEmail = (str: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
export const isUrl = (str: string): boolean => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(str);
export const isHex = (str: string): boolean => /^[0-9A-Fa-f]+$/.test(str);
export const isHexColor = (str: string): boolean => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
export const isAlpha = (str: string): boolean => /^[A-Za-z]+$/.test(str);
export const isNumeric = (str: string): boolean => /^\d+$/.test(str);
export const isAlphaNumeric = (str: string): boolean => /^[A-Za-z0-9]+$/.test(str);
