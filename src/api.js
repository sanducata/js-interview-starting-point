import { retry } from './utils.js';

const BASE_URL = 'https://api-challenge.agilefreaks.com/v1';

/**
 * Fetch an auth token.
 *
 * @returns {Promise<string>} auth token
 */
export const fetchAuthToken = async () =>
  retry(async () => {
    const response = await fetch(`${BASE_URL}/tokens`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(
        `Could not fetch token from ${response.url}. Response status: ${response.status} ${response.statusText}.`
      );
    }

    const data = await response.json();
    const token = data.token;

    if (!token) {
      throw new Error('Token not found!');
    }

    return token;
  });

/**
 * Fetch an array of coffee shops using an auth token.
 *
 * @param {string} token - auth token
 * @returns {Promise<Array<{id: number, name: string, x: string, y: string, created_at: string, updated_at: string}>>} array of coffee shops
 */
export const fetchCoffeeShops = async (token) => {
  if (!token) {
    throw new Error('A token must be provided!');
  }

  return retry(async () => {
    const response = await fetch(`${BASE_URL}/coffee_shops?token=${token}`);

    if (!response.ok) {
      throw new Error(
        `Could not fetch coffee shops from ${response.url}. Response status: ${response.status} ${response.statusText}.`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No coffee shops found!');
    }

    return data;
  });
};
