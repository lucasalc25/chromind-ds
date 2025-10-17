import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme, hexToRgba, transition } from "@prisma-ui/core";
import { Button } from "../atoms/Button";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const ensureContainer = () => {
  let container = document.getElementById("prisma-ui-modal-root");
  if (!container) {
    container = document.createElement("div");
    container.id = "prisma-ui-modal-root";
    document.body.appendChild(container);
  }
  return container;
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  const { colors, radii, spacing, typography } = useTheme();

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

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        fontFamily: typography.fontFamily,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: hexToRgba(colors.text, 0.55),
          backdropFilter: "blur(12px)",
          opacity: 1,
          transition: transition(["opacity"]),
        }}
      />
      <div
        style={{
          position: "relative",
          background: colors.background,
          borderRadius: radii.lg,
          border: `1px solid ${hexToRgba(colors.border, 0.9)}`,
          minWidth: spacing(80),
          maxWidth: "min(640px, 92vw)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: `0 40px 60px ${hexToRgba(colors.text, 0.12)}`,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: `${spacing(3)} ${spacing(4)} ${spacing(2.5)}`,
            borderBottom: `1px solid ${hexToRgba(colors.border, 0.8)}`,
            gap: spacing(2),
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: colors.text,
            }}
          >
            {title}
          </h2>
          <Button
            aria-label="Fechar modal"
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
            padding: `${spacing(3)} ${spacing(4)}`,
            overflowY: "auto",
            color: colors.text,
          }}
        >
          {children}
        </div>
        {footer && (
          <footer
            style={{
              padding: `${spacing(3)} ${spacing(4)}`,
              borderTop: `1px solid ${hexToRgba(colors.border, 0.8)}`,
              background: hexToRgba(colors.surface, 0.96),
            }}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>
  );

  return createPortal(content, container);
}
