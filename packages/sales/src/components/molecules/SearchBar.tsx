import React, { useMemo, useState } from "react";
import { useTheme } from "@prisma-ui/core";
import { Button } from "../atoms/Button";
import { hexToRgba } from "../../utils/color";
import { buildFocusRing, transition } from "../../utils/style";

type Suggestion = {
  id: string;
  label: string;
};

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  suggestions?: Suggestion[];
  loading?: boolean;
};

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar produtos, categorias ou marcas",
  suggestions = [],
  loading = false,
}: SearchBarProps) {
  const { colors, spacing, radii, typography } = useTheme();
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const showSuggestions = focused && suggestions.length > 0;

  const filtered = useMemo(() => {
    const lower = value.trim().toLowerCase();
    if (!lower) return suggestions.slice(0, 5);
    return suggestions
      .filter((item) => item.label.toLowerCase().includes(lower))
      .slice(0, 5);
  }, [value, suggestions]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "relative",
        width: "100%",
        fontFamily: typography.fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: spacing(1),
          padding: spacing(1),
          borderRadius: radii.lg,
          border: `1px solid ${hexToRgba(colors.border, focused ? 1 : 0.7)}`,
          background: hexToRgba(colors.surface, hovered ? 0.92 : 0.98),
          boxShadow: focused
            ? buildFocusRing(colors.brandAccent)
            : `0 16px 32px ${hexToRgba(colors.text, 0.08)}`,
          transition: transition(["border", "box-shadow", "background"]),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <input
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            padding: `${spacing(1)} ${spacing(2)}`,
            fontSize: 16,
            color: colors.text,
            fontWeight: 500,
          }}
        />
        <Button
          size="md"
          type="submit"
          disabled={loading}
          style={{
            minWidth: spacing(14),
          }}
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {showSuggestions && filtered.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: `calc(100% + ${spacing(1)})`,
            left: 0,
            right: 0,
            margin: 0,
            padding: spacing(1),
            listStyle: "none",
            background: colors.background,
            borderRadius: radii.md,
            border: `1px solid ${hexToRgba(colors.border, 0.9)}`,
            boxShadow: `0 20px 44px ${hexToRgba(colors.text, 0.12)}`,
            zIndex: 10,
            display: "grid",
            gap: spacing(1),
          }}
        >
          {filtered.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(item.label);
                  onSearch?.(item.label);
                }}
                style={{
                  width: "100%",
                  textAlign: "left" as const,
                  border: "none",
                  background: hexToRgba(colors.surface, 0.96),
                  borderRadius: radii.md,
                  padding: `${spacing(1.5)} ${spacing(2)}`,
                  color: colors.text,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: transition(["background", "transform"]),
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = hexToRgba(
                    colors.brandAccent,
                    0.18
                  );
                  event.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = hexToRgba(
                    colors.surface,
                    0.96
                  );
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
