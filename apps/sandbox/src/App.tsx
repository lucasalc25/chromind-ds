import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, Box, Text } from "@prisma-ui/core";
import {
  ProductGrid,
  SortSelect,
  type SortKey,
  SearchBar,
  Breadcrumbs,
  Pagination,
  Product,
  CartSheet,
  Toast,
  ComponentsGallery,
  ProductDetail,
  BrandFilters,
} from "@prisma-ui/sales";
import {
  toyShopTheme,
  petShopTheme,
  clothingShopTheme,
  electronicsShopTheme,
  drugstoreShopTheme,
} from "@prisma-ui/sales";
import { products as catalog } from "./data/products";
import { Page } from "./Page";
import { useBreakpoints } from "@prisma-ui/core";

const themes = {
  "toy-shop": toyShopTheme,
  "pet-shop": petShopTheme,
  "clothing-shop": clothingShopTheme,
  "electronics-shop": electronicsShopTheme,
  "drugstore-shop": drugstoreShopTheme,
} as const;

type ThemeKey = keyof typeof themes;

const PAGE_SIZE = 8;

type FiltersState = {
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
};

export function App() {
  // Breakpoints
  const bp = useBreakpoints();

  const mainGridStyle: React.CSSProperties = {
    display: "grid",
    gap: 32,
    gridTemplateColumns: bp.ltLg ? "1fr" : "260px 1fr",
    marginTop: 32,
  };

  const headerControlsStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  };

  const paginationWrapStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  };

  // Hooks
  const [themeKey, setThemeKey] = useState<ThemeKey>("toy-shop");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [view, setView] = useState<"catalog" | "product" | "components">(
    "catalog"
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("popular");

  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  function handleFavoriteToggle(product: { id: string }) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(product.id) ? next.delete(product.id) : next.add(product.id);
      return next;
    });
  }

  const theme = themes[themeKey];

  // 1) recorte por NICHO (tema selecionado)
  const nicheProducts = useMemo(
    () => catalog.filter((p) => p.niche === themeKey),
    [themeKey]
  );

  // 2) min/max do nicho atual (slider)
  const [absMin, absMax] = useMemo(() => {
    if (!nicheProducts.length) return [0, 0];
    const prices = nicheProducts.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [nicheProducts]);

  // 3) filtros locais (marca + preço) — reset ao trocar de tema
  const [filters, setFilters] = useState<FiltersState>({
    brands: [],
    minPrice: absMin,
    maxPrice: absMax,
  });

  useEffect(() => {
    setFilters({ brands: [], minPrice: absMin, maxPrice: absMax });
    setQuery("");
  }, [themeKey, absMin, absMax]);

  // 4) marcas disponíveis
  const brandOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of nicheProducts) set.add(p.brand?.trim() || "Sem marca");
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [nicheProducts]);

  // 5) sugestões de busca do nicho atual
  const searchSuggestions = useMemo(
    () =>
      nicheProducts.map((product) => ({ id: product.id, label: product.name })),
    [nicheProducts]
  );

  // 6) aplica busca + filtros + ordenação
  const filtered = useMemo(() => {
    let list = nicheProducts;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (filters.brands.length > 0) {
      list = list.filter((p) => {
        const label = p.brand?.trim() || "Sem marca";
        return filters.brands.includes(label);
      });
    }

    if (filters.minPrice != null) {
      list = list.filter((p) => p.price >= (filters.minPrice as number));
    }
    if (filters.maxPrice != null) {
      list = list.filter((p) => p.price <= (filters.maxPrice as number));
    }

    switch (sortKey) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating-desc":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [nicheProducts, query, filters, sortKey]);

  // 7) paginação
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [query, sortKey, filters, themeKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  function openProduct(p: Product) {
    setSelectedProduct(p);
    setView("product");
  }

  const crumbs = [
    { id: "home", label: "Início", href: "/" },
    view === "catalog"
      ? { id: "catalog", label: "Catálogo" }
      : view === "components"
      ? { id: "components", label: "Componentes" }
      : { id: "product", label: "Produto" },
  ];

  const [cartOpen, setCartOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [cartItems, setCartItems] = useState<
    Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image?: string;
    }>
  >([]);

  // handlers
  function handleAddToCart(product: Product, qty: number) {
    setCartItems((prev) => {
      const i = prev.findIndex((it) => it.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: qty,
          image: product.images?.[0],
        },
      ];
    });
    setToastOpen(true);
  }

  function handleOpenCart() {
    setCartOpen(true);
  }
  function handleCloseCart() {
    setCartOpen(false);
  }
  function handleCloseToast() {
    setToastOpen(false);
  }

  const subtotal = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <ThemeProvider theme={theme} mode={mode}>
      <div
        style={{
          minHeight: "100vh",
          background: theme.colors.background,
          color: theme.colors.text,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Page>
          <Box style={{ maxWidth: 1536, margin: "0 auto", padding: 20 }}>
            {/* HEADER */}
            <header style={{ display: "grid", gap: 16, marginTop: 16 }}>
              <Text style={{ fontSize: 28, fontWeight: 800 }}>Prisma UI</Text>

              <div style={headerControlsStyle}>
                <label>
                  Visualização:{" "}
                  <select
                    value={view}
                    onChange={(e) => setView(e.target.value as any)}
                  >
                    <option value="catalog">Catálogo</option>
                    <option value="components">Componentes</option>
                  </select>
                </label>
                <label>
                  Tema:{" "}
                  <select
                    value={themeKey}
                    onChange={(e) => setThemeKey(e.target.value as ThemeKey)}
                  >
                    {Object.keys(themes).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Modo:{" "}
                  <select
                    value={mode}
                    onChange={(e) =>
                      setMode(e.target.value as "light" | "dark")
                    }
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                  </select>
                </label>
              </div>

              <SearchBar
                value={query}
                onChange={setQuery}
                onSearch={(value) => setQuery(value)}
                suggestions={searchSuggestions}
              />

              <Breadcrumbs items={crumbs} />
            </header>

            {view === "catalog" && (
              <main style={mainGridStyle}>
                <aside style={{ marginInline: "auto", width: 260 }}>
                  <BrandFilters
                    brands={brandOptions}
                    selectedBrands={filters.brands}
                    onChangeBrands={(brands) =>
                      setFilters((f) => ({ ...f, brands }))
                    }
                    minLimit={absMin}
                    maxLimit={absMax}
                    value={[
                      filters.minPrice ?? absMin,
                      filters.maxPrice ?? absMax,
                    ]}
                    onChangeValue={([min, max]) =>
                      setFilters((f) => ({
                        ...f,
                        minPrice: min,
                        maxPrice: max,
                      }))
                    }
                    onClear={() =>
                      setFilters({
                        brands: [],
                        minPrice: absMin,
                        maxPrice: absMax,
                      })
                    }
                  />
                </aside>

                <section style={{ display: "grid", gap: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      maxWidth: 300,
                    }}
                  >
                    <SortSelect value={sortKey} onChange={setSortKey} />
                  </div>

                  <ProductGrid
                    products={pageProducts}
                    favorites={favorites}
                    onFavoriteToggle={handleFavoriteToggle}
                    onProductClick={openProduct}
                    onAddToCart={(p, q) => handleAddToCart(p, q)}
                  />

                  <div style={paginationWrapStyle}>
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  </div>
                </section>
                <CartSheet
                  isOpen={cartOpen}
                  onClose={handleCloseCart}
                  title="Seu carrinho"
                  items={cartItems}
                  subtotal={subtotal}
                  onCheckout={() => {
                    /* ... */
                  }}
                  onRemoveItem={(id) =>
                    setCartItems((prev) => prev.filter((i) => i.id !== id))
                  }
                  side="right"
                  width={400}
                />

                <Toast
                  open={toastOpen}
                  onClose={handleCloseToast}
                  title="Item adicionado"
                  description="Produto colocado no carrinho."
                  tone="success"
                  autoDismiss={5000}
                  action={{ label: "Ver carrinho", onClick: handleOpenCart }}
                />
              </main>
            )}

            {view === "product" && selectedProduct && (
              <main>
                <ProductDetail
                  product={selectedProduct}
                  isFavorite={favorites.has(selectedProduct.id)}
                  onFavoriteToggle={() => handleFavoriteToggle(selectedProduct)}
                  onAddToCart={(p, q) => handleAddToCart(p, q)}
                />
                <CartSheet
                  isOpen={cartOpen}
                  onClose={handleCloseCart}
                  title="Seu carrinho"
                  items={cartItems}
                  subtotal={subtotal}
                  onCheckout={() => {
                    /* ... */
                  }}
                  onRemoveItem={(id) =>
                    setCartItems((prev) => prev.filter((i) => i.id !== id))
                  }
                  side="right"
                  width={400}
                />

                <Toast
                  open={toastOpen}
                  onClose={handleCloseToast}
                  title="Item adicionado"
                  description="Produto colocado no carrinho."
                  tone="success"
                  autoDismiss={5000}
                  action={{ label: "Ver carrinho", onClick: handleOpenCart }}
                />
              </main>
            )}

            {view === "components" && <ComponentsGallery />}
          </Box>
        </Page>
      </div>
    </ThemeProvider>
  );
}
