import { useState } from "react";
import { ProductGallery } from "@prisma-ui/sales";
import type { Product } from "@prisma-ui/sales";
import { ProductInfoSection } from "../organisms/ProductInfoSection";
import { PurchaseSection } from "../organisms/PurchaseSection";
import { useBreakpoints } from "@prisma-ui/core";

type ProductDetailProps = {
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onAddToCart?: (product: Product, qty: number) => void;
};

export function ProductDetail({
  product,
  isFavorite,
  onFavoriteToggle,
  onAddToCart,
}: ProductDetailProps) {
  const { ltMd, ltXl } = useBreakpoints();

  const pdpGridStyle: React.CSSProperties = {
    display: "grid",
    gap: 24,
    alignItems: "start",
    gridTemplateColumns: ltMd ? "1fr" : ltXl ? "1fr 1.25fr" : "1.5fr 2fr",
  };

  const images = (product.images ?? []).map((src, i) => ({
    id: String(i),
    src,
  }));
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  return (
    <>
      <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
        <div style={pdpGridStyle}>
          <ProductGallery images={images} />

          <div
            style={{
              display: ltMd ? "grid" : ltXl ? "grid" : "flex",
              gap: 24,
              alignContent: "start",
              gridTemplateColumns: "1fr",
            }}
          >
            <ProductInfoSection
              product={product}
              isFavorite={isFavorite}
              onFavoriteToggle={onFavoriteToggle}
            />

            <PurchaseSection
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </>
  );
}
