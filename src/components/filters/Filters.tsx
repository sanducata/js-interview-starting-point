import { useState } from 'react';
import { Filter } from './Filter';
import styled from 'styled-components';
import type { TFilter } from '../shops/Shops';

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

type Props = {
  onFiltersChange?: (filters: TFilter) => void;
};

export const Filters = (props: Props) => {
  const { onFiltersChange } = props;

  const [filters, setFilters] = useState<FilterItem[]>(initialFilters);
  const [fieldsValidation, setFieldsValidation] = useState(false);

  const onFilterChange = (id: string, value: string) => {
    const nextFilters = filters.map((f) => (f.id === id ? { ...f, value } : f));
    setFilters(nextFilters);

    const x = Number(nextFilters.find((f) => f.id === 'x')?.value) || null;
    const y = Number(nextFilters.find((f) => f.id === 'y')?.value) || null;
    const name = nextFilters.find((f) => f.id === 'name')?.value || '';

    if (onFiltersChange) {
      onFiltersChange({ x, y, name });
    }
  };

  const renderFilter = (filter: FilterItem, index: number) => {
    const { mandatory, isNumber, value } = filter;
    const errorMessage =
      fieldsValidation && mandatory && !value ? 'This field is mandatory' : '';

    return (
      <Filter
        id={filter.id}
        key={`filter-${filter.id}-${index}`}
        value={filter.value}
        onChange={(val) => {
          onFilterChange(filter.id, val);
          setFieldsValidation(true);
        }}
        label={`${filter.label}${mandatory ? '*' : ''}`}
        errorMessage={errorMessage}
        inputProps={{
          autoComplete: filter.id === 'name' ? 'organization' : 'off',
          required: mandatory,
          type: isNumber ? 'number' : 'text',
          onBlur: () => setFieldsValidation(true),
        }}
      />
    );
  };

  return (
    <Div>
      <Title>Filters</Title>
      <p>Fields marked with * are mandatory.</p>
      {filters.map(renderFilter)}
    </Div>
  );
};

const Div = styled.div`
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
