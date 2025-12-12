import { BASE_URL } from './constants';
import type { TShops } from './types';

export const getShops = async (
  token: string | undefined
): Promise<TShops[]> => {
  if (!token) {
    throw new Error('A token must be provided!');
  }

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

  return data.map((shop: TShops) => ({
    ...shop,
    x: Number(shop.x),
    y: Number(shop.y),
  }));
};
