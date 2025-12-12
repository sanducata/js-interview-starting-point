import { useState } from 'react';
import { Filter } from './Filter';
import styled from 'styled-components';
import { getInputErrorMessage } from '../../utils/utils';

type Props = { className?: string };

type FilterItem = {
  id: string;
  label: string;
  value: string;
  mandatory: boolean;
  isNumber?: boolean;
};

const initialFilters: FilterItem[] = [
  { id: 'x', label: 'X', value: '', mandatory: true, isNumber: true },
  { id: 'y', label: 'Y', value: '', mandatory: true, isNumber: true },
  { id: 'name', label: 'Name', value: '', mandatory: false },
];

export const Filters = styled((props: Props) => {
  const { className } = props;

  const [filters, setFilters] = useState<FilterItem[]>(initialFilters);

  const onFilterChange = (id: string, value: string) =>
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));

  const renderFilter = (filter: FilterItem, index: number) => {
    const { mandatory, isNumber, value } = filter;
    const errorMessage = getInputErrorMessage(mandatory, value, isNumber);

    return (
      <Filter
        id={filter.id}
        key={`filter-${filter.id}-${index}`}
        value={filter.value}
        onChange={(val) => onFilterChange(filter.id, val)}
        label={filter.label}
        errorMessage={errorMessage}
        inputProps={{
          autoComplete: filter.id === 'name' ? 'organization' : 'off',
          required: mandatory,
        }}
      />
    );
  };

  return (
    <div className={className}>
      <Title>Filters</Title>
      {filters.map(renderFilter)}
    </div>
  );
})`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
`;

const Title = styled.h2`
  margin-top: 0;
`;
