import { useTheme } from "@prisma-ui/core";
import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number; // px do ícone
  ariaLabelAdd?: string; // acessibilidade
  ariaLabelRemove?: string;
};

export function FavoriteButton({
  isFavorite,
  onToggle,
  size = 20,
  ariaLabelAdd = "Adicionar aos favoritos",
  ariaLabelRemove = "Remover dos favoritos",
}: FavoriteButtonProps) {
  const { colors, spacing } = useTheme();
  const label = isFavorite ? ariaLabelRemove : ariaLabelAdd;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={label}
      style={{
        border: "transparent",
        width: 20,
        height: 20,
        padding: spacing(0),
        background: "transparent",
        transition: "all 160ms ease",
        cursor: "pointer",
      }}
    >
      <Heart size={size} fill={isFavorite ? colors.brand : "none"} />
    </button>
  );
}
