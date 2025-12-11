import { describe, expect, it } from 'vitest';
import { getInputErrorMessage } from './utils';

describe('isFilterInvalid', () => {
  it('returns mandatory message when field is mandatory and empty', () => {
    expect(getInputErrorMessage(true, '')).toEqual('This field is mandatory');
  });

  it('returns number error message when field is mandatory, isNumber true, but value is not number', () => {
    expect(getInputErrorMessage(true, 'abc', true)).toEqual(
      'Value must be a number'
    );
  });

  it('returns no error message for mandatory numeric field with number value', () => {
    expect(getInputErrorMessage(true, '123', true)).toEqual('');
  });

  it('returns no error message for non-mandatory empty value', () => {
    expect(getInputErrorMessage(false, '')).toEqual('');
  });
});
