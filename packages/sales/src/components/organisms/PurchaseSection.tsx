import { useState } from "react";
import type { Product } from "../../types";
import { StockBadge } from "../atoms";
import {
  QuantityStepper,
  PriceBox,
  PaymentLink,
  BuyActions,
} from "../molecules";
import { useTheme } from "@chromind/core";
import { PaymentOptionsModal, ShippingCalculator } from "../organisms";

export function PurchaseSection({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
}: {
  product: Product;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}) {
  const { spacing, colors, typography } = useTheme();
  const [openPay, setOpenPay] = useState(false);

  return (
    <>
      <div
        style={{
          display: "grid",
          gap: spacing(5),
          padding: spacing(3),
          borderRadius: 12,
          border: `1px solid ${colors.border}`,
          background: colors.surface,
        }}
      >
        <div>
          <PriceBox product={product} fontScale={1.3} />
        </div>
        <PaymentLink onOpen={() => setOpenPay(true)} />
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
        <BuyActions onAddToCart={() => onAddToCart?.(product, quantity)} />
        <ShippingCalculator />
      </div>
      <PaymentOptionsModal open={openPay} onClose={() => setOpenPay(false)} />
    </>
  );
}
