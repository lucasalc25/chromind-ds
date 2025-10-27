import { Button } from "../atoms";
import {
  ProductGallery,
  AddToCart,
  CheckoutSteps,
  CartSheet,
  Drawer,
  Modal,
  Toast,
  ProductGrid,
} from "../organisms";
import type { Product } from "../../types";

type Steps = Array<{
  id: string;
  label: string;
  description?: string;
  status: "complete" | "current" | "upcoming";
}>;
type GalleryImage = { id: string; src: string; alt?: string };

type OrganismsSectionProps = {
  galleryImages: GalleryImage[];
  galleryIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSetImageIndex: (i: number) => void;

  demoProduct: Product;
  qty: number;
  onChangeQty: (n: number) => void;
  onAddToCart: () => void;

  steps: Steps;

  cartOpen: boolean;
  onOpenCart: () => void;
  onCloseCart: () => void;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  subtotal: number;
  onCheckout: () => void;

  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;

  drawerOpen: boolean;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;

  toastOpen: boolean;
  onOpenToast: () => void;
  onCloseToast: () => void;

  gridProducts: Product[];
  isFavFirst: boolean;
  onToggleFavFirst: () => void;
};

export function OrganismsSection(props: OrganismsSectionProps) {
  const {
    galleryImages,
    galleryIndex,
    onSetImageIndex,
    demoProduct,
    qty,
    onChangeQty,
    onAddToCart,
    steps,
    cartOpen,
    onOpenCart,
    onCloseCart,
    onCheckout,
    modalOpen,
    onOpenModal,
    onCloseModal,
    drawerOpen,
    onOpenDrawer,
    onCloseDrawer,
    toastOpen,
    onOpenToast,
    onCloseToast,
    gridProducts,
    isFavFirst,
    onToggleFavFirst,
  } = props;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ padding: 20, maxWidth: 420, flex: "1 1 340px" }}>
          <label style={{ display: "block", marginBottom: 12 }}>
            ProductGallery:
          </label>
          <ProductGallery
            images={galleryImages}
            activeIndex={galleryIndex}
            onChangeIndex={onSetImageIndex}
          />
        </div>

        <div style={{ padding: 20, maxWidth: 420, flex: "1 1 320px" }}>
          <label style={{ display: "block", marginBottom: 12 }}>
            AddToCart:
          </label>
          <AddToCart
            product={demoProduct}
            quantity={qty}
            onQuantityChange={onChangeQty}
            onAddToCart={onAddToCart}
            label="Adicionar ao carrinho"
          />
        </div>

        <div style={{ padding: 20, maxWidth: 520, flex: "1 1 360px" }}>
          <label style={{ display: "block", marginBottom: 12 }}>
            CheckoutSteps:
          </label>
          <CheckoutSteps steps={steps} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "center",
          flexWrap: "wrap",
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
            CartSheet:
          </label>
          <Button onClick={onOpenCart}>Abrir carrinho</Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>Modal:</label>
          <Button onClick={onOpenModal}>Abrir modal</Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>Drawer:</label>
          <Button onClick={onOpenDrawer}>Abrir drawer</Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <label style={{ display: "block", marginBottom: 12 }}>Toast:</label>
          <Button onClick={onOpenToast}>Mostrar toast</Button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          padding: 20,
        }}
      >
        <label style={{ display: "block", marginBottom: 12 }}>
          ProductGrid:
        </label>
        <ProductGrid
          products={gridProducts as any}
          favorites={
            new Set(isFavFirst ? [gridProducts[0]?.id].filter(Boolean) : [])
          }
          onFavoriteToggle={onToggleFavFirst}
        />
      </div>

      <CartSheet
        isOpen={cartOpen}
        onClose={onCloseCart}
        title="Seu carrinho"
        items={[
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
        onCheckout={onCheckout}
        onRemoveItem={() => {}}
        side="right"
      />

      <Modal
        isOpen={modalOpen}
        onClose={onCloseModal}
        title="Confirmação"
        footer={
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
            }}
          >
            <Button variant="ghost" tone="neutral" onClick={onCloseModal}>
              Cancelar
            </Button>
            <Button onClick={onCloseModal}>Confirmar</Button>
          </div>
        }
      >
        <p>Este é um exemplo de modal do Prisma UI.</p>
      </Modal>

      <Drawer
        isOpen={drawerOpen}
        onClose={onCloseDrawer}
        title="Painel"
        side="left"
      >
        <p>Conteúdo do Drawer.</p>
        <p>Teste rolagem, bordas e comportamento de foco.</p>
      </Drawer>

      <Toast
        open={toastOpen}
        onClose={onCloseToast}
        title="Item adicionado"
        description="Produto colocado no carrinho."
        tone="success"
        autoDismiss={3000}
        action={{
          label: "Ver carrinho",
          onClick: onOpenCart,
        }}
      />
    </>
  );
}
