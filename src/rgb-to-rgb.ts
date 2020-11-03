import bound01 from './bound';
import type { RGB } from './types';

type Color = string | number;

/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * Assumes: r, g, b in [0, 255] or [0, 1]
 * Returns: { r, g, b } in [0, 255]
 */
export default (r: Color, g: Color, b: Color): RGB => ({
  r: bound01(r, 255) * 255,
  g: bound01(g, 255) * 255,
  b: bound01(b, 255) * 255,
});
