// Date utility functions for consistent formatting

const monthNames = {
  1: 'Yanvar',
  2: 'Fevral', 
  3: 'Mart',
  4: 'Aprel',
  5: 'May',
  6: 'İyun',
  7: 'İyul',
  8: 'Avqust',
  9: 'Sentyabr',
  10: 'Oktyabr',
  11: 'Noyabr',
  12: 'Dekabr'
};

/**
 * Format date to Azerbaijani format: "7 İyul 2025"
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date string
 */
export const formatDateAz = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Bilinməyən tarix';
  }
  
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  
  return `${day} ${monthNames[month]} ${year}`;
};

/**
 * Format date for relative time display
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - dateObj;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes <= 1 ? 'İndi' : `${diffMinutes} dəqiqə əvvəl`;
    }
    return diffHours === 1 ? '1 saat əvvəl' : `${diffHours} saat əvvəl`;
  }
  
  if (diffDays === 1) {
    return 'Dünən';
  }
  
  if (diffDays < 7) {
    return `${diffDays} gün əvvəl`;
  }
  
  return formatDateAz(dateObj);
};

/**
 * Parse various date formats and return a Date object
 * @param {string|Date} dateInput - Date in various formats
 * @returns {Date} Date object
 */
export const parseDate = (dateInput) => {
  if (dateInput instanceof Date) {
    return dateInput;
  }
  
  if (typeof dateInput === 'string') {
    // Handle Azerbaijani format: "7 İyul 2025"
    const azFormatMatch = dateInput.match(/(\d+)\s+(\w+)\s+(\d{4})/);
    if (azFormatMatch) {
      const [, day, monthName, year] = azFormatMatch;
      const monthNumber = Object.keys(monthNames).find(key => monthNames[key] === monthName);
      if (monthNumber) {
        return new Date(parseInt(year), parseInt(monthNumber) - 1, parseInt(day));
      }
    }
    
    // Handle ISO format or other standard formats
    return new Date(dateInput);
  }
  
  return new Date();
};
