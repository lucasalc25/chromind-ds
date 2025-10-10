import { createContext, useContext } from "react";
import { ThemeTokens, defaultTheme } from "./createTheme";

export const ThemeContext = createContext<ThemeTokens>(defaultTheme);
export const useTheme = () => useContext(ThemeContext);
