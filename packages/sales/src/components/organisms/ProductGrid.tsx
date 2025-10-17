import type { Product } from "@prisma-ui/sales";
import { ProductCard } from "./ProductCard";

export type ProductGridProps = {
  products: Product[];
  favorites?: Set<string> | string[];
  isFavorite?: (p: Product) => boolean;
  onFavoriteToggle?: (p: Product) => void;
  onProductClick?: (p: Product) => void;
  onAddToCart?: (p: Product, qty: number) => void;
};

export function ProductGrid({
  products,
  favorites,
  isFavorite,
  onFavoriteToggle,
  onProductClick,
  onAddToCart,
}: ProductGridProps) {
  const favSet =
    favorites instanceof Set ? favorites : new Set(favorites ?? []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
      }}
    >
      {products.map((p) => {
        const fav =
          typeof isFavorite === "function" ? isFavorite(p) : favSet.has(p.id);
        return (
          <ProductCard
            key={p.id}
            product={p}
            onFavoriteToggle={onFavoriteToggle}
            onAddToCart={(product, qty) => onAddToCart?.(product, qty)}
            onProductDetail={(product) => onProductClick?.(product)}
            isFavorite={fav}
          />
        );
      })}
    </div>
  );
}
