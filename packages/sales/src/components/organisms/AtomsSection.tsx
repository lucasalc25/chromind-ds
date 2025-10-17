import {
  Button,
  Tag,
  Badge,
  StockBadge,
  DiscountBadge,
  PriceTag,
  RatingStars,
  QuantityStepper,
  Tooltip,
  FavoriteButton,
} from "@prisma-ui/sales";
import { useTheme } from "@prisma-ui/core";

type AtomsSectionProps = {
  rating: number;
  qty: number;
  fav: boolean;
  onChangeQty: (n: number) => void;
  onToggleFav: () => void;
};

export function Atoms({
  rating,
  qty,
  fav,
  onChangeQty,
  onToggleFav,
}: AtomsSectionProps) {
  const { colors } = useTheme();

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <fieldset style={{ display: "flex", gap: 32, padding: 20 }}>
          <legend>Buttons</legend>
          <Button>Default</Button>
          <Button variant="ghost">Ghost</Button>
          <Button tone="neutral">Neutral</Button>
        </fieldset>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>Tag:</label>
          <Tag label="Example" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>Badge:</label>
          <Badge>Example</Badge>
        </div>

        <fieldset style={{ display: "flex", gap: 32, padding: 20 }}>
          <legend>StockBadges</legend>
          <StockBadge status="em-estoque" />
          <StockBadge status="poucas-unidades" />
          <StockBadge status="sem-estoque" />
        </fieldset>
      </div>

      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>
            RatingStars:
          </label>
          <RatingStars rating={rating} avaliations={12} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderInline: `1px solid ${colors.border}`,
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>
            DiscountBadge:
          </label>
          <DiscountBadge percent={20} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 4 }}>PriceTag:</label>
          <PriceTag price={159.9} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderInline: `1px solid ${colors.border}`,
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>
            QuantityStepper:
          </label>
          <QuantityStepper value={qty} onChange={onChangeQty} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>
            FavoriteButton:
          </label>
          <FavoriteButton isFavorite={fav} onToggle={onToggleFav} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderLeft: `1px solid ${colors.border}`,
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>Tooltip:</label>
          <Tooltip content="Exemplo de tooltip" placement="top">
            <Button>Passe o mouse</Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
