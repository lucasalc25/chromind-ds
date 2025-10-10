import React, { CSSProperties, PropsWithChildren } from "react";
import { useTheme } from "../../theme/useTheme";

export type BoxProps = PropsWithChildren<{
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}>;

export const Box: React.FC<BoxProps> = ({
  as = "div",
  style,
  children,
  ...rest
}) => {
  const Comp: any = as;
  const { typography } = useTheme();
  return (
    <Comp
      style={{
        fontFamily: typography.fontFamily,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
};
