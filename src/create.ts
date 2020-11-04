import names from './names';
import rgbToRGB from './rgb-to-rgb';
import hslToRGB from './hsl-to-rgb';
import hsvToRGB from './hsv-to-rgb';
import boundAlpha from './bound-alpha';
import convertToPercentage from './convert-to-percentage';
import * as matchers from './matchers';
import type {
  Color,
  Format,
  Input,
  ColorObject,
  RawRGBA,
  Value,
} from './types';

const trimLeft = /^\s+/;
const trimRight = /\s+$/;
const tinyCounter = 0;
const mathRound = Math.round;
const mathMin = Math.min;
const mathMax = Math.max;
const mathRandom = Math.random;

/**
 * Parse a base-16 hex value into a base-10 integer
 */
const parseIntFromHex = (value: string): number => parseInt(value, 16);

/**
 * Converts a decimal to a hex value
 */
const convertDecimalToHex = (value: string): string =>
  Math.round(parseFloat(value) * 255).toString(16);

/**
 * Converts a hex value to a decimal
 */
const convertHexToDecimal = (value: string): number =>
  parseIntFromHex(value) / 255;

/**
 * Permissive string parsing.
 * Takes in a number of formats, and output an object based on detected format.
 * Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
const stringInputToRawColor = (input: string): ColorObject => {
  let color: string = input
    .replace(trimLeft, '')
    .replace(trimRight, '')
    .toLowerCase();
  let format;

  if (color in names) {
    color = names[color];
    format = 'name';
  } else if (color === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether the color is initialized with string or object.
  let match;

  if ((match = matchers.rgb.exec(color))) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    };
  }

  if ((match = matchers.rgba.exec(color))) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
      a: parseFloat(match[4]),
    };
  }

  if ((match = matchers.hsl.exec(color))) {
    return {
      h: parseFloat(match[1]),
      s: parseFloat(match[2]),
      l: parseFloat(match[3]),
    };
  }

  if ((match = matchers.hsla.exec(color))) {
    return {
      h: parseFloat(match[1]),
      s: parseFloat(match[2]),
      l: parseFloat(match[3]),
      a: parseFloat(match[4]),
    };
  }

  if ((match = matchers.hsv.exec(color))) {
    return {
      h: parseFloat(match[1]),
      s: parseFloat(match[2]),
      v: parseFloat(match[3]),
    };
  }

  if ((match = matchers.hsva.exec(color))) {
    return {
      h: parseFloat(match[1]),
      s: parseFloat(match[2]),
      v: parseFloat(match[3]),
      a: parseFloat(match[4]),
    };
  }

  if ((match = matchers.hex8.exec(color))) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: format || 'hex8',
    };
  }

  if ((match = matchers.hex6.exec(color))) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: format || 'hex',
    };
  }

  if ((match = matchers.hex4.exec(color))) {
    return {
      r: parseIntFromHex(`${match[1]}${match[1]}`),
      g: parseIntFromHex(`${match[2]}${match[2]}`),
      b: parseIntFromHex(`${match[3]}${match[3]}`),
      a: convertHexToDecimal(`${match[4]}${match[4]}`),
      format: format || 'hex8',
    };
  }

  if ((match = matchers.hex3.exec(color))) {
    return {
      r: parseIntFromHex(`${match[1]}${match[1]}`),
      g: parseIntFromHex(`${match[2]}${match[2]}`),
      b: parseIntFromHex(`${match[3]}${match[3]}`),
      format: format || 'hex',
    };
  }

  return { r: 0, g: 0, b: 0 };
};

/**
 * Take in a single string / number and check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
const isValidCSSUnit = (unit: number) =>
  Boolean(matchers.cssUnit.exec(String(unit)));

const inputToRGBA = (input: ColorObject | string): RawRGBA => {
  let rgb = { r: 0, g: 0, b: 0 };
  let a: Value = 1;
  let format: Format = false;
  let ok = false;
  let s, l, v;

  if (typeof input === 'string') {
    input = stringInputToRawColor(input);
  }

  if (typeof input === 'object') {
    format = input.format ?? format;
    a = input.a ?? 1;

    if (
      input.r !== undefined &&
      input.g !== undefined &&
      input.b !== undefined &&
      isValidCSSUnit(input.r) &&
      isValidCSSUnit(input.g) &&
      isValidCSSUnit(input.b)
    ) {
      rgb = rgbToRGB(input.r, input.g, input.b);
      ok = true;
      format = String(input.r).substr(-1) === '%' ? 'prgb' : 'rgb';
    } else if (
      input.h !== undefined &&
      input.s !== undefined &&
      input.l !== undefined &&
      isValidCSSUnit(input.h) &&
      isValidCSSUnit(input.s) &&
      isValidCSSUnit(input.l)
    ) {
      s = convertToPercentage(input.s);
      l = convertToPercentage(input.l);
      rgb = hslToRGB(input.h, s, l);
      ok = true;
      format = 'hsl';
    } else if (
      input.h !== undefined &&
      input.s !== undefined &&
      input.v !== undefined &&
      isValidCSSUnit(input.h) &&
      isValidCSSUnit(input.s) &&
      isValidCSSUnit(input.v)
    ) {
      s = convertToPercentage(input.s);
      v = convertToPercentage(input.v);
      rgb = hsvToRGB(input.h, s, v);
      ok = true;
      format = 'hsv';
    }
  }

  a = boundAlpha(a);

  return {
    r: mathMin(255, mathMax(rgb.r, 0)),
    g: mathMin(255, mathMax(rgb.g, 0)),
    b: mathMin(255, mathMax(rgb.b, 0)),
    a,
    format: input.format ?? format,
    ok,
  };
};

export default (input: Input): Color => {
  const color = {
    ...inputToRGBA(input),
    roundA: 100,
    input,
  };

  color.roundA = mathRound(100 * color.a) / 100;

  // Don't let the range of [0,255] come back in [0,1].
  // Potentially lose a little bit of precision here, but will fix issues where
  // .5 gets interpreted as half of the total, instead of half of 1.
  // If it was supposed to be 128, this was already taken care of by `inputToRGBA`.
  if (color.r < 1) {
    color.r = mathRound(color.r);
  }

  if (color.g < 1) {
    color.g = mathRound(color.g);
  }

  if (color.b < 1) {
    color.b = mathRound(color.b);
  }

  return color;
};
