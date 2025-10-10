import { useTheme } from "@prisma-ui/core";
import { hexToRgba } from "../../utils/color";

type PriceTagProps = {
  price: number;
  originalPrice?: number;
  installments?: number;
  pixLabel?: string;
};

export function PriceTag({
  price,
  originalPrice,
  installments = 10,
  pixLabel = "À vista no PIX",
}: PriceTagProps) {
  const { colors, radii, spacing, typography } = useTheme();

  const hasDiscount =
    typeof originalPrice === "number" && originalPrice > price;
  const formattedPrice = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const formattedOriginal = originalPrice?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const installmentsCount = Math.max(1, installments);
  const installmentAmount = price / installmentsCount;

  return (
    <div
      style={{
        display: "grid",
        gap: spacing(1.5),
        border: "none",
        padding: spacing(1),
        minWidth: spacing(40),
      }}
    >
      <div style={{ display: "grid" }}>
        {hasDiscount && (
          <span
            style={{
              color: colors.mutedText,
              fontSize: 14,
              textDecoration: "line-through",
              fontWeight: 500,
            }}
          >
            {formattedOriginal}
          </span>
        )}
        <strong
          style={{
            display: "flex",
            alignItems: "flex-start",
            background: "transparent",
            color: colors.brand,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: typography.fontFamily,
          }}
        >
          {formattedPrice}
        </strong>
      </div>
      <div style={{ display: "grid" }}>
        <span
          style={{
            color: colors.text,
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {pixLabel} com{" "}
          <b style={{ color: colors.brand }}>
            {hasDiscount ? "desconto especial" : "melhor preço"}
          </b>
        </span>
        <span
          style={{
            color: colors.mutedText,
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          ou em até {installmentsCount}x de{" "}
          {installmentAmount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          })}{" "}
          sem juros
        </span>
      </div>
    </div>
  );
}
