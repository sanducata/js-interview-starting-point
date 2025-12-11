/**
 * Returns an error message if the input value is invalid.
 *
 * @param mandatory Boolean indicating wether the filter is mandatory or not
 * @param value Filter value
 * @param isNumber Boolean indicating wether the filter should be a number or not
 * @returns Invalid status and error message if any
 */
export const getInputErrorMessage = (
  mandatory: boolean,
  value: string | number,
  isNumber = false
): string => {
  const isEmpty = !value;

  if (mandatory && isEmpty) {
    return 'This field is mandatory';
  }

  if (isNumber) {
    const isNumeric = !Number.isNaN(Number(value));
    if (!isNumeric) {
      return 'Value must be a number';
    }
  }

  return '';
};
