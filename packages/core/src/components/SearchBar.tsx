import { useTheme } from "../theme/useTheme";

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar produtos...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const { colors, radii, spacing } = useTheme();
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        maxWidth: "75%",
        padding: `${spacing(2)} ${spacing(3)}`,
        borderRadius: radii.md,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        color: colors.text,
      }}
    />
  );
}
