import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "@prisma-ui/sales";
import { withTheme, makeProduct } from "../test-utils/helpers";

test("renderiza nome, preço e permite favoritar", () => {
  const p = makeProduct("p1", "Carrinho RC");
  const onFav = jest.fn();
  render(
    withTheme(
      <ProductCard product={p} isFavorite={false} onFavoriteToggle={onFav} />
    )
  );

  expect(screen.getByText(/carrinho rc/i)).toBeInTheDocument();
  expect(screen.getByText("R$ 80,00")).toBeInTheDocument();

  // botão de favoritar (ícone/coração)
  const favBtn = screen.getByRole("button", { name: /favoritos/i });
  fireEvent.click(favBtn);
  expect(onFav).toHaveBeenCalledTimes(1);
});

test("adiciona ao carrinho com quantidade", () => {
  const p = makeProduct("p1", "Carrinho RC");
  const onAdd = jest.fn();
  render(withTheme(<ProductCard product={p} onAddToCart={onAdd} />));
  const addBtn = screen.getByRole("button", { name: /adicionar ao carrinho/i });
  fireEvent.click(addBtn);
  expect(onAdd).toHaveBeenCalled();
});
