import classNames from 'classnames';
import { type InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'autoComplete' | 'required' | 'type' | 'onBlur' | 'onKeyDown'
>;

type Props = {
  id: string;
  /**
   * Label to display for the filter
   */
  label: string;
  /**
   * Value of the filter
   */
  value: string | number;
  /**
   * Callback when the filter value changes
   */
  onChange: (newValue: string) => void;
  /*
   * Error message to display when the filter is invalid
   */
  errorMessage?: string;
  /**
   * Additional props for the input element
   * */
  inputProps?: InputProps;
};

export const Filter = (props: Props) => {
  const { id, label, value, onChange, errorMessage, inputProps } = props;

  const invalid = !!errorMessage;

  return (
    <StyledFilter>
      <InputDiv>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          className={classNames({ invalid })}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...inputProps}
        />
      </InputDiv>
      {invalid && <InvalidMessage>{errorMessage}</InvalidMessage>}
    </StyledFilter>
  );
};

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputDiv = styled.div`
  display: flex;
  gap: 4px;

  label {
    min-width: 50px;
  }

  input {
    flex: 1;
    border-radius: 6px;
    border: 1px solid #8a8a8aff;
    min-width: 0;

    &.invalid {
      border: 1px solid red;
    }
  }
`;

const InvalidMessage = styled.div`
  align-self: flex-end;
`;
