/**
 * Replace a decimal with it's percentage value
 */
export default (value: number): number | string =>
  value <= 1 ? `${value * 100}%` : value;
