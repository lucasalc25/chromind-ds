import {
  createTheme,
  ThemeColors,
  ThemeTokens,
  defaultTheme,
} from "@prisma-ui/core";

const electronicsLight: ThemeColors = {
  ...defaultTheme.colors,
  brand: "#2563EB",
  brandAccent: "#06B6D4",
  surface: "#F0F9FF",
};

const electronicsDark: ThemeColors = {
  ...defaultTheme.colors,
  background: "#0A1A2F",
  surface: "#10243F",
  text: "#E2E8F0",
  mutedText: "#94A3B8",
  border: "#1E3A5F",
  brand: "#38BDF8",
  brandAccent: "#7DD3FC",
};

export const electronicsShopTheme: ThemeTokens = createTheme({
  colors: electronicsLight,
  modes: {
    dark: {
      colors: electronicsDark,
    },
  },
});
