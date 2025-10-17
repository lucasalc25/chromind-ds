import { PriceTag } from "@prisma-ui/sales";
import type { Product } from "@prisma-ui/sales";

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
