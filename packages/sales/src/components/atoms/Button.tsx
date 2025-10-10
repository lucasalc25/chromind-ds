import React, { useState } from "react";
import { useTheme } from "@prisma-ui/core";
import { hexToRgba } from "../../utils/color";
import { buildFocusRing, transition } from "../../utils/style";

type ButtonTone = "brand" | "neutral" | "success" | "warning" | "danger";
type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
};

const SIZE_MAP: Record<
  ButtonSize,
  { inset: [number, number]; fontSize: number }
> = {
  sm: { inset: [2, 3], fontSize: 13 },
  md: { inset: [2.5, 4], fontSize: 14 },
  lg: { inset: [3, 5], fontSize: 16 },
};

export function Button({
  children,
  tone = "brand",
  variant = "solid",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const { colors, radii, spacing, typography } = theme;
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const tonePalette: Record<ButtonTone, string> = {
    brand: colors.brand,
    neutral: colors.text,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  };

  const toneColor = tonePalette[tone] ?? colors.brand;

  const sizeConfig = SIZE_MAP[size];
  const horizontal = spacing(sizeConfig.inset[1]);
  const vertical = spacing(sizeConfig.inset[0]);

  const backgroundByVariant: Record<ButtonVariant, string> = {
    solid: toneColor,
    outline: colors.surface,
    ghost: hexToRgba(toneColor, 0.12),
  };

  const textByVariant: Record<ButtonVariant, string> = {
    solid: colors.background,
    outline: toneColor,
    ghost: toneColor,
  };

  const borderByVariant: Record<ButtonVariant, string> = {
    solid: "transparent",
    outline: toneColor,
    ghost: "transparent",
  };

  const hoverBackground: Record<ButtonVariant, string> = {
    solid: hexToRgba(toneColor, 0.92),
    outline: hexToRgba(toneColor, 0.08),
    ghost: hexToRgba(toneColor, 0.2),
  };

  const activeBackground: Record<ButtonVariant, string> = {
    solid: hexToRgba(toneColor, 0.84),
    outline: hexToRgba(toneColor, 0.12),
    ghost: hexToRgba(toneColor, 0.28),
  };

  const disabledBackground =
    variant === "solid"
      ? hexToRgba(colors.border, 0.9)
      : hexToRgba(colors.border, 0.18);
  const disabledColor =
    variant === "solid" ? colors.mutedText : hexToRgba(colors.text, 0.4);

  const contentColor = disabled
    ? disabledColor
    : textByVariant[variant] || colors.background;

  return (
    <button
      type="button"
      {...rest}
      disabled={disabled}
      onMouseEnter={(event) => {
        setHovered(true);
        rest.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        setPressed(false);
        rest.onMouseLeave?.(event);
      }}
      onMouseDown={(event) => {
        if (event.button === 0 && !disabled) {
          setPressed(true);
        }
        rest.onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        setPressed(false);
        rest.onMouseUp?.(event);
      }}
      onFocus={(event) => {
        setFocused(true);
        rest.onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        setPressed(false);
        rest.onBlur?.(event);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing(1.5),
        padding: `${vertical} ${horizontal}`,
        borderRadius: radii.md,
        border: `1px solid ${
          disabled ? hexToRgba(colors.border, 0.6) : borderByVariant[variant]
        }`,
        background: disabled
          ? disabledBackground
          : pressed
          ? activeBackground[variant]
          : hovered
          ? hoverBackground[variant]
          : backgroundByVariant[variant],
        color: contentColor,
        fontSize: sizeConfig.fontSize,
        fontWeight: 600,
        fontFamily: typography.fontFamily,
        letterSpacing: "-0.01em",
        minHeight: spacing(6),
        width: fullWidth ? "100%" : "auto",
        cursor: disabled ? "not-allowed" : "pointer",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        transition: transition([
          "background",
          "color",
          "transform",
          "box-shadow",
        ]),
        boxShadow: focused
          ? `${buildFocusRing(toneColor)}`
          : hovered && !disabled
          ? `0 10px 20px ${hexToRgba(toneColor, 0.26)}`
          : "none",
        outline: "none",
        position: "relative",
        ...style,
      }}
    >
      {leftIcon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transform: pressed ? "scale(0.95)" : "scale(1)",
          }}
        >
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transform: pressed ? "scale(0.95)" : "scale(1)",
          }}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
}

