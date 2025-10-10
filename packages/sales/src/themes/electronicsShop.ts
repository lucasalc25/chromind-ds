import { createTheme, ThemeColors, ThemeTokens, defaultTheme } from "@prisma-ui/core";

const electronicsLight: ThemeColors = {
  ...defaultTheme.colors,
  brand: "#2563EB",
  brandAccent: "#06B6D4",
  surface: "#F0F9FF",
};

const electronicsDark: ThemeColors = {
  ...defaultTheme.colors,
  background: "#0B1220",
  surface: "#0F1629",
  text: "#E5E7EB",
  mutedText: "#9CA3AF",
  border: "#1F2A44",
  brand: "#3B82F6",
  brandAccent: "#22D3EE",
};

export const electronicsShopTheme: ThemeTokens = createTheme({
  colors: electronicsLight,
  modes: {
    dark: {
      colors: electronicsDark,
    },
  },
});