import { useTheme, hexToRgba } from "@prisma-ui/core";

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

export function Breadcrumbs({ items, separator = "/" }: BreadcrumbsProps) {
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
        }}
      >
        <span>{"Você está em:"}</span>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = item.href ? (
            <a
              href={item.href}
              onClick={item.onClick}
              style={{
                color: isLast ? colors.brand : colors.text,
                textDecoration: "none",
                fontWeight: isLast ? 600 : 500,
                padding: `${spacing(0.5)} ${spacing(1)}`,
                borderRadius: spacing(1),
                fontSize: "1rem",
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
                color: isLast ? colors.brand : colors.text,
                fontSize: "1rem",
                fontWeight: isLast ? 600 : 500,
                cursor: item.onClick ? "pointer" : "default",
                padding: `${spacing(0.5)} ${spacing(1)}`,
                borderRadius: spacing(1),
                background: "transparent",
              }}
            >
              {item.label}
            </button>
          );

          return (
            <li
              key={item.id}
              style={{ display: "inline-flex", gap: spacing(1) }}
            >
              {content}
              {!isLast && (
                <span
                  aria-hidden
                  style={{
                    color: hexToRgba(colors.mutedText, 0.9),
                    fontWeight: 600,
                  }}
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
