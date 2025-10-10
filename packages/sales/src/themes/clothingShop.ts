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
  background: "#050914",
  surface: "#0B1220",
  text: "#F8FAFC",
  mutedText: "#CBD5F5",
  border: "#1E293B",
  brand: "#F8FAFC",
  brandAccent: "#FACC15",
};

export const clothingShopTheme: ThemeTokens = createTheme({
  colors: clothingLight,
  modes: {
    dark: {
      colors: clothingDark,
    },
  },
});
