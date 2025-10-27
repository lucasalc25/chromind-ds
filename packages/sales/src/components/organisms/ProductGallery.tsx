import { useState } from "react";
import { useTheme, hexToRgba } from "@chromind/core";
import { Button } from "../atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBreakpoints } from "@chromind/core";

export type GalleryImage = { id: string; src: string; alt?: string };

export type ProductGalleryProps = {
  images: GalleryImage[];
  aspectRatio?: string;
  activeIndex?: number;
  onChangeIndex?: (index: number) => void;
  showNav?: boolean;
  /** Nome do produto para acessibilidade (usado como fallback de alt/texto) */
  productName?: string;
};

export function ProductGallery({
  images,
  aspectRatio = "4 / 3",
  activeIndex,
  onChangeIndex,
  showNav = true,
  productName = "Produto",
}: ProductGalleryProps) {
  const { ltMd } = useBreakpoints();
  const thumbSize = ltMd ? 56 : 64;

  const { colors, radii, spacing } = useTheme();

  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = typeof activeIndex === "number";
  const index = isControlled
    ? Math.max(0, Math.min(images.length - 1, activeIndex!))
    : internalIndex;

  const setIndex = (i: number) => {
    const next = Math.max(0, Math.min(images.length - 1, i));
    if (isControlled) onChangeIndex?.(next);
    else setInternalIndex(next);
  };

  const prev = () => setIndex(index - 1);
  const next = () => setIndex(index + 1);

  const active = images[index];

  // Fallbacks de alt acessível
  const mainAlt =
    active?.alt?.trim() ||
    `${productName} - imagem ${Math.min(index + 1, images.length)}`;

  const thumbAlt = (i: number, img: GalleryImage) =>
    img.alt?.trim() || `${productName} - miniatura ${i + 1}`;

  return (
    <div
      style={{
        display: "grid",
        gap: spacing(3),
        alignItems: "start",
        alignSelf: "start",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: radii.lg,
          border: `1px solid ${hexToRgba(colors.border, 0.8)}`,
          overflow: "hidden",
          background: hexToRgba(colors.surface, 0.96),
          padding: spacing(2),
          width: "100%",
          alignSelf: "start",
        }}
      >
        <div
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: radii.lg,
            overflow: "hidden",
            aspectRatio,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.surface,
            width: "100%",
          }}
        >
          {active ? (
            <img
              src={active.src}
              alt={mainAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ color: colors.mutedText }}>Sem imagem</span>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: spacing(1),
            justifyContent: "center",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            alignSelf: "start",
          }}
        >
          {images.map((img, i) => {
            const selected = i === index;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Miniatura ${i + 1}`}
                aria-current={selected ? "true" : undefined}
                style={{
                  border: `2px solid ${
                    selected ? colors.brand : colors.border
                  }`,
                  padding: 0,
                  borderRadius: radii.md,
                  overflow: "hidden",
                  width: thumbSize,
                  height: thumbSize,
                  flex: "0 0 auto",
                  cursor: "pointer",
                  background: "transparent",
                }}
              >
                <img
                  src={img.src}
                  alt={thumbAlt(i, img)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            );
          })}
        </div>
      )}

      {showNav && images.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 8,
            alignSelf: "start",
          }}
        >
          <Button
            type="button"
            onClick={prev}
            disabled={index === 0}
            variant="outline"
            aria-label="Anterior"
            title="Anterior"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            type="button"
            onClick={next}
            disabled={index === images.length - 1}
            variant="outline"
            aria-label="Próximo"
            title="Próximo"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
