import React, { useState } from "react";
import { useTheme } from "@prisma-ui/core";
import { hexToRgba } from "../../utils/color";
import { transition } from "../../utils/style";

export type GalleryImage = {
  id: string;
  src: string;
  alt?: string;
};

export type ProductGalleryProps = {
  images: GalleryImage[];
  aspectRatio?: string;
};

export function ProductGallery({
  images,
  aspectRatio = "4 / 3",
}: ProductGalleryProps) {
  const { colors, radii, spacing } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];

  return (
    <div
      style={{
        display: "grid",
        gap: spacing(3),
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
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio,
            overflow: "hidden",
            borderRadius: radii.md,
            background: hexToRgba(colors.surface, 1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {activeImage ? (
            <img
              src={activeImage.src}
              alt={activeImage.alt ?? "Imagem do produto"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <span style={{ color: colors.mutedText }}>Imagem indisponível</span>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: spacing(2),
          overflowX: "auto",
          paddingBottom: spacing(1),
        }}
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{
                borderRadius: radii.md,
                border: `2px solid ${hexToRgba(
                  colors.brandAccent,
                  isActive ? 0.7 : 0.3
                )}`,
                background: hexToRgba(colors.surface, 0.9),
                padding: spacing(1),
                minWidth: spacing(20),
                cursor: "pointer",
                transition: transition(["border", "transform"]),
                transform: isActive ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              <img
                src={image.src}
                alt={image.alt ?? "Miniatura do produto"}
                style={{
                  width: "100%",
                  height: spacing(16),
                  objectFit: "cover",
                  borderRadius: radii.sm,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
