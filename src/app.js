import { getDistance, getData, isPositionValid } from './utils.js';

/**
 * Get the 3 nearest coffee shops from the user's position
 *
 * @param {Object} position
 * @param {Number} position.x
 * @param {Number} position.y
 *
 * @returns {Array<position>}
 */
export async function getNearestShops(position) {
  if (!isPositionValid(position)) {
    throw new Error('x and y coordinates must be prrovided as numbers');
  }

  const coffeeShops = await getData();

  // extend coffee shops with distance from user position
  const extendedCoffeeShops = coffeeShops.map((shop) => ({
    ...shop,
    distance: getDistance(position, { x: Number(shop.x), y: Number(shop.y) }),
  }));

  // sort ascending by distance and return the 3 nearest shops
  return extendedCoffeeShops
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);
}
