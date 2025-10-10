import { createTheme, ThemeColors, ThemeTokens, defaultTheme } from "@prisma-ui/core";

const drugstoreLight: ThemeColors = {
  ...defaultTheme.colors,
  brand: "#14B8A6",
  brandAccent: "#86EFAC",
  surface: "#F0FDFA",
};

const drugstoreDark: ThemeColors = {
  ...defaultTheme.colors,
  background: "#062023",
  surface: "#0C2D2F",
  text: "#E0F2F1",
  mutedText: "#93D9C8",
  border: "#134548",
  brand: "#2DD4BF",
  brandAccent: "#BBF7D0",
};

export const drugstoreShopTheme: ThemeTokens = createTheme({
  colors: drugstoreLight,
  modes: {
    dark: {
      colors: drugstoreDark,
    },
  },
});