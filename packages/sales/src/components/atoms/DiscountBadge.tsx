import { useTheme, hexToRgba } from "@prisma-ui/core";

type DiscountBadgeProps = {
  percent: number;
};

export function DiscountBadge({ percent }: DiscountBadgeProps) {
  const { colors, radii, spacing } = useTheme();

  const background = hexToRgba(colors.brandAccent, 0.22);
  const border = hexToRgba(colors.brandAccent, 0.4);
  const shadow = `0 10px 20px ${hexToRgba(colors.text, 0.08)}`;

  return (
    <span
      aria-label={`Desconto de ${percent}%`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing(0.75),
        background,
        color: colors.brand,
        borderRadius: radii.pill,
        padding: `${spacing(1)} ${spacing(2)}`,
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        border: `1px solid ${border}`,
        boxShadow: shadow,
      }}
    >
      -{percent}%
    </span>
  );
}
