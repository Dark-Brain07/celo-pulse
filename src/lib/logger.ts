/**
 * Simple logger utility to unify console logs and allow easy toggling in production.
 */

const isProd = process.env.NODE_ENV === 'production';

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (!isProd) {
      console.info(`[INFO]: ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN]: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR]: ${message}`, ...args);
  },
  debug: (message: string, ...args: any[]) => {
    if (!isProd) {
      console.debug(`[DEBUG]: ${message}`, ...args);
    }
  },
};
