import type { Value } from './types';

/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 */
export default (a: Value): number => {
  const value = parseFloat(String(a));
  return isNaN(value) || value < 0 || value > 1 ? 1 : value;
};
