/**
 * Returns the current date in YYYY-MM-DD format
 */
export const getFormattedDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Calculates the absolute difference in days between two dates
 */
export const calculateDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
