import { neutralColors, NeutralColors } from "../tokens/colors";
import { radii, Radii } from "../tokens/radii";
import { spacing, SpacingFn } from "../tokens/spacing";
import { typography, Typography } from "../tokens/typography";

export type ThemeColors = NeutralColors & {
  brand: string;
  brandAccent: string;
};

export type TransitionTokens = {
  transition: (
    props: string | string[],
    duration?: string,
    easing?: string
  ) => string;
  durations: { fast: string; normal: string; slow: string };
  easing: { standard: string; emphasized: string };
};

export type ThemeTokens = {
  colors: ThemeColors;
  radii: Radii;
  spacing: SpacingFn;
  typography: Typography;
  transition?: TransitionTokens;
  modes?: {
    dark?: Partial<Omit<ThemeTokens, "modes">>; // overrides p/ dark
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
  transition: {
    transition: (props, duration = "180ms", easing = "ease") =>
      (Array.isArray(props) ? props : [props])
        .map((p) => `${p} ${duration} ${easing}`)
        .join(", "),
    durations: { fast: "120ms", normal: "180ms", slow: "240ms" },
    easing: { standard: "ease", emphasized: "cubic-bezier(.2,.8,.2,1)" },
  },
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
