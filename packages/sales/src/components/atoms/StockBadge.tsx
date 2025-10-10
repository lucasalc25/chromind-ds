import React from "react";
import { useTheme } from "@prisma-ui/core";
import { hexToRgba } from "../../utils/color";

export type StockStatus = "em-estoque" | "poucas-unidades" | "sem-estoque";

const STATUS_LABEL: Record<StockStatus, string> = {
  "em-estoque": "Em estoque",
  "poucas-unidades": "Poucas unidades",
  "sem-estoque": "Sem estoque",
};

type StockBadgeProps = {
  status: StockStatus;
};

export function StockBadge({ status }: StockBadgeProps) {
  const { colors, radii, spacing } = useTheme();

  const accent = {
    "em-estoque": colors.success,
    "poucas-unidades": colors.warning,
    "sem-estoque": colors.danger,
  }[status];

  const background = hexToRgba(accent, 0.14);
  const border = hexToRgba(accent, 0.36);
  const textColor = status === "poucas-unidades" ? colors.text : accent;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing(1),
        background,
        color: textColor,
        borderRadius: radii.pill,
        padding: `${spacing(1)} ${spacing(2.5)}`,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        border: `1px solid ${border}`,
        boxShadow: `0 8px 18px ${hexToRgba(colors.text, 0.08)}`,
      }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
