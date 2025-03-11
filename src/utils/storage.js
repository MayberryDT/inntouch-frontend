/**
 * Storage utility functions for working with localStorage
 */

const PREFIX = 'inntouch_';

/**
 * Sets an item in localStorage with the app prefix
 * 
 * @param {string} key - The key to store the value under
 * @param {any} value - The value to store
 */
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(`${PREFIX}${key}`, serializedValue);
  } catch (error) {
    console.error('Error setting localStorage item:', error);
  }
};

/**
 * Gets an item from localStorage with the app prefix
 * 
 * @param {string} key - The key to retrieve the value for
 * @param {any} defaultValue - The default value to return if the key doesn't exist
 * @returns {any} The stored value or defaultValue if not found
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(`${PREFIX}${key}`);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    return defaultValue;
  }
};

/**
 * Removes an item from localStorage with the app prefix
 * 
 * @param {string} key - The key to remove
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch (error) {
    console.error('Error removing localStorage item:', error);
  }
};

/**
 * Clears all app-specific items from localStorage
 */
export const clearAll = () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage items:', error);
  }
};

/**
 * Checks if localStorage is available in the current environment
 * 
 * @returns {boolean} Whether localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const testKey = `${PREFIX}test`;
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}; 