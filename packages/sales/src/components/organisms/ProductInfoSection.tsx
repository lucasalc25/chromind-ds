import { useTheme } from "@chromind/core";
import type { Product } from "../../types";
import { ProductHeader, VariantSelector, ProductInfo } from "../molecules";

export function ProductInfoSection({
  product,
  isFavorite,
  onFavoriteToggle,
}: {
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}) {
  const { spacing, colors, typography } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        justifyContent: "space-between",
        padding: spacing(5),
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        fontSize: typography.fontSizeBase,
      }}
    >
      <div style={{ display: "grid", gap: spacing(5) }}>
        <ProductHeader
          product={product}
          isFavorite={isFavorite}
          onFavoriteToggle={onFavoriteToggle}
          fontScale={1.4}
        />

        <ProductInfo name={product.name} description={product.description} />
      </div>

      {/* opcional: variantes simples */}
      <VariantSelector
        groups={[
          {
            id: "color",
            name: "Cor",
            options: [
              { id: "wht", label: "Branco" },
              { id: "blk", label: "Preto" },
              { id: "blu", label: "Azul" },
            ],
          },
        ]}
        selected={{ color: "blk" }}
        onSelect={() => {}}
      />
    </div>
  );
}
