import { useTheme } from "@chromind/core";
import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
  ariaLabelAdd?: string;
  ariaLabelRemove?: string;
  fontScale?: number;
};

export function FavoriteButton({
  isFavorite,
  onToggle,
  size = 24,
  ariaLabelAdd = "Adicionar aos favoritos",
  ariaLabelRemove = "Remover dos favoritos",
  fontScale = 1,
}: FavoriteButtonProps) {
  const { colors, spacing, transition } = useTheme();
  const label = isFavorite ? ariaLabelRemove : ariaLabelAdd;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={label}
      style={{
        border: `${colors.brand}`,
        width: 24 * fontScale,
        height: 24 * fontScale,
        marginRight: spacing(1),
        background: "transparent",
        transition:
          transition?.transition?.(["transform", "box-shadow", "border"]) ??
          "all .16s ease",
        cursor: "pointer",
      }}
    >
      <Heart
        size={size * fontScale}
        fill={isFavorite ? colors.brand : "none"}
        color={colors.brand}
      />
    </button>
  );
}
