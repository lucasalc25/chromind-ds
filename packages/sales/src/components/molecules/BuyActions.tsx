import { Button } from "../atoms/Button";
import { useTheme } from "@chromind/core";

export function BuyActions({
  onAddToCart,
  labelAdd = "Adicionar ao carrinho",
}: {
  onAddToCart: () => void;
  labelAdd?: string;
}) {
  const { spacing } = useTheme();

  return (
    <div style={{ display: "grid", gap: spacing(1.5) }}>
      <Button size="lg" onClick={() => console.log("Abrir checkout!")}>
        Comprar agora
      </Button>
      <Button size="lg" variant="outline" onClick={onAddToCart}>
        {labelAdd}
      </Button>
    </div>
  );
}
