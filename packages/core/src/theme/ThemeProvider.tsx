import React, { ReactNode, useMemo } from "react";
import { ThemeTokens, defaultTheme } from "./createTheme";
import { ThemeContext } from "./useTheme";

export type ThemeProviderProps = {
  theme?: ThemeTokens;
  mode?: "light" | "dark";
  children: ReactNode;
};

function mergeTheme(
  base: ThemeTokens,
  patch?: Partial<ThemeTokens>
): ThemeTokens {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    colors: { ...base.colors, ...(patch.colors || {}) },
    radii: patch.radii || base.radii,
    spacing: patch.spacing || base.spacing,
    typography: patch.typography || base.typography,
  };
}

export function ThemeProvider({
  theme,
  mode = "light",
  children,
}: ThemeProviderProps) {
  const base = theme || defaultTheme;

  // tema efetivo = base + dark overrides
  const effective = useMemo(
    () => (mode === "dark" ? mergeTheme(base, base.modes?.dark) : base),
    [base, mode]
  );

  // CSS vars do tema efetivo
  const vars = useMemo(() => {
    const t = effective;
    return {
      ["--color-text" as any]: t.colors.text,
      ["--color-muted" as any]: t.colors.mutedText,
      ["--color-border" as any]: t.colors.border,
      ["--color-bg" as any]: t.colors.background,
      ["--color-surface" as any]: t.colors.surface,
      ["--color-brand" as any]: t.colors.brand,
      ["--color-brandAccent" as any]: t.colors.brandAccent,
      ["--radii-sm" as any]: t.radii.sm,
      ["--radii-md" as any]: t.radii.md,
      ["--radii-lg" as any]: t.radii.lg,
      ["--radii-pill" as any]: t.radii.pill,
      ["--font-base" as any]: t.typography.fontFamily,
    } as React.CSSProperties;
  }, [effective]);

  return (
    <ThemeContext.Provider value={effective}>
      <div data-theme={mode} style={vars}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
