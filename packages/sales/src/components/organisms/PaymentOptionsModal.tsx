import { Modal, Button } from "@prisma-ui/sales";
import { Text, useTheme } from "@prisma-ui/core";

export function PaymentOptionsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { spacing, colors } = useTheme();
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Opções de pagamento"
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: spacing(2),
          }}
        >
          <Button variant="ghost" tone="neutral" onClick={onClose}>
            Fechar
          </Button>
        </div>
      }
    >
      <div style={{ display: "grid", gap: spacing(2) }}>
        <Text>💳 Cartão de crédito em até 10x sem juros</Text>
        <Text>🏦 Boleto bancário (compensação em até 2 dias úteis)</Text>
        <Text>💸 Pix com 5% de desconto imediato</Text>
        <Text>🛍️ Carteiras digitais (Apple Pay, Google Pay)</Text>
        <div
          style={{
            marginTop: spacing(2),
            padding: spacing(2),
            borderRadius: 8,
            background: colors.surface,
            border: `1px dashed ${colors.border}`,
          }}
        >
          <Text style={{ fontWeight: 700 }}>Simulação</Text>
          <Text>- Pix (5% off): aplicado no checkout</Text>
          <Text>- 1x e 10x no cartão: sem juros</Text>
        </div>
      </div>
    </Modal>
  );
}
