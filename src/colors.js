


export function hsv_to_rgb(h, s, v) {
  const h_i = Math.floor(h * 6);
  const f = h * 6 - h_i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r,g,b;
  if (h_i === 0)
    [r, g, b] = [v, t, p];
  if (h_i === 1)
    [r, g, b] = [q, v, p];
  if (h_i === 2)
    [r, g, b] = [p, v, t];
  if (h_i === 3)
    [r, g, b] = [p, q, v];
  if (h_i === 4)
    [r, g, b] = [t, p, v];
  if (h_i === 5)
    [r, g, b] = [v, p, q];
  return [Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)]
}

export function rgbToHex(rgb) {
  return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).reduce((a,b) => a + b);
}

const golden_ratio_conjugate = 0.618033988749895;

export function goldenRatioColor() {
  const h = (Math.random() + golden_ratio_conjugate) % 1;
  return rgbToHex(hsv_to_rgb(h, 0.5, 0.95));
}

export function crystalSpiralColor() {
  const h = (Math.random() * 2) % 1;
  return rgbToHex(hsv_to_rgb(h, 0.5, 0.95));
}