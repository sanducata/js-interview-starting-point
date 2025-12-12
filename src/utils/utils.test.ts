import { describe, expect, it } from 'vitest';
import { getDistance } from './utils';

describe('getDistance', () => {
  it('returns correct distance with 4 decimals', () => {
    const result = getDistance({ x: 0, y: 0 }, { x: 3, y: 4 });
    expect(result).toEqual(5.0);
  });
});
