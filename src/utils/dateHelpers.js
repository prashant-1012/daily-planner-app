import { 
  addDays, 
  format, 
  isSameDay, 
  startOfToday, 
  eachDayOfInterval, 
  startOfTomorrow 
} from 'date-fns';

/**
 * Generates an array of dates starting from a specific date.
 * @param {number} count - Number of days to generate.
 * @param {Date} startDate - The date to start from.
 * @returns {Date[]}
 */
export const getNextDays = (count = 7, startDate = startOfToday()) => {
  return eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, count - 1),
  });
};


/**
 * Formats a date for display in the card header.
 * @param {Date} date 
 * @returns {string} - e.g., "Monday, June 12"
 */
export const formatDayHeader = (date) => {
  return format(date, 'EEEE, MMM do');
};

/**
 * Checks if a date is today.
 * @param {Date} date 
 * @returns {boolean}
 */
export const isToday = (date) => {
  return isSameDay(date, startOfToday());
};

/**
 * Checks if a date is tomorrow.
 * @param {Date} date 
 * @returns {boolean}
 */
export const isTomorrow = (date) => {
  return isSameDay(date, startOfTomorrow());
};

/**
 * Formats a date to a standard string for Redux storage.
 * @param {Date} date 
 * @returns {string} - e.g., "2024-06-12"
 */
export const formatDateKey = (date) => {
  return format(date, 'yyyy-MM-dd');
};
