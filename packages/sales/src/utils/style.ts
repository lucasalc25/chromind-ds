import { ThemeTokens } from "@prisma-ui/core";
import { hexToRgba } from "./color";

export const buildFocusRing = (color: string, alpha = 0.45) =>
  `0 0 0 3px ${hexToRgba(color, alpha)}`;

export const transition = (properties: string[]) =>
  properties.map((prop) => `${prop} 160ms ease`).join(", ");

export const surfaceLayer = (
  theme: ThemeTokens,
  opacity = 0.65,
  blur = 24
) => ({
  background: hexToRgba(theme.colors.surface, opacity),
  boxShadow: `0 12px ${blur}px ${hexToRgba(theme.colors.text, 0.08)}`,
});
