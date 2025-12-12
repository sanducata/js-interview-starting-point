/**
 * Calculate the distance between the user and a coffee shop using the Euclidean distance formula
 *
 * @param userPosition
 * @param shopPosition
 * @returns distance between user and coffee shop rounded to 4 decimals
 */
export const getDistance = (
  userPosition: { x: number; y: number },
  shopPosition: { x: number; y: number }
) => {
  const distX = userPosition.x - shopPosition.x;
  const distY = userPosition.y - shopPosition.y;

  return Number(Math.sqrt(distX * distX + distY * distY).toFixed(4));
};
