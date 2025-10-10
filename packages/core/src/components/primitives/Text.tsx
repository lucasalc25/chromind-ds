import React, { CSSProperties, PropsWithChildren } from "react";
import { useTheme } from "../../theme/useTheme";

export type TextProps = PropsWithChildren<{ style?: CSSProperties }>;

export const Text: React.FC<TextProps> = ({ style, children }) => {
  const { colors, typography } = useTheme();
  return (
    <span
      style={{
        color: colors.text,
        fontSize: typography.fontSizeBase,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
