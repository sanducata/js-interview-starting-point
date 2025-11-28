import { getNearestShops } from '../src/app';
import { getData } from '../src/utils.js';

jest.mock('../src/utils.js', () => {
  const actual = jest.requireActual('../src/utils.js');
  return {
    ...actual,
    getData: jest.fn(),
    isPositionValid: jest.fn(() => true),
  };
});

describe('App', () => {
  // mock getData response
  getData.mockResolvedValue([
    { id: 1, name: 'shop 1', x: '1', y: '10' },
    { id: 2, name: 'shop 2', x: '254', y: '-13' },
    { id: 3, name: 'shop 3', x: '34.12', y: '546.23' },
    { id: 4, name: 'shop 4', x: '-12.63', y: '3.45' },
    { id: 5, name: 'shop 5', x: '12', y: '-3' },
  ]);

  test('should return an array when the input is valid', async () => {
    const result = await getNearestShops({ x: 0, y: 0 });
    expect(Array.isArray(result)).toBe(true);
  });

  test('should return an array of 3 shops', async () => {
    const result = await getNearestShops({ x: 123, y: -43 });
    expect(result).toHaveLength(3);
  });

  test('should return shop 1, shop 2, shop 5', async () => {
    const result = await getNearestShops({ x: 1, y: 1 });
    expect(result[0].name).toBe('shop 1');
    expect(result[1].name).toBe('shop 5');
    expect(result[2].name).toBe('shop 4');
  });
});
