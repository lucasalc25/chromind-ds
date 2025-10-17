import React, { useEffect, useMemo, useRef, useState } from "react";
import { Atoms } from "../organisms/AtomsSection";
import { Molecules } from "../organisms/MoleculesSection";
import { Organisms } from "../organisms/OrganismsSection";
import { useBreakpoints, Text, useTheme } from "@prisma-ui/core";
import { Product } from "@prisma-ui/sales";

function Section({
  id,
  title,
  subtitle,
  children,
}: React.PropsWithChildren<{ id: string; title: string; subtitle?: string }>) {
  const { colors } = useTheme();

  return (
    <section
      id={id}
      style={{
        paddingTop: 64,
        marginTop: -64,
      }}
    >
      <div
        style={{
          marginTop: 48,
          padding: "32px 0",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 14,
              opacity: 0.7,
              marginTop: 0,
              marginBottom: 16,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}
        <div style={{ display: "grid", gap: 24 }}>{children}</div>
      </div>
    </section>
  );
}

export function ComponentsGallery() {
  const { colors } = useTheme();

  const { ltLg } = useBreakpoints();

  // grid externo: 2 colunas (desktop) → 1 coluna (tablet/mobile)
  const galleryGridStyle: React.CSSProperties = {
    display: "grid",
    gap: 32,
    gridTemplateColumns: ltLg ? "1fr" : "260px 1fr",
    marginTop: 32,
    alignItems: "start",
  };

  const asideStyle: React.CSSProperties = {
    position: ltLg ? "static" : "sticky",
    top: ltLg ? undefined : 32,
    alignSelf: "start",
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: 18,
    background: colors.surface,
  };

  // ===== Estados básicos
  const [fav, setFav] = useState(false);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(4.4);
  const [min, setMin] = useState(50);
  const [max, setMax] = useState(300);
  const [activeTab, setActiveTab] = useState("t1");
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, string>
  >({ size: "m", color: "blk" });

  const [cartOpen, setCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = [
    { id: "g1", src: "/images/toy1.jpg" },
    { id: "g2", src: "/images/toy2.jpg" },
    { id: "g3", src: "/images/toy3.jpg" },
  ];

  const demoProduct: Product = {
    id: "demo-1",
    niche: "toy-shop",
    brand: "LEGO",
    name: "Lego Classic Blocos Criativos 500 peças",
    description: ["Kit criativo para todas as idades."],
    price: 159.9,
    originalPrice: 199.9,
    avaliations: 12,
    rating,
    stock: "em-estoque",
    categories: ["Brinquedos"],
    images: ["/images/toy2.jpg"],
    tags: ["Novo", "Popular"],
  };

  const gridProducts: Product[] = useMemo(
    () => [
      demoProduct,
      {
        ...demoProduct,
        id: "demo-2",
        name: "Fone Headset Gamer",
        images: [
          "/images/electronic1.jpg",
          "/images/electronic2.jpg",
          "/images/electronic3.jpg",
          "/images/electronic4.jpg",
        ],
      },
      {
        ...demoProduct,
        id: "demo-3",
        brand: "ALBTIME",
        name: "Jaqueta de Couro Marrom",
        images: ["/images/clothing1.jpg"],
      },
    ],
    []
  );

  // ===== Navegação lateral
  const sections = [
    { id: "atoms", label: "Átomos" },
    { id: "molecules", label: "Moléculas" },
    { id: "organisms", label: "Organismos" },
  ] as const;

  const [active, setActive] = useState<string>("atoms");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // scroll suave ao clicar no item do menu
  const onNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* estilo global p/ scroll suave (via hash) */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <main style={galleryGridStyle}>
        {/* NAV LATERAL */}
        <aside style={asideStyle}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 8,
              display: "block",
            }}
          >
            Navegação
          </Text>
          <nav style={{ display: "grid", gap: 6 }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavClick(s.id)}
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: active === s.id ? colors.surface : "transparent",
                  color: active === s.id ? colors.text : colors.mutedText,
                  cursor: "pointer",
                }}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* CONTEÚDO */}
        <section style={{ display: "grid" }}>
          <Text style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Prisma UI — Galeria de Componentes
          </Text>
          <Text style={{ opacity: 0.7, fontSize: 14, marginBottom: 8 }}>
            Visualização interativa dos átomos, moléculas e organismos do design
            system.
          </Text>

          {/* ÁTOMOS */}
          <Section
            id="atoms"
            title="Átomos"
            subtitle="Componentes básicos e reutilizáveis."
          >
            <Atoms
              rating={rating}
              qty={qty}
              fav={fav}
              onChangeQty={setQty}
              onToggleFav={() => setFav((v) => !v)}
            />
          </Section>

          {/* MOLÉCULAS */}
          <Section
            id="molecules"
            title="Moléculas"
            subtitle="Combinações simples de átomos e elementos interativos."
          >
            <Molecules
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedVariant={selectedVariant}
              onSelectVariant={(g, o) =>
                setSelectedVariant((prev) => ({ ...prev, [g]: o }))
              }
              brands={["Sem marca", "Hot Wheels", "LEGO"]}
              priceRange={[min, max]}
              onChangePriceRange={([a, b]) => {
                setMin(a);
                setMax(b);
              }}
              onClearFilters={() => {
                setMin(0);
                setMax(500);
              }}
              demoProduct={demoProduct}
              isFavorite={fav}
              onToggleFavorite={() => setFav((v) => !v)}
            />
          </Section>

          {/* ORGANISMOS */}
          <Section
            id="organisms"
            title="Organismos"
            subtitle="Composições completas: galerias, barras fixas, carrinho, checkout, modais e avisos."
          >
            <Organisms
              galleryImages={galleryImages}
              galleryIndex={galleryIndex}
              onSetImageIndex={(i) => setGalleryIndex(i)}
              onPrevImage={() => setGalleryIndex((i) => Math.max(0, i - 1))}
              onNextImage={() =>
                setGalleryIndex((i) =>
                  Math.min(galleryImages.length - 1, i + 1)
                )
              }
              demoProduct={demoProduct}
              qty={qty}
              onChangeQty={setQty}
              onAddToCart={() => setToastOpen(true)}
              steps={[
                {
                  id: "s1",
                  label: "Carrinho",
                  description: "Revise seus itens",
                  status: "complete",
                },
                {
                  id: "s2",
                  label: "Entrega",
                  description: "Informe endereço",
                  status: "current",
                },
                {
                  id: "s3",
                  label: "Pagamento",
                  description: "Escolha o método",
                  status: "upcoming",
                },
              ]}
              cartOpen={cartOpen}
              onOpenCart={() => setCartOpen(true)}
              onCloseCart={() => setCartOpen(false)}
              cartItems={[
                {
                  id: "1",
                  name: "Lego Classic Blocos Criativos",
                  price: 159.9,
                  quantity: 1,
                  image: "/images/toy2.jpg",
                },
                {
                  id: "2",
                  name: "Mouse Sem Fio 2400 DPI",
                  price: 79.0,
                  quantity: 2,
                  image: "/images/electronic2.jpg",
                },
              ]}
              subtotal={159.9 + 2 * 79.0}
              onCheckout={() => {
                setCartOpen(false);
                setModalOpen(true);
              }}
              modalOpen={modalOpen}
              onOpenModal={() => setModalOpen(true)}
              onCloseModal={() => setModalOpen(false)}
              drawerOpen={drawerOpen}
              onOpenDrawer={() => setDrawerOpen(true)}
              onCloseDrawer={() => setDrawerOpen(false)}
              toastOpen={toastOpen}
              onOpenToast={() => setToastOpen(true)}
              onCloseToast={() => setToastOpen(false)}
              gridProducts={gridProducts}
              isFavFirst={fav}
              onToggleFavFirst={() => setFav((v) => !v)}
            />
          </Section>
        </section>
      </main>
    </>
  );
}
