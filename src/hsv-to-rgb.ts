import bound01 from './bound';
import { RGB, Value } from './types';

/**
 * Converts an HSV color value to RGB.
 * Assumes: h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * Returns: { r, g, b } in the set [0, 255]
 */
export default (h: Value, s: Value, v: Value): RGB => {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);

  const i = Math.floor(h),
    f = h - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s),
    mod = i % 6,
    r = [v, q, p, p, t, v][mod],
    g = [t, v, v, q, p, p][mod],
    b = [p, p, t, v, v, q][mod];

  return { r: r * 255, g: g * 255, b: b * 255 };
};
