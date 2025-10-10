import React from "react";
import { useTheme } from "@prisma-ui/core";
import { hexToRgba } from "../../utils/color";
import { transition } from "../../utils/style";

export type TabItem = {
  id: string;
  label: string;
  badge?: React.ReactNode;
  content: React.ReactNode;
};

export type TabsProps = {
  tabs: TabItem[];
  activeId: string;
  onTabChange: (id: string) => void;
  stretch?: boolean;
};

export function Tabs({ tabs, activeId, onTabChange, stretch }: TabsProps) {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing(3),
        fontFamily: typography.fontFamily,
      }}
    >
      <div
        role="tablist"
        style={{
          display: "flex",
          gap: spacing(1),
          padding: spacing(1),
          background: hexToRgba(colors.surface, 0.96),
          borderRadius: radii.lg,
          border: `1px solid ${hexToRgba(colors.border, 0.9)}`,
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onTabChange(tab.id)}
              style={{
                flex: stretch ? 1 : undefined,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: spacing(1),
                borderRadius: radii.md,
                border: "none",
                padding: `${spacing(1.5)} ${spacing(3)}`,
                background: isActive
                  ? hexToRgba(colors.brandAccent, 0.2)
                  : "transparent",
                color: isActive ? colors.brand : colors.mutedText,
                fontWeight: 600,
                cursor: "pointer",
                transition: transition(["background", "color", "transform"]),
                transform: isActive ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              {tab.label}
              {tab.badge && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: `0 ${spacing(1.5)}`,
                    borderRadius: radii.pill,
                    fontSize: 11,
                    background: hexToRgba(colors.brand, 0.16),
                    color: colors.brand,
                    fontWeight: 600,
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" style={{ color: colors.text }}>
        {tabs.find((tab) => tab.id === activeId)?.content}
      </div>
    </div>
  );
}
