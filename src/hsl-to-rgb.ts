import bound01 from './bound';
import { RGB, Value } from './types';

const hue2rgb = (p: number, q: number, t: number): number => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

/**
 * Converts an HSL color value to RGB.
 * Assumes: h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * Returns: { r, g, b } in the set [0, 255]
 */
export default (h: Value, s: Value, l: Value): RGB => {
  let r, g, b;

  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
};
