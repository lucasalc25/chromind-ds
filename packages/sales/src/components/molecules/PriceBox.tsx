import { PriceTag } from "../atoms/PriceTag";
import type { Product } from "../../types";

export function PriceBox({
  product,
  fontScale,
}: {
  product: Product;
  fontScale: number;
}) {
  return (
    <PriceTag
      price={product.price}
      originalPrice={product.originalPrice}
      fontScale={fontScale}
    />
  );
}
