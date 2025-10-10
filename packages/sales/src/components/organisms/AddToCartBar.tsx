import React from "react";
import { useTheme } from "@prisma-ui/core";
import { PriceTag } from "../atoms/PriceTag";
import { Button } from "../atoms/Button";
import { QuantityStepper } from "../molecules/QuantityStepper";
import { hexToRgba } from "../../utils/color";

export type AddToCartBarProps = {
  price: number;
  originalPrice?: number;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onAddToCart: () => void;
  fixed?: boolean;
  label?: string;
};

export function AddToCartBar({
  price,
  originalPrice,
  quantity,
  onQuantityChange,
  onAddToCart,
  fixed = true,
  label = "Adicionar ao carrinho",
}: AddToCartBarProps) {
  const { colors, spacing, radii } = useTheme();

  return (
    <div
      style={{
        position: fixed ? "sticky" : "static",
        bottom: fixed ? 0 : "auto",
        insetInline: 0,
        padding: `${spacing(3)} ${spacing(4)}`,
        background: hexToRgba(colors.surface, 0.98),
        borderTop: `1px solid ${hexToRgba(colors.border, 0.85)}`,
        boxShadow: fixed ? `0 -20px 40px ${hexToRgba(colors.text, 0.1)}` : "none",
        display: "grid",
        gap: spacing(3),
        borderRadius: fixed ? ` ${radii.lg} ${radii.lg} 0 0` : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing(3),
        }}
      >
        <PriceTag price={price} originalPrice={originalPrice} />
        <QuantityStepper value={quantity} onChange={onQuantityChange} />
        <Button size="lg" onClick={onAddToCart} style={{ minWidth: spacing(40) }}>
          {label}
        </Button>
      </div>
    </div>
  );
}
