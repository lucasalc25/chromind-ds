import { useTheme, hexToRgba } from "@chromind/core";
import { Drawer, DrawerProps } from "./Drawer";
import { Button } from "../atoms/Button";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type CartSheetProps = Omit<DrawerProps, "children"> & {
  items: CartItem[];
  subtotal: number;
  onCheckout: () => void;
  onRemoveItem?: (id: string) => void;
};

export function CartSheet({
  items,
  subtotal,
  onCheckout,
  onRemoveItem,
  ...drawerProps
}: CartSheetProps) {
  const { colors, spacing, radii } = useTheme();

  return (
    <Drawer {...drawerProps}>
      <div
        style={{
          display: "grid",
          gap: spacing(3),
        }}
      >
        <div
          style={{
            display: "grid",
            gap: spacing(2),
          }}
        >
          {items.length === 0 && (
            <span style={{ color: colors.mutedText }}>
              Seu carrinho está vazio.
            </span>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: `${spacing(16)} 1fr auto`,
                gap: spacing(2),
                alignItems: "center",
                border: `1px solid ${hexToRgba(colors.border, 0.8)}`,
                borderRadius: radii.md,
                padding: spacing(2),
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: spacing(16),
                  background: hexToRgba(colors.surface, 0.9),
                  borderRadius: radii.sm,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span style={{ color: colors.mutedText }}>Imagem</span>
                )}
              </div>
              <div style={{ display: "grid", gap: spacing(0.5) }}>
                <strong style={{ color: colors.text }}>{item.name}</strong>
                <span style={{ color: colors.mutedText, fontSize: 13 }}>
                  Quantidade: {item.quantity}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: spacing(1),
                  justifyItems: "end",
                }}
              >
                <strong style={{ color: colors.text }}>
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                {onRemoveItem && (
                  <Button
                    size="sm"
                    variant="ghost"
                    tone="danger"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remover
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${hexToRgba(colors.border, 0.8)}`,
            paddingTop: spacing(2),
          }}
        >
          <span style={{ color: colors.mutedText }}>Subtotal</span>
          <strong style={{ color: colors.brand }}>
            {subtotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </div>

        <Button size="lg" onClick={onCheckout}>
          Ir para checkout
        </Button>
      </div>
    </Drawer>
  );
}
