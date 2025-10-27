import { createTheme, ThemeColors, ThemeTokens, defaultTheme } from "@chromind/core";

const petShopLight: ThemeColors = {
  ...defaultTheme.colors,
  brand: "#F97316",
  brandAccent: "#22C55E",
  surface: "#FFF7ED",
};

const petShopDark: ThemeColors = {
  ...defaultTheme.colors,
  background: "#1F1209",
  surface: "#2B1A0F",
  text: "#FEF3C7",
  mutedText: "#FDBA74",
  border: "#3F2A19",
  brand: "#FB923C",
  brandAccent: "#4ADE80",
};

export const petShopTheme: ThemeTokens = createTheme({
  colors: petShopLight,
  modes: {
    dark: {
      colors: petShopDark,
    },
  },
});
