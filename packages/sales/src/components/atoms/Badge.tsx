import { useTheme, hexToRgba } from "@chromind/core";

type BadgeTone =
  | "brand"
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "danger";
type BadgeVariant = "solid" | "subtle" | "outline";
type BadgeSize = "sm" | "md";

export type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
};

const SIZE_MAP: Record<
  BadgeSize,
  { inset: [number, number]; fontSize: number }
> = {
  sm: { inset: [1, 2], fontSize: 11 },
  md: { inset: [1.5, 2.5], fontSize: 12 },
};

export function Badge({
  children,
  tone = "brand",
  variant = "subtle",
  size = "md",
  icon,
}: BadgeProps) {
  const { colors, radii, spacing } = useTheme();
  const sizeConfig = SIZE_MAP[size];

  const palette: Record<BadgeTone, string> = {
    brand: colors.brand,
    accent: colors.brandAccent,
    neutral: colors.text,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  };

  const accent = palette[tone];

  const backgroundByVariant: Record<BadgeVariant, string> = {
    solid: accent,
    subtle: hexToRgba(accent, 0.2),
    outline: "transparent",
  };

  const textByVariant: Record<BadgeVariant, string> = {
    solid: colors.background,
    subtle: accent,
    outline: accent,
  };

  const borderByVariant: Record<BadgeVariant, string> = {
    solid: "transparent",
    subtle: hexToRgba(accent, 0.35),
    outline: accent,
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing(0.75),
        padding: `${spacing(sizeConfig.inset[0])} ${spacing(
          sizeConfig.inset[1]
        )}`,
        background: backgroundByVariant[variant],
        color: textByVariant[variant],
        borderRadius: radii.pill,
        fontSize: sizeConfig.fontSize,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        border: `1px solid ${borderByVariant[variant]}`,
      }}
    >
      {icon && (
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
