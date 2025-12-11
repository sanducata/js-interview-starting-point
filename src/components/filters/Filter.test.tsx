import { act, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Filter } from './Filter';

describe('Filter component', () => {
  it('renders a filter with a label and value', () => {
    render(
      <Filter id='1' label='Name' value={'San Francisco'} onChange={() => {}} />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('San Francisco');
  });

  it('renders an invalid filter if invalid is passed', async () => {
    render(
      <Filter
        id='2'
        label='x'
        value={''}
        onChange={() => {}}
        errorMessage={'This field is mandatory'}
      />
    );

    expect(screen.getByText('x')).toBeInTheDocument();
    const input = screen.getByRole('textbox');

    act(() => {
      input.focus();
      input.blur();
    });

    expect(input.classList.contains('invalid')).toBe(true);
    expect(screen.getByText('This field is mandatory')).toBeInTheDocument();
  });
});
