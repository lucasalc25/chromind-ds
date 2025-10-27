import { FavoriteButton, RatingStars } from "../atoms";
import type { Product } from "../../types";
import { spacing } from "@chromind/core";

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
