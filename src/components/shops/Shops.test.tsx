import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as hooks from '../../hooks/usePrepareShops';
import { Shops } from './Shops';

const mockShops = [
  { id: 1, name: 'Shop1', x: 23, y: 43 },
  { id: 2, name: 'Shop2', x: 543, y: -43 },
  { id: 3, name: 'Shop3', x: 213, y: 43 },
  { id: 4, name: 'Shop4', x: -7, y: 52 },
];

describe('Shops component', () => {
  it('renders loading state', () => {
    vi.spyOn(hooks, 'usePrepareShops').mockReturnValue({
      shops: undefined,
      isLoading: true,
      isError: false,
    });

    render(<Shops x={null} y={null} name={''} />);

    expect(screen.getByText('Loading coffee shops...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.spyOn(hooks, 'usePrepareShops').mockReturnValue({
      shops: undefined,
      isLoading: false,
      isError: true,
    });

    render(<Shops x={null} y={null} name={''} />);

    expect(
      screen.getByText('Something went wrong while fetching coffee shops.')
    ).toBeInTheDocument();
  });

  it('renders no shops message', () => {
    vi.spyOn(hooks, 'usePrepareShops').mockReturnValue({
      shops: [],
      isLoading: false,
      isError: false,
    });

    render(<Shops x={null} y={null} name={''} />);

    expect(
      screen.getByText('Sorry, no coffee shops available in your area :(')
    ).toBeInTheDocument();
  });

  it('renders shops with user position and highlights top 3', () => {
    vi.spyOn(hooks, 'usePrepareShops').mockReturnValue({
      shops: mockShops,
      isLoading: false,
      isError: false,
    });

    render(<Shops x={23} y={435} name={''} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockShops.length);

    // First 3 should have highlight class
    for (let i = 0; i < 3; i++) {
      expect(listItems[i].classList.contains('highlight')).toBe(true);
    }

    // The last one should not have
    expect(listItems[3].classList.contains('highlight')).toBe(false);
  });
});
