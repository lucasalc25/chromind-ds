import { FavoriteButton, RatingStars } from "@prisma-ui/sales";
import type { Product } from "@prisma-ui/sales";
import { spacing } from "@prisma-ui/core";

export function ProductHeader({
  product,
  isFavorite,
  onFavoriteToggle,
  fontScale,
}: {
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  fontScale?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: spacing(7),
      }}
    >
      <RatingStars
        rating={product.rating}
        avaliations={product.avaliations}
        fontScale={fontScale}
      />
      <span onClick={(e) => e.stopPropagation()}>
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={onFavoriteToggle}
          fontScale={fontScale}
        />
      </span>
    </div>
  );
}
