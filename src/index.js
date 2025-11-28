import { getNearestShops } from './app.js';
import { isPositionValid } from './utils.js';

async function main() {
  const x = Number(process.argv[2]);
  const y = Number(process.argv[3]);
  const position = { x, y };

  if (!isPositionValid(position)) {
    throw new Error('x and y coordinates must be prrovided as numbers');
  }

  try {
    const nearestShops = await getNearestShops(position);
    nearestShops.forEach((shop) => {
      console.log(`${shop.name}, ${shop.distance}`);
    });
  } catch (error) {
    throw new Error('Failed to get nearest shops:', error.message);
  }
}

main();
