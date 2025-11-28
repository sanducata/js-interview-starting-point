import { getDistance, isPositionValid, retry } from '../src/utils.js';

describe('Utils', () => {
  // isPositionValid
  test('isPositionValid returns true for valid numbers', () => {
    expect(isPositionValid({ x: 23, y: 44 })).toBe(true);
  });

  test('isPositionValid returns false for invalid x coordinate', () => {
    expect(isPositionValid({ x: 'dqwef', y: 2 })).toBe(false);
  });

  test('isPositionValid returns false for invalid y coordinate', () => {
    expect(isPositionValid({ x: 52, y: 'cdd6dc' })).toBe(false);
  });

  test('isPositionValid returns false for invalid x and y', () => {
    expect(isPositionValid({ x: '2sd3gr', y: 'cdddc' })).toBe(false);
  });

  // getDistance
  test('getDistance returns correct distance with 4 decimals', () => {
    const result = getDistance({ x: 0, y: 0 }, { x: 3, y: 4 });
    expect(result).toBe('5.0000');
  });

  // retry
  test('retry returns result on first successful try', async () => {
    const callback = jest.fn().mockResolvedValue('success');
    const result = await retry(callback);

    expect(result).toBe('success');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('retry retries until success', async () => {
    const callback = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValueOnce('success');
    const result = await retry(callback, 3, 20);

    expect(result).toBe('success');
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('retry throws error after max retries', async () => {
    const callback = jest
      .fn()
      .mockRejectedValue(new Error('failed more than max retries'));

    await expect(retry(callback, 3, 20)).rejects.toThrow(
      'failed more than max retries'
    );
  });
});
