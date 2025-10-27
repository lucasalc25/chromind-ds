import { render, screen } from "@testing-library/react";
import { PriceTag } from "@prisma-ui/sales";
import { withTheme } from "../test-utils/helpers";

test("exibe preço e preço original quando há desconto", () => {
  render(withTheme(<PriceTag price={80} originalPrice={100} />));
  expect(screen.getByText("R$ 80,00")).toBeInTheDocument();
  expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
});

test("não exibe original quando não há desconto", () => {
  render(withTheme(<PriceTag price={100} />));
  expect(screen.queryByText("R$ 100,00")).toBeInTheDocument();
});
