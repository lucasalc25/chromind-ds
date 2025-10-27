import { useTheme } from "@chromind/core";
import { DiscountBadge } from "./DiscountBadge";

type PriceTagProps = {
  price: number;
  originalPrice?: number;
  installments?: number;
  pixLabel?: string;
  fontScale?: number;
};

export function PriceTag({
  price,
  originalPrice,
  installments = 10,
  pixLabel = "À vista no PIX",
  fontScale = 1,
}: PriceTagProps) {
  const { colors, spacing, typography } = useTheme();

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
        gap: `calc(${spacing(1.5)} * ${fontScale})`,
        border: "none",
        padding: `calc(${spacing(1)} * ${fontScale})`,
        minWidth: spacing(40),
        fontFamily: typography.fontFamily,
      }}
    >
      {/* Preço principal */}
      <div style={{ display: "grid" }}>
        {hasDiscount && (
          <span
            style={{
              color: colors.mutedText,
              fontSize: 14 * fontScale,
              textDecoration: "line-through",
              fontWeight: 500,
            }}
          >
            {formattedOriginal}
          </span>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: `calc(${spacing(3)} * ${fontScale})`,
          }}
        >
          <strong
            style={{
              background: "transparent",
              color: colors.brand,
              fontSize: 24 * fontScale,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {formattedPrice}
          </strong>

          {hasDiscount && (
            <DiscountBadge
              percent={Math.round(100 - (price / originalPrice!) * 100)}
            />
          )}
        </div>
      </div>

      {/* Parcelas e Pix */}
      <div style={{ display: "grid" }}>
        <span
          style={{
            color: colors.text,
            fontSize: 13 * fontScale,
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
            fontSize: 12 * fontScale,
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
