export const rgbToHex = (red: number, green: number, blue: number) => {
  const rgb = blue | (green << 8) | (red << 16);
  return "#" + (0x1000000 + rgb).toString(16).slice(1);
};

export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Returns true if the color is dark,
 * so you can add a light text on top
 */
export const isColorDark = (
  color: string | { r: number; g: number; b: number },
) => {
  const toRGB = typeof color === "string" ? hexToRgb(color) : color;
  if (toRGB === null) return false;
  const { r, g, b } = toRGB;
  const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return a > 0.5;
};
