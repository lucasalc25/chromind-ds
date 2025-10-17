import { useState } from "react";
import {
  useTheme,
  hexToRgba,
  buildFocusRing,
  transition,
} from "@prisma-ui/core";

type QuantityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
}: QuantityStepperProps) {
  const { colors, radii, spacing, typography } = useTheme();
  const [hovered, setHovered] = useState<"minus" | "plus" | null>(null);
  const [active, setActive] = useState<"minus" | "plus" | null>(null);
  const [focused, setFocused] = useState<"minus" | "plus" | null>(null);

  const decreaseDisabled = value <= min;
  const increaseDisabled = typeof max === "number" ? value >= max : false;

  const handleChange = (delta: number) => {
    const next = value + delta;
    if (next < min) return;
    if (typeof max === "number" && next > max) return;
    onChange(next);
  };

  const buttonStyle = (type: "minus" | "plus", disabled: boolean) => {
    const isHovered = hovered === type;
    const isActive = active === type;
    const isFocused = focused === type;
    const baseBackground = colors.surface;
    const hoverBackground = hexToRgba(colors.brandAccent, 0.2);
    const activeBackground = hexToRgba(colors.brand, 0.2);

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: spacing(6),
      height: spacing(6),
      borderRadius: radii.md,
      border: `1px solid ${hexToRgba(colors.border, isHovered ? 0.8 : 1)}`,
      background: disabled
        ? hexToRgba(colors.border, 0.18)
        : isActive
        ? activeBackground
        : isHovered
        ? hoverBackground
        : baseBackground,
      color: disabled ? colors.mutedText : colors.brand,
      cursor: disabled ? "not-allowed" : "pointer",
      fontSize: 18,
      fontWeight: 600,
      transition: transition(["transform", "background", "box-shadow"]),
      transform: isActive ? "scale(0.95)" : "scale(1)",
      outline: "none",
      boxShadow: isFocused
        ? buildFocusRing(colors.brandAccent)
        : isHovered
        ? `0 8px 16px ${hexToRgba(colors.brandAccent, 0.18)}`
        : "none",
    } as const;
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing(1.5),
        background: hexToRgba(colors.surface, 0.6),
        borderRadius: radii.lg,
        padding: spacing(1),
        border: `1px solid ${hexToRgba(colors.border, 0.8)}`,
      }}
    >
      <button
        type="button"
        aria-label="Diminuir quantidade"
        disabled={decreaseDisabled}
        onClick={() => handleChange(-1)}
        onMouseEnter={() => setHovered("minus")}
        onMouseLeave={() => {
          setHovered(null);
          setActive(null);
        }}
        onMouseDown={() => setActive("minus")}
        onMouseUp={() => setActive(null)}
        onFocus={() => setFocused("minus")}
        onBlur={() => {
          setHovered(null);
          setActive(null);
          setFocused(null);
        }}
        style={buttonStyle("minus", decreaseDisabled)}
      >
        -
      </button>

      <span
        style={{
          minWidth: spacing(6),
          textAlign: "center" as const,
          fontWeight: 600,
          fontFamily: typography.fontFamily,
          color: colors.text,
        }}
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        aria-label="Aumentar quantidade"
        disabled={increaseDisabled}
        onClick={() => handleChange(1)}
        onMouseEnter={() => setHovered("plus")}
        onMouseLeave={() => {
          setHovered(null);
          setActive(null);
        }}
        onMouseDown={() => setActive("plus")}
        onMouseUp={() => setActive(null)}
        onFocus={() => setFocused("plus")}
        onBlur={() => {
          setHovered(null);
          setActive(null);
          setFocused(null);
        }}
        style={buttonStyle("plus", increaseDisabled)}
      >
        +
      </button>
    </div>
  );
}
