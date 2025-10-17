import { Text, useTheme } from "@prisma-ui/core";

export function PaymentLink({ onOpen }: { onOpen: () => void }) {
  const { colors } = useTheme();
  return (
    <Text style={{ color: colors.mutedText }}>
      <button
        type="button"
        onClick={onOpen}
        style={{
          background: "transparent",
          border: "none",
          color: colors.brand,
          textDecoration: "underline",
          padding: 0,
          cursor: "pointer",
          fontSize: "0.825rem",
          fontWeight: "bold",
        }}
      >
        Ver mais opções de pagamento
      </button>
    </Text>
  );
}
