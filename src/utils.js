import { fetchAuthToken, fetchCoffeeShops } from './api.js';

/**
 * Retry callback function with exponential backoff.
 * Used when fetching data fails
 *
 * @param {Function} callback - async function to retry
 * @param {number} maxRetries - maximum number of retries (default 3)
 * @param {number} initialDelay - initial delay in ms (default 1000)
 * @returns {Promise}
 */
export const retry = async (callback, maxRetries = 3, initialDelay = 1000) => {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await callback();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt);

        console.error(
          `Attempt ${attempt + 1} failed. Retrying in ${
            delay / 1000
          } seconds...`
        );

        // wait before next retry
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};

/**
 * Calculate the distance between the user and a coffee shop using the Euclidean distance formula
 *
 * @param {{x: number, y: number}} userPosition
 * @param {{x: number, y: number}} shopPosition
 * @returns {number} distance between user and coffee shop rounded to 4 decimals
 */
export const getDistance = (userPosition, shopPosition) => {
  const distX = userPosition.x - shopPosition.x;
  const distY = userPosition.y - shopPosition.y;

  return Math.sqrt(distX * distX + distY * distY).toFixed(4);
};

/**
 * Get the coffe shops data
 *
 * @returns {Promise<Array<{id: number, name: string, x: string, y: string, created_at: string, updated_at: string}>>} array of coffee shops
 */
export const getData = async () => {
  const token = await fetchAuthToken();
  const coffeeShops = await fetchCoffeeShops(token);

  return coffeeShops;
};

/**
 * Check if position has x and y coordinates as numbers
 *
 * @param {{x: number, y: number}} position
 */
export const isPositionValid = (position) => {
  const { x, y } = position;

  return !isNaN(x) && !isNaN(y);
};
