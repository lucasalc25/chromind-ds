import { createTheme, ThemeColors, ThemeTokens, defaultTheme } from "@chromind/core";

const toyShopLight: ThemeColors = {
  ...defaultTheme.colors,
  brand: "#F43F5E",
  brandAccent: "#C084FC",
  surface: "#FFF1F5",
};

const toyShopDark: ThemeColors = {
  ...defaultTheme.colors,
  background: "#1F1014",
  surface: "#2C151B",
  text: "#F3E8FF",
  mutedText: "#D1C4E9",
  border: "#44212B",
  brand: "#F87171",
  brandAccent: "#D8B4FE",
};

export const toyShopTheme: ThemeTokens = createTheme({
  colors: toyShopLight,
  modes: {
    dark: {
      colors: toyShopDark,
    },
  },
});
