import React from "react";
import { useTheme } from "@prisma-ui/core";
import { hexToRgba } from "../../utils/color";
import { transition } from "../../utils/style";

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxButtons?: number;
};

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

export function Pagination({
  page,
  totalPages,
  onPageChange,
  maxButtons = 5,
}: PaginationProps) {
  const { colors, spacing, radii } = useTheme();

  if (totalPages <= 1) {
    return null;
  }

  const clampedPage = Math.max(1, Math.min(totalPages, page));
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, clampedPage - half);
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = range(start, end);

  const renderButton = (label: string | number, target: number, disabled = false) => (
    <button
      key={`${label}-${target}`}
      type="button"
      disabled={disabled}
      onClick={() => onPageChange(target)}
      style={{
        borderRadius: radii.md,
        border: `1px solid ${hexToRgba(colors.border, 0.9)}`,
        background:
          target === clampedPage
            ? hexToRgba(colors.brandAccent, 0.2)
            : "transparent",
        color:
          target === clampedPage ? colors.brand : hexToRgba(colors.text, 0.8),
        padding: `${spacing(1)} ${spacing(2)}`,
        cursor: disabled ? "not-allowed" : "pointer",
        minWidth: spacing(6),
        transition: transition(["background", "color", "transform"]),
        transform: target === clampedPage ? "translateY(-1px)" : "translateY(0)",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );

  return (
    <nav aria-label="Paginação">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing(1),
        }}
      >
        {renderButton("Anterior", clampedPage - 1, clampedPage === 1)}
        {start > 1 && (
          <>
            {renderButton(1, 1)}
            <span style={{ color: colors.mutedText }}>...</span>
          </>
        )}
        {pages.map((pageNumber) => renderButton(pageNumber, pageNumber))}
        {end < totalPages && (
          <>
            <span style={{ color: colors.mutedText }}>...</span>
            {renderButton(totalPages, totalPages)}
          </>
        )}
        {renderButton("Próximo", clampedPage + 1, clampedPage === totalPages)}
      </div>
    </nav>
  );
}
