import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme, hexToRgba, transition } from "@prisma-ui/core";
import { Button } from "../atoms/Button";

type DrawerSide = "left" | "right";

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: DrawerSide;
  width?: number;
};

const ensureContainer = () => {
  let container = document.getElementById("prisma-ui-drawer-root");
  if (!container) {
    container = document.createElement("div");
    container.id = "prisma-ui-drawer-root";
    document.body.appendChild(container);
  }
  return container;
};

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = "right",
  width,
}: DrawerProps) {
  const { colors, spacing, radii, typography } = useTheme();

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (typeof document === "undefined" || !isOpen) {
    return null;
  }

  const container = ensureContainer();
  const computedWidth = width ?? parseInt(spacing(90), 10);

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: side === "right" ? "flex-end" : "flex-start",
        zIndex: 999,
        fontFamily: typography.fontFamily,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: hexToRgba(colors.text, 0.5),
          backdropFilter: "blur(8px)",
          transition: transition(["opacity"]),
        }}
      />
      <aside
        style={{
          position: "relative",
          width: `min(${computedWidth}px, 92vw)`,
          height: "100%",
          background: colors.background,
          borderLeft:
            side === "right"
              ? `1px solid ${hexToRgba(colors.border, 0.9)}`
              : undefined,
          borderRight:
            side === "left"
              ? `1px solid ${hexToRgba(colors.border, 0.9)}`
              : undefined,
          boxShadow: `0 24px 60px ${hexToRgba(colors.text, 0.12)}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `${spacing(3)} ${spacing(4)}`,
            borderBottom: `1px solid ${hexToRgba(colors.border, 0.85)}`,
            gap: spacing(2),
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            {title}
          </h2>
          <Button
            aria-label="Fechar painel"
            variant="ghost"
            tone="neutral"
            onClick={onClose}
            style={{
              minWidth: "auto",
              padding: `${spacing(1)} ${spacing(1.5)}`,
            }}
          >
            X
          </Button>
        </header>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: `${spacing(3)} ${spacing(4)}`,
            color: colors.text,
          }}
        >
          {children}
        </div>
      </aside>
    </div>
  );

  return createPortal(content, container);
}
