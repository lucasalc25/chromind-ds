import { useTheme } from "@chromind/core";
import { PriceTag, Button, StockBadge } from "../atoms";
import { QuantityStepper } from "../molecules/QuantityStepper";
import { Product } from "../../types";

export type AddToCartProps = {
  product: Product;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onAddToCart: () => void;
  label?: string;
};

export function AddToCart({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  label = "Adicionar ao carrinho",
}: AddToCartProps) {
  const { spacing } = useTheme();

  const hasDiscount =
    typeof product.price === "number" &&
    (product.originalPrice ?? 0) > product.price;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing(1),
          marginTop: hasDiscount ? 0 : spacing(4),
        }}
      >
        <PriceTag price={product.price} originalPrice={product.originalPrice} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StockBadge status={product.stock} />
        <span onClick={(e) => e.stopPropagation()}>
          <QuantityStepper value={quantity} onChange={onQuantityChange} />
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gap: spacing(2),
        }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Button onClick={onAddToCart} size="lg" fullWidth>
            {label}
          </Button>
        </div>
      </div>
    </>
  );
}
