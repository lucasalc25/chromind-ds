import { neutralColors, NeutralColors } from "../tokens/colors";
import { radii, Radii } from "../tokens/radii";
import { spacing, SpacingFn } from "../tokens/spacing";
import { typography, Typography } from "../tokens/typography";

export type ThemeColors = NeutralColors & {
  brand: string;
  brandAccent: string;
};

export type ThemeTokens = {
  colors: ThemeColors;
  radii: Radii;
  spacing: SpacingFn;
  typography: Typography;
  modes?: {
    dark?: Partial<Omit<ThemeTokens, "modes">>; // overrides específicos p/ dark
  };
};

export const defaultTheme: ThemeTokens = {
  colors: {
    ...neutralColors,
    brand: "#6366F1",
    brandAccent: "#A78BFA",
  },
  radii,
  spacing,
  typography,
};

export const createTheme = (overrides: Partial<ThemeTokens>): ThemeTokens => {
  const base = defaultTheme;
  return {
    ...base,
    ...overrides,
    colors: { ...base.colors, ...(overrides.colors || {}) },
    radii: overrides.radii || base.radii,
    spacing: overrides.spacing || base.spacing,
    typography: overrides.typography || base.typography,
    modes: overrides.modes,
  };
};
