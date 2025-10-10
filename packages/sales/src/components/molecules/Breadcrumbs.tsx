import React from "react";
import { useTheme } from "@prisma-ui/core";
import { hexToRgba } from "../../utils/color";

export type BreadcrumbItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: string;
};

export function Breadcrumbs({
  items,
  separator = "/",
}: BreadcrumbsProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: spacing(1),
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: typography.fontFamily,
          fontSize: 13,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = item.href ? (
            <a
              href={item.href}
              onClick={item.onClick}
              style={{
                color: isLast ? colors.text : colors.mutedText,
                textDecoration: "none",
                fontWeight: isLast ? 600 : 500,
                padding: `${spacing(0.5)} ${spacing(1)}`,
                borderRadius: spacing(1),
                background: isLast
                  ? hexToRgba(colors.brandAccent, 0.18)
                  : "transparent",
              }}
            >
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              style={{
                border: "none",
                background: isLast
                  ? hexToRgba(colors.brandAccent, 0.18)
                  : "transparent",
                color: isLast ? colors.text : colors.mutedText,
                fontWeight: isLast ? 600 : 500,
                cursor: item.onClick ? "pointer" : "default",
                padding: `${spacing(0.5)} ${spacing(1)}`,
                borderRadius: spacing(1),
              }}
            >
              {item.label}
            </button>
          );

          return (
            <li key={item.id} style={{ display: "inline-flex", gap: spacing(1) }}>
              {content}
              {!isLast && (
                <span
                  aria-hidden
                  style={{ color: hexToRgba(colors.border, 0.9), fontWeight: 400 }}
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
