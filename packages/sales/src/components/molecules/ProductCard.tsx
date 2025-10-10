import { useState } from "react";
import { useTheme } from "@prisma-ui/core";
import { FavoriteButton } from "../atoms/FavoriteButton";
import { PriceTag } from "../atoms/PriceTag";
import { DiscountBadge } from "../atoms/DiscountBadge";
import { RatingStars } from "../atoms/RatingStars";
import { StockBadge, StockStatus } from "../atoms/StockBadge";
import { Tag } from "../atoms/Tag";
import { Button } from "../atoms/Button";
import { QuantityStepper } from "./QuantityStepper";
import { hexToRgba } from "../../utils/color";
import { transition } from "../../utils/style";

export type Product = {
  id: string;
  niche: string;
  brand?: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  avaliations: number;
  rating: number;
  stock: StockStatus;
  categories: string[];
  images?: string[];
  tags?: string[];
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onFavoriteToggle?: (product: Product) => void;
  isFavorite?: boolean;
  ctaLabel?: string;
};

export function ProductCard({
  product,
  onAddToCart,
  onFavoriteToggle,
  isFavorite = false,
  ctaLabel = "Adicionar ao carrinho",
}: ProductCardProps) {
  const { colors, radii, spacing, typography } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(false);
  const toggleFavorite = () => onFavoriteToggle?.(product);

  const hasDiscount =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: radii.lg,
        background: colors.surface,
        border: `1px solid ${hexToRgba(colors.border, hovered ? 1 : 0.85)}`,
        boxShadow: hovered
          ? `0 28px 60px ${hexToRgba(colors.text, 0.12)}`
          : `0 12px 32px ${hexToRgba(colors.text, 0.06)}`,
        overflow: "hidden",
        transition: transition(["transform", "box-shadow", "border"]),
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        fontFamily: typography.fontFamily,
      }}
    >
      <div
        style={{
          position: "relative",
          padding: spacing(3),
          background: hexToRgba(colors.surface, 0.92),
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 24,
          }}
        >
          <RatingStars
            rating={product.rating}
            avaliations={product.avaliations}
          />
          <FavoriteButton isFavorite={isFavorite} onToggle={toggleFavorite} />
        </div>
        <div
          style={{
            marginTop: spacing(3),
            height: 180,
            width: "100%",
            borderRadius: radii.md,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.mutedText,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain" as const,
                borderRadius: radii.md,
              }}
            />
          ) : (
            "Imagem do produto"
          )}
        </div>
        <div
          style={{ display: "grid", gap: spacing(3), marginTop: spacing(3) }}
        >
          <div
            style={{
              display: "grid",
              gap: spacing(2.5),
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: colors.text,
              }}
            >
              {product.name}
            </h4>
            {product.description && (
              <p
                style={{
                  margin: 0,
                  color: colors.mutedText,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {product.description}
              </p>
            )}
            {(product.categories.length > 0 || product.tags?.length) && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: spacing(0.5),
                }}
              >
                {[...product.categories, ...(product.tags ?? [])].map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: spacing(1),
                marginTop: hasDiscount ? 0 : spacing(4),
              }}
            >
              <PriceTag
                price={product.price}
                originalPrice={product.originalPrice}
              />
              {hasDiscount && (
                <DiscountBadge
                  percent={Math.round(
                    100 - (product.price / product.originalPrice!) * 100
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: spacing(3),
          padding: spacing(3),
        }}
      >
        <div
          style={{
            display: "grid",
            gap: spacing(3),
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <StockBadge status={product.stock} />
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          <div
            style={{
              display: "grid",
              gap: spacing(2),
            }}
          >
            <Button onClick={handleAddToCart} size="lg" fullWidth>
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
