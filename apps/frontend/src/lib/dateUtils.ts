export const getFormattedDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const calculateDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
