import React from "react";
import { useTheme } from "@prisma-ui/core";
import { ProductCard, Product } from "../molecules/ProductCard";
import { hexToRgba } from "../../utils/color";

type ProductGridProps = {
  products: Product[];
  onFavoriteToggle?: (product: Product) => void;
  favorites?: Set<string> | string[];
  isFavorite?: (product: Product) => boolean;
  emptyState?: React.ReactNode;
};

export function ProductGrid({
  products,
  onFavoriteToggle,
  favorites,
  isFavorite,
  emptyState,
}: ProductGridProps) {
  const { colors, spacing } = useTheme();
  const favArray =
    favorites instanceof Set ? favorites : new Set(favorites ?? []);

  if (!products.length) {
    return (
      <div
        style={{
          padding: spacing(6),
          border: `1px dashed ${hexToRgba(colors.border, 0.8)}`,
          borderRadius: spacing(3),
          color: colors.mutedText,
          textAlign: "center" as const,
        }}
      >
        {emptyState ?? "Nenhum produto encontrado."}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: spacing(4),
        alignItems: "stretch",
      }}
    >
      {products.map((p) => {
        const fav =
          typeof isFavorite === "function" ? isFavorite(p) : favArray.has(p.id);

        return (
          <ProductCard
            key={p.id}
            product={p}
            isFavorite={fav}
            onFavoriteToggle={onFavoriteToggle}
          />
        );
      })}
    </div>
  );
}
