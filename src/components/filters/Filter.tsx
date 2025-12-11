import classNames from 'classnames';
import { useId, useState, type InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, 'autoComplete'>;

type Props = {
  className?: string;
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
  const { id, label, value, onChange, className, errorMessage, inputProps } =
    props;
  const [touched, setTouched] = useState(false);

  const invalid = !!(errorMessage && touched);
  const errorId = useId();

  return (
    <StyledFilter className={className}>
      <InputDiv>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          className={classNames({ invalid })}
          value={value}
          data-testid={id}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          {...inputProps}
        />
      </InputDiv>
      {invalid && <InvalidMessage id={errorId}>{errorMessage}</InvalidMessage>}
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
    width: 50px;
  }

  input {
    flex: 1;
    border-radius: 6px;

    &.invalid {
      border: 1px solid red;
    }
  }
`;

const InvalidMessage = styled.div`
  align-self: flex-end;
`;
