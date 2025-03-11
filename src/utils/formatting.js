/**
 * Formatting utility functions
 */

/**
 * Formats a date to a readable string
 * 
 * @param {Date|string|number} date - The date to format
 * @param {Object} options - Formatting options
 * @param {string} options.format - The format to use ('short', 'medium', 'long', 'full')
 * @param {boolean} options.includeTime - Whether to include the time
 * @returns {string} The formatted date string
 */
export const formatDate = (date, options = {}) => {
  const { format = 'medium', includeTime = false } = options;
  
  if (!date) {
    return '';
  }
  
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    return '';
  }
  
  const formatOptions = {
    short: { dateStyle: 'short' },
    medium: { dateStyle: 'medium' },
    long: { dateStyle: 'long' },
    full: { dateStyle: 'full' },
  };
  
  if (includeTime) {
    formatOptions.short.timeStyle = 'short';
    formatOptions.medium.timeStyle = 'short';
    formatOptions.long.timeStyle = 'medium';
    formatOptions.full.timeStyle = 'long';
  }
  
  try {
    return new Intl.DateTimeFormat('en-US', formatOptions[format]).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Formats a number as currency
 * 
 * @param {number} amount - The amount to format
 * @param {Object} options - Formatting options
 * @param {string} options.currency - The currency code (default: 'USD')
 * @param {string} options.locale - The locale to use (default: 'en-US')
 * @returns {string} The formatted currency string
 */
export const formatCurrency = (amount, options = {}) => {
  const { currency = 'USD', locale = 'en-US' } = options;
  
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '';
  }
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '';
  }
};

/**
 * Formats a phone number
 * 
 * @param {string} phone - The phone number to format
 * @param {string} format - The format to use ('national', 'international')
 * @returns {string} The formatted phone number
 */
export const formatPhone = (phone, format = 'national') => {
  if (!phone) {
    return '';
  }
  
  // Remove non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  if (format === 'international') {
    // Format as international number
    if (digits.length === 10) {
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits[0] === '1') {
      return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
  } else {
    // Format as national number
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  }
  
  // If the phone number doesn't match expected formats, return as is
  return phone;
};

/**
 * Truncates text to a specified length
 * 
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length
 * @param {string} suffix - The suffix to add when truncated (default: '...')
 * @returns {string} The truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return `${text.slice(0, maxLength)}${suffix}`;
}; 