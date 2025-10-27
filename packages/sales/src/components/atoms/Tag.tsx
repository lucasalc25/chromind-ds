import { useTheme, hexToRgba } from "@chromind/core";

type TagProps = {
  label: string;
};

export function Tag({ label }: TagProps) {
  const { colors, radii, spacing } = useTheme();

  const background = hexToRgba(colors.brandAccent, 0.18);
  const border = hexToRgba(colors.brandAccent, 0.32);
  const shadow = `0 6px 16px ${hexToRgba(colors.text, 0.08)}`;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing(0.5),
        background,
        border: `1px solid ${border}`,
        color: colors.brand,
        borderRadius: radii.pill,
        padding: `${spacing(1)} ${spacing(2.5)}`,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        boxShadow: shadow,
      }}
    >
      {label}
    </span>
  );
}
