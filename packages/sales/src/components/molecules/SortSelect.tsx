import { useState } from "react";
import {
  useTheme,
  hexToRgba,
  buildFocusRing,
  transition,
} from "@prisma-ui/core";

export type SortKey = "popular" | "price-asc" | "price-desc" | "rating-desc";

type SortSelectProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
  label?: string;
};

export function SortSelect({ value, onChange, label }: SortSelectProps) {
  const { colors, radii, spacing, typography } = useTheme();
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing(2),
        fontFamily: typography.fontFamily,
        color: colors.text,
        fontSize: 14,
      }}
    >
      {label ?? "Ordenar por:"}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: radii.md,
          border: `1px solid ${hexToRgba(colors.border, hovered ? 0.9 : 0.8)}`,
          padding: `${spacing(2)} ${spacing(6)} ${spacing(2)} ${spacing(3)}`,
          background: hovered
            ? hexToRgba(colors.surface, 0.92)
            : hexToRgba(colors.surface, 1),
          color: colors.text,
          fontWeight: 500,
          position: "relative",
          boxShadow: focused ? buildFocusRing(colors.brandAccent) : "none",
          transition: transition(["border", "box-shadow", "background"]),
          minWidth: spacing(50),
          cursor: "pointer",
        }}
      >
        <option value="popular">Mais populares</option>
        <option value="price-asc">Preço: menor para maior</option>
        <option value="price-desc">Preço: maior para menor</option>
        <option value="rating-desc">Melhor avaliados</option>
      </select>
    </label>
  );
}
