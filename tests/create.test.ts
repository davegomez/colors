import test from 'tape';
import { create as createColor } from '../src';

test('should create a color from a Hex, 8-digit (RGBA) Hex value', (t) => {
  t.plan(8);

  t.deepEqual(createColor('#000'), {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hex',
    input: '#000',
  });

  t.deepEqual(createColor('000'), {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hex',
    input: '000',
  });

  t.deepEqual(createColor('#369C'), {
    r: 51,
    g: 102,
    b: 153,
    a: 0.8,
    ok: true,
    roundA: 0.8,
    format: 'hex8',
    input: '#369C',
  });

  t.deepEqual(createColor('369C'), {
    r: 51,
    g: 102,
    b: 153,
    a: 0.8,
    ok: true,
    roundA: 0.8,
    format: 'hex8',
    input: '369C',
  });

  t.deepEqual(createColor('#d07d12'), {
    r: 208,
    g: 125,
    b: 18,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hex',
    input: '#d07d12',
  });

  t.deepEqual(createColor('d07d12'), {
    r: 208,
    g: 125,
    b: 18,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hex',
    input: 'd07d12',
  });

  t.deepEqual(createColor('#6060D288'), {
    r: 96,
    g: 96,
    b: 210,
    a: 0.5333333333333333,
    ok: true,
    roundA: 0.53,
    format: 'hex8',
    input: '#6060D288',
  });

  t.deepEqual(createColor('6060D288'), {
    r: 96,
    g: 96,
    b: 210,
    a: 0.5333333333333333,
    ok: true,
    roundA: 0.53,
    format: 'hex8',
    input: '6060D288',
  });
});

test('should create a color from an RGB, RGBA value', (t) => {
  t.plan(4);

  t.deepEqual(createColor('rgb (51, 102, 153)'), {
    r: 51,
    g: 102,
    b: 153,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'rgb',
    input: 'rgb (51, 102, 153)',
  });

  t.deepEqual(createColor('rgb 51 102 153'), {
    r: 51,
    g: 102,
    b: 153,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'rgb',
    input: 'rgb 51 102 153',
  });

  t.deepEqual(createColor('rgba (208, 125, 18, .5)'), {
    r: 208,
    g: 125,
    b: 18,
    a: 0.5,
    ok: true,
    roundA: 0.5,
    format: 'rgb',
    input: 'rgba (208, 125, 18, .5)',
  });

  t.deepEqual(createColor({ r: 208, g: 125, b: 18 }), {
    r: 208,
    g: 125,
    b: 18,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'rgb',
    input: { r: 208, g: 125, b: 18 },
  });
});

test('should create a color from a HSL, HSLA value', (t) => {
  t.plan(5);

  t.deepEqual(createColor('hsl(0, 100%, 50%)'), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hsl',
    input: 'hsl(0, 100%, 50%)',
  });

  t.deepEqual(createColor('hsla(0, 100%, 50%, .5)'), {
    r: 255,
    g: 0,
    b: 0,
    a: 0.5,
    ok: true,
    roundA: 0.5,
    format: 'hsl',
    input: 'hsla(0, 100%, 50%, .5)',
  });

  t.deepEqual(createColor('hsl(0, 100%, 50%)'), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hsl',
    input: 'hsl(0, 100%, 50%)',
  });

  t.deepEqual(createColor('hsl 0 1.0 0.5'), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hsl',
    input: 'hsl 0 1.0 0.5',
  });

  t.deepEqual(createColor({ h: 0, s: 1, l: 0.5 }), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hsl',
    input: { h: 0, s: 1, l: 0.5 },
  });
});

test('should create a color from a HSV, HSVA value', (t) => {
  t.plan(5);

  t.deepEqual(createColor('hsv(0, 100%, 100%)'), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hsv',
    input: 'hsv(0, 100%, 100%)',
  });

  t.deepEqual(createColor('hsva(0, 100%, 100%, .5)'), {
    r: 255,
    g: 0,
    b: 0,
    a: 0.5,
    ok: true,
    roundA: 0.5,
    format: 'hsv',
    input: 'hsva(0, 100%, 100%, .5)',
  });

  t.deepEqual(createColor('hsv (0 100% 100%)'), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hsv',
    input: 'hsv (0 100% 100%)',
  });

  t.deepEqual(createColor('hsv 0 1 1'), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hsv',
    input: 'hsv 0 1 1',
  });

  t.deepEqual(createColor({ h: 0, s: 100, v: 100 }), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'hsv',
    input: { h: 0, s: 100, v: 100 },
  });
});

test('should create a color from a color name', (t) => {
  t.plan(3);

  t.deepEqual(createColor('RED'), {
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'name',
    input: 'RED',
  });

  t.deepEqual(createColor('blanchedalmond'), {
    r: 255,
    g: 235,
    b: 205,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'name',
    input: 'blanchedalmond',
  });

  t.deepEqual(createColor('darkblue'), {
    r: 0,
    g: 0,
    b: 139,
    a: 1,
    ok: true,
    roundA: 1,
    format: 'name',
    input: 'darkblue',
  });
});
