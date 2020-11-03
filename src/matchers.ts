/**
 * <http://www.w3.org/TR/css3-values/#integers>
 */
const CSS_INTEGER = '[-\\+]?\\d+%?';

/**
 * <http://www.w3.org/TR/css3-values/#number-value>
 */
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';

/**
 * Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
 */
const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`;

/**
 * Actual matching.
 * Parentheses and commas are optional, but not required.
 * Whitespace can take the place of commas or opening paren
 */
const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;
const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;

export const cssUnit = new RegExp(CSS_UNIT);
export const rgb = new RegExp(`rgb${PERMISSIVE_MATCH3}`);
export const rgba = new RegExp(`rgba${PERMISSIVE_MATCH4}`);
export const hsl = new RegExp(`hsl${PERMISSIVE_MATCH3}`);
export const hsla = new RegExp(`hsla${PERMISSIVE_MATCH4}`);
export const hsv = new RegExp(`hsv${PERMISSIVE_MATCH3}`);
export const hsva = new RegExp(`hsva${PERMISSIVE_MATCH4}`);
export const hex3 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
export const hex6 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
export const hex4 = /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
export const hex8 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
