import { render, screen, fireEvent } from "@testing-library/react";
import { withTheme } from "../test-utils/helpers";
import type { Product } from "@prisma-ui/sales";
import { PurchaseSection } from "@prisma-ui/sales";

// 🔧 Mocks dos filhos
jest.mock("@/components/molecules/PriceBox", () => ({
  PriceBox: ({ product, fontScale }: any) => (
    <div data-testid="pricebox">{`PriceBox ${product.name} x${fontScale}`}</div>
  ),
}));

jest.mock("@/components/molecules/PaymentLink", () => ({
  PaymentLink: ({ onOpen }: any) => (
    <button onClick={onOpen}>Ver formas de pagamento</button>
  ),
}));

jest.mock("@/components/molecules/BuyActions", () => ({
  BuyActions: ({ onAddToCart }: any) => (
    <button onClick={onAddToCart}>Adicionar ao carrinho</button>
  ),
}));

jest.mock("@/components/organisms/PaymentOptionsModal", () => ({
  PaymentOptionsModal: ({ open, onClose }: any) =>
    open ? (
      <div role="dialog">
        Modal de pagamento <button onClick={onClose}>Fechar</button>
      </div>
    ) : null,
}));

jest.mock("@/components/organisms/ShippingCalculator", () => ({
  ShippingCalculator: () => <div>ShippingCalculator</div>,
}));

// @prisma-ui/sales (StockBadge e QuantityStepper)
jest.mock("@prisma-ui/sales", () => {
  const actual = jest.requireActual("@prisma-ui/sales");
  return {
    ...actual,
    StockBadge: ({ status }: any) => <span data-testid="stock">{status}</span>,
    QuantityStepper: ({ value, onChange }: any) => (
      <div>
        <span data-testid="qty">{value}</span>
        <button onClick={() => onChange(value + 1)}>+</button>
        <button onClick={() => onChange(value - 1)}>-</button>
      </div>
    ),
  };
});

const product: Product = {
  id: "x1",
  niche: "electronics-shop" as any,
  brand: "Tech",
  name: "Headset",
  description: [],
  images: [],
  price: 200,
  originalPrice: 300,
  avaliations: 10,
  rating: 4.5,
  stock: "em-estoque" as any,
  categories: ["Eletrônicos"],
};

describe("PurchaseSection", () => {
  test("abre modal ao clicar em PaymentLink", () => {
    const onQty = jest.fn();

    render(
      withTheme(
        <PurchaseSection
          product={product}
          quantity={1}
          onQuantityChange={onQty}
        />
      )
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/ver formas de pagamento/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/fechar/i));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("altera quantidade via QuantityStepper e envia para onAddToCart", () => {
    const onQty = jest.fn();
    const onAdd = jest.fn();

    render(
      withTheme(
        <PurchaseSection
          product={product}
          quantity={2}
          onQuantityChange={onQty}
          onAddToCart={onAdd}
        />
      )
    );

    // aumenta a quantidade
    fireEvent.click(screen.getByText("+"));
    expect(onQty).toHaveBeenCalledWith(3);

    // clica em adicionar ao carrinho
    fireEvent.click(screen.getByText(/adicionar ao carrinho/i));
    expect(onAdd).toHaveBeenCalledWith(product, 2); // quantity é controlada externamente via prop
  });

  test("mostra o status de estoque", () => {
    render(
      withTheme(
        <PurchaseSection
          product={{ ...product, stock: "poucas-unidades" as any }}
          quantity={1}
          onQuantityChange={() => {}}
        />
      )
    );

    expect(screen.getByTestId("stock").textContent).toMatch(/poucas-unidades/i);
  });
});
