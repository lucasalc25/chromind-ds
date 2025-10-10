import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, Box, Text } from "@prisma-ui/core";
import {
  ProductGrid,
  SortSelect,
  type SortKey,
  SearchBar,
  Breadcrumbs,
  Pagination,
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
import { BrandPriceFilters } from "@prisma-ui/sales";

// === temas (niches) disponíveis no header ===
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
  // header
  const [themeKey, setThemeKey] = useState<ThemeKey>("toy-shop");
  const [mode, setMode] = useState<"light" | "dark">("light");

  // busca e ordenação
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("popular");

  // favoritos controlados no App
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  function handleFavoriteToggle(product: { id: string }) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(product.id) ? next.delete(product.id) : next.add(product.id);
      return next; // imutável
    });
  }

  const theme = themes[themeKey];

  // 1) recorte por NICHO (tema selecionado)
  const nicheProducts = useMemo(
    () => catalog.filter((p) => p.niche === themeKey),
    [themeKey]
  );

  // 2) min/max do nicho atual (para slider)
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

  // 4) marcas disponíveis (inclui “Sem marca”)
  const brandOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of nicheProducts) set.add(p.brand?.trim() || "Sem marca");
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [nicheProducts]);

  // 5) sugestões de busca só do nicho atual
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
        return list; // "popular" (sem ordenação extra)
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
          <Box style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
            <Breadcrumbs
              items={[
                { id: "home", label: "Início", href: "#" },
                { id: "catalog", label: "Catálogo" },
              ]}
            />

            {/* HEADER */}
            <header style={{ display: "grid", gap: 16, marginTop: 16 }}>
              <Text style={{ fontSize: 28, fontWeight: 800 }}>Prisma UI</Text>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 16,
                }}
              >
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
            </header>

            {/* LAYOUT: filtros à esquerda, grid à direita */}
            <main
              style={{
                display: "grid",
                gap: 32,
                gridTemplateColumns: "260px 1fr",
                marginTop: 32,
              }}
            >
              <aside>
                <BrandPriceFilters
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
                    setFilters((f) => ({ ...f, minPrice: min, maxPrice: max }))
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
                <SortSelect value={sortKey} onChange={setSortKey} />

                {/* GRID: recebe favoritos + callback */}
                <ProductGrid
                  products={pageProducts}
                  favorites={favorites} // Set<string> com ids
                  onFavoriteToggle={handleFavoriteToggle}
                />

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </section>
            </main>
          </Box>
        </Page>
      </div>
    </ThemeProvider>
  );
}
