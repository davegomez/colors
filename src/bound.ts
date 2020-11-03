type Value = string | number;

const isString = (input: Value) => typeof input === 'string';

/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 */
const isOnePointZero = (x: Value): boolean =>
  isString(x) && String(x).indexOf('.') !== -1 && parseFloat(String(x)) === 1;

/**
 * Check to see if string passed in is a percentage
 */
const isPercentage = (x: Value): boolean =>
  isString(x) && String(x).indexOf('%') !== -1;

/**
 * Take input from [0, n] and return it as [0, 1]
 */
export default (n: Value, max: number): number => {
  let value = n;

  if (isOnePointZero(value)) {
    value = '100%';
  }

  const processPercent = isPercentage(value);
  value = Math.min(max, Math.max(0, parseFloat(String(value))));

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt(String(value * max), 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(value - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return (value % max) / parseFloat(String(max));
};
