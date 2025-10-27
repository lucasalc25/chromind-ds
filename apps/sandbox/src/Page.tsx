// apps/sandbox/src/Page.tsx
import React from "react";
import { useTheme } from "@chromind/core";

export const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { colors, typography } = useTheme();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.text,
        fontFamily: typography.fontFamily,
      }}
    >
      {children}
    </div>
  );
};
