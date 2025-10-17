import { useTheme, hexToRgba, transition } from "@prisma-ui/core";

export type VariantOption = {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type VariantGroup = {
  id: string;
  name: string;
  options: VariantOption[];
};

export type VariantSelectorProps = {
  groups: VariantGroup[];
  selected: Record<string, string>;
  onSelect: (groupId: string, optionId: string) => void;
};

export function VariantSelector({
  groups,
  selected,
  onSelect,
}: VariantSelectorProps) {
  const { colors, spacing, radii, typography } = useTheme();

  return (
    <div
      style={{
        display: "grid",
        gap: spacing(3),
        fontFamily: typography.fontFamily,
      }}
    >
      {groups.map((group) => (
        <div key={group.id} style={{ display: "grid", gap: spacing(1.5) }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: colors.text,
            }}
          >
            <strong style={{ fontSize: 14 }}>{group.name}</strong>
            <span
              style={{
                fontSize: 12,
                color: colors.mutedText,
              }}
            >
              {group.options.length} opções
            </span>
          </div>
          <div
            role="group"
            aria-label={group.name}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: spacing(1),
            }}
          >
            {group.options.map((option) => {
              const isSelected = selected[group.id] === option.id;
              const isDisabled = option.disabled;
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onSelect(group.id, option.id)}
                  style={{
                    minWidth: spacing(16),
                    borderRadius: radii.md,
                    border: `1px solid ${hexToRgba(
                      colors.brandAccent,
                      isSelected ? 0.6 : 0.3
                    )}`,
                    background: isSelected
                      ? hexToRgba(colors.brandAccent, 0.18)
                      : hexToRgba(colors.surface, 0.96),
                    color: isDisabled
                      ? hexToRgba(colors.mutedText, 0.5)
                      : isSelected
                      ? colors.brand
                      : colors.text,
                    padding: `${spacing(1.5)} ${spacing(2.5)}`,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    transition: transition([
                      "background",
                      "border",
                      "transform",
                    ]),
                    transform: isSelected
                      ? "translateY(-1px)"
                      : "translateY(0)",
                    opacity: isDisabled ? 0.6 : 1,
                    textAlign: "left" as const,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{option.label}</span>
                  {option.description && (
                    <span
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: colors.mutedText,
                      }}
                    >
                      {option.description}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
