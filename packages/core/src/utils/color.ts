const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export const hexToRgba = (hex: string, alpha = 1): string => {
  const normalized = hex.trim();
  const match = HEX_REGEX.exec(normalized);

  if (!match) {
    return normalized;
  }

  const [, rHex, gHex, bHex] = match;
  const r = parseInt(rHex, 16);
  const g = parseInt(gHex, 16);
  const b = parseInt(bHex, 16);

  const clamped = Math.min(Math.max(alpha, 0), 1);

  return `rgba(${r}, ${g}, ${b}, ${clamped})`;
};
