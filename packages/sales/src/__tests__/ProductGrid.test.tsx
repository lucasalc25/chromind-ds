import { render, screen, fireEvent } from "@testing-library/react";
import { withTheme } from "../test-utils/helpers";
import type { Product } from "@prisma-ui/sales";
import { ProductGrid } from "@prisma-ui/sales";

jest.mock("@/components/organisms/ProductCard", () => ({
  ProductCard: ({
    product,
    isFavorite,
    onFavoriteToggle,
    onProductDetail,
    onAddToCart,
  }: any) => (
    <div data-testid={`card-${product.id}`}>
      <span data-testid={`fav-${product.id}`}>
        {isFavorite ? "fav:true" : "fav:false"}
      </span>
      <button onClick={() => onFavoriteToggle?.(product)}>fav</button>
      <button onClick={() => onProductDetail?.(product)}>detail</button>
      <button onClick={() => onAddToCart?.(product, 2)}>add2</button>
      <div>{product.name}</div>
    </div>
  ),
}));

const makeProduct = (id: string, name: string): Product => ({
  id,
  niche: "electronics-shop" as any,
  brand: "X",
  name,
  description: [],
  images: [],
  price: 100,
  originalPrice: 120,
  avaliations: 10,
  rating: 4.2,
  stock: "em-estoque" as any,
  categories: ["Eletrônicos"],
});

describe("ProductGrid", () => {
  test("renderiza cards e marca favoritos via prop 'favorites' ou 'isFavorite'", () => {
    const p1 = makeProduct("1", "P1");
    const p2 = makeProduct("2", "P2");

    const ui = withTheme(<ProductGrid products={[p1, p2]} favorites={["2"]} />);
    render(ui);

    expect(screen.getByTestId("fav-1").textContent).toBe("fav:false");
    expect(screen.getByTestId("fav-2").textContent).toBe("fav:true");
  });

  test("isFavorite (função) tem precedência sobre 'favorites'", () => {
    const p1 = makeProduct("1", "P1");
    const p2 = makeProduct("2", "P2");

    const ui = withTheme(
      <ProductGrid
        products={[p1, p2]}
        favorites={["1"]} // isto seria true para p1
        isFavorite={(p) => p.id === "2"} // mas aqui forçamos p2 como favorito
      />
    );
    render(ui);

    expect(screen.getByTestId("fav-1").textContent).toBe("fav:false");
    expect(screen.getByTestId("fav-2").textContent).toBe("fav:true");
  });

  test("dispara callbacks: onFavoriteToggle, onProductClick, onAddToCart", () => {
    const p1 = makeProduct("1", "P1");
    const onFav = jest.fn();
    const onClick = jest.fn();
    const onAdd = jest.fn();

    render(
      withTheme(
        <ProductGrid
          products={[p1]}
          onFavoriteToggle={onFav}
          onProductClick={onClick}
          onAddToCart={onAdd}
        />
      )
    );

    fireEvent.click(screen.getByText("fav"));
    expect(onFav).toHaveBeenCalledWith(p1);

    fireEvent.click(screen.getByText("detail"));
    expect(onClick).toHaveBeenCalledWith(p1);

    fireEvent.click(screen.getByText("add2"));
    expect(onAdd).toHaveBeenCalledWith(p1, 2);
  });
});
