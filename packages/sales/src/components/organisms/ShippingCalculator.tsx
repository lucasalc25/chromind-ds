import { useState } from "react";
import { Button } from "@prisma-ui/sales";
import { Text, useTheme } from "@prisma-ui/core";
import { Truck } from "lucide-react";

export function ShippingCalculator() {
  const { spacing, colors } = useTheme();
  const [cep, setCep] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const address = "Av. Exemplo, 123 - São Paulo/SP";
  const cepFormatado = "01234-567";
  const results = [
    {
      id: "economica",
      name: "Entrega Econômica",
      price: 19.9,
      eta: "5–8 dias úteis",
    },
    {
      id: "expressa",
      name: "Entrega Expressa",
      price: 39.9,
      eta: "2–3 dias úteis",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gap: spacing(2),
        padding: spacing(3),
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        background: colors.surface,
      }}
    >
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <Truck fill={`${colors.brand}`} stroke={`${colors.brand}`} />
        <Text style={{ fontWeight: 700, color: `${colors.brand}` }}>
          Consultar Frete
        </Text>
      </div>

      {!submitted ? (
        <>
          <div style={{ display: "flex", gap: spacing(2) }}>
            <input
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Digite seu CEP"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px solid ${colors.brand}`,
                background: "transparent",
                color: colors.text,
              }}
            />
            <Button onClick={() => setSubmitted(true)}>Pesquisar</Button>
          </div>
          <Text style={{ color: colors.mutedText }}>
            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              target="_blank"
              rel="noreferrer"
              style={{
                color: colors.brand,
                textDecoration: "underline",
                fontSize: ".825rem",
              }}
            >
              Não sei meu CEP
            </a>
          </Text>
        </>
      ) : (
        <>
          <Text>{address}</Text>
          <div
            style={{ display: "flex", alignItems: "center", gap: spacing(2) }}
          >
            <Text>CEP: {cepFormatado}</Text>
            <button
              type="button"
              onClick={() => {
                setCep("");
                setSubmitted(false);
              }}
              style={{
                marginLeft: 20,
                background: "transparent",
                border: "none",
                color: colors.brand,
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              Verificar outro CEP
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gap: spacing(1.5),
              marginTop: spacing(1),
            }}
          >
            {results.map((r) => (
              <div
                key={r.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: spacing(2),
                  borderRadius: 8,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div style={{ display: "grid", gap: 4 }}>
                  <Text style={{ fontWeight: 600 }}>{r.name}</Text>
                  <Text style={{ color: colors.mutedText }}>{r.eta}</Text>
                </div>
                <Text style={{ fontWeight: 700 }}>
                  {r.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: spacing(2.5),
              alignItems: "center",
              marginTop: spacing(3),
            }}
          >
            <span aria-hidden>⚠️</span>
            <Text style={{ fontSize: "0.825rem" }}>
              Os prazos de entrega começam a contar a partir da confirmação de
              pagamento.
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
