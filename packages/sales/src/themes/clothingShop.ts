import {
  createTheme,
  ThemeColors,
  ThemeTokens,
  defaultTheme,
} from "@prisma-ui/core";

const clothingLight: ThemeColors = {
  ...defaultTheme.colors,
  brand: "#0F172A",
  brandAccent: "#F59E0B",
  surface: "#F8FAFC",
};

const clothingDark: ThemeColors = {
  ...defaultTheme.colors,
  background: "#0C0C0C",
  surface: "#1A1A1A",
  text: "#F3F3F3",
  mutedText: "#9CA3AF",
  border: "#2E2E2E",
  brand: "#FFFFFF",
  brandAccent: "#F5F5F5",
};

export const clothingShopTheme: ThemeTokens = createTheme({
  colors: clothingLight,
  modes: {
    dark: {
      colors: clothingDark,
    },
  },
});
