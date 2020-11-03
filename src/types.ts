export type Value = number | string;

export type Format = string | boolean;

export interface ColorObject {
  r?: number;
  g?: number;
  b?: number;
  h?: number;
  s?: number;
  l?: number;
  v?: number;
  a?: Value;
  format?: Format;
}

export type Input = string | ColorObject;

export interface Color {
  ok: boolean;
  input: Input;
  r: number;
  g: number;
  b: number;
  a: number;
  roundA: number;
  format: Format;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface RawRGBA extends RGBA {
  ok: boolean;
  format: Format;
}

export interface HSL {
  h: Value;
  s: Value;
  l: Value;
}

export interface HSLA extends HSL {
  a: Value;
}

export interface HSV {
  h: Value;
  s: Value;
  v: Value;
}

export interface HSVA extends HSV {
  a: Value;
}
