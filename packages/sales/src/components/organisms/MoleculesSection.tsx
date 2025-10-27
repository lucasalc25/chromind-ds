import {
  Breadcrumbs,
  SearchBar,
  SortSelect,
  Pagination,
  Tabs,
  VariantSelector,
  BrandFilters,
} from "../molecules";
import { ProductCard } from "../organisms";
import type { Product } from "../../types";
import { useBreakpoints } from "@chromind/core";

type MoleculesSectionProps = {
  activeTab: string;
  onTabChange: (id: string) => void;

  selectedVariant: Record<string, string>;
  onSelectVariant: (groupId: string, optionId: string) => void;

  brands: string[];
  priceRange: [number, number];
  onChangePriceRange: (range: [number, number]) => void;
  onClearFilters: () => void;

  demoProduct: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function MoleculesSection({
  activeTab,
  onTabChange,
  selectedVariant,
  onSelectVariant,
  brands,
  priceRange,
  onChangePriceRange,
  onClearFilters,
  demoProduct,
  isFavorite,
  onToggleFavorite,
}: MoleculesSectionProps) {
  const [min, max] = priceRange;
  const { ltLg } = useBreakpoints();
  const twoCol = !ltLg;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          flexWrap: "wrap",
          rowGap: 12,
        }}
      >
        <label style={{ display: "block", marginRight: 12 }}>
          BreadCrumbs:
        </label>
        <Breadcrumbs
          items={[
            { id: "home", label: "Início", href: "/" },
            { id: "gallery", label: "Galeria" },
          ]}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          flexWrap: "wrap",
          rowGap: 12,
        }}
      >
        <label style={{ display: "block", marginRight: 12 }}>SearchBar:</label>
        <SearchBar
          value={""}
          onChange={() => {}}
          onSearch={() => {}}
          suggestions={[]}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          flexWrap: "wrap",
          rowGap: 12,
        }}
      >
        <label style={{ display: "block", marginRight: 12 }}>SortSelect:</label>
        <SortSelect value={"popular" as any} onChange={() => {}} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          flexWrap: "wrap",
          rowGap: 12,
        }}
      >
        <label style={{ display: "block", marginRight: 12 }}>Pagination:</label>
        <Pagination page={1} totalPages={5} onPageChange={() => {}} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          flexWrap: "wrap",
          rowGap: 12,
        }}
      >
        <label style={{ display: "block", marginRight: 12 }}>Tabs:</label>
        <Tabs
          tabs={[
            { id: "t1", label: "Tab 1", content: <div>Conteúdo 1</div> },
            { id: "t2", label: "Tab 2", content: <div>Conteúdo 2</div> },
          ]}
          activeId={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          flexWrap: "wrap",
          rowGap: 12,
        }}
      >
        <label style={{ display: "block", marginRight: 12 }}>
          VariantSelector:
        </label>
        <VariantSelector
          groups={[
            {
              id: "size",
              name: "Tamanho",
              options: [
                { id: "p", label: "P", disabled: true },
                { id: "m", label: "M" },
                { id: "g", label: "G" },
              ],
            },
            {
              id: "color",
              name: "Cor",
              options: [
                { id: "wht", label: "Branco" },
                { id: "blk", label: "Preto" },
                { id: "blu", label: "Azul", disabled: true },
              ],
            },
          ]}
          selected={selectedVariant}
          onSelect={onSelectVariant}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: twoCol ? "260px 420px" : "1fr",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>
            BrandFilters:
          </label>
          <BrandFilters
            brands={brands}
            selectedBrands={["LEGO"]}
            onChangeBrands={() => {}}
            minLimit={0}
            maxLimit={500}
            value={[min, max]}
            onChangeValue={onChangePriceRange}
            onClear={onClearFilters}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>
            ProductCard:
          </label>
          <ProductCard
            product={demoProduct as any}
            isFavorite={isFavorite}
            onFavoriteToggle={onToggleFavorite}
            onAddToCart={() => {}}
            ctaLabel="Adicionar"
          />
        </div>
      </div>
    </div>
  );
}
