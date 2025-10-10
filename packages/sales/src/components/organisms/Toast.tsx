import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@prisma-ui/core";
import { Button } from "../atoms/Button";
import { hexToRgba } from "../../utils/color";

export type ToastTone = "brand" | "success" | "warning" | "danger";

export type ToastProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  tone?: ToastTone;
  autoDismiss?: number;
  action?: { label: string; onClick: () => void };
};

const ensureContainer = () => {
  let container = document.getElementById("prisma-ui-toast-root");
  if (!container) {
    container = document.createElement("div");
    container.id = "prisma-ui-toast-root";
    container.style.position = "fixed";
    container.style.right = "24px";
    container.style.bottom = "24px";
    container.style.display = "grid";
    container.style.gap = "16px";
    container.style.zIndex = "1001";
    document.body.appendChild(container);
  }
  return container;
};

export function Toast({
  open,
  onClose,
  title,
  description,
  tone = "brand",
  autoDismiss,
  action,
}: ToastProps) {
  const { colors, radii, spacing, typography } = useTheme();

  useEffect(() => {
    if (!open || !autoDismiss) return;
    const timeout = window.setTimeout(onClose, autoDismiss);
    return () => window.clearTimeout(timeout);
  }, [open, autoDismiss, onClose]);

  if (typeof document === "undefined" || !open) {
    return null;
  }

  const palette: Record<ToastTone, string> = {
    brand: colors.brand,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  };

  const accent = palette[tone];
  const container = ensureContainer();

  const content = (
    <div
      role="status"
      aria-live="polite"
      style={{
        minWidth: spacing(64),
        background: colors.background,
        borderRadius: radii.lg,
        border: `1px solid ${hexToRgba(accent, 0.4)}`,
        boxShadow: `0 22px 48px ${hexToRgba(colors.text, 0.2)}`,
        padding: spacing(3),
        display: "grid",
        gap: spacing(2),
        fontFamily: typography.fontFamily,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        aria-hidden
        style={{
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: radii.lg,
          background: hexToRgba(accent, 0.08),
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "grid",
          gap: spacing(1),
          position: "relative",
          zIndex: 1,
        }}
      >
        {title && (
          <strong
            style={{
              color: accent,
              fontSize: 15,
            }}
          >
            {title}
          </strong>
        )}
        {description && (
          <span
            style={{
              color: colors.text,
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            {description}
          </span>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: spacing(2),
          position: "relative",
          zIndex: 1,
        }}
      >
        {action ? (
          <Button
            size="sm"
            tone={tone === "brand" ? "brand" : tone}
            variant="outline"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ) : null}
        <Button
          size="sm"
          variant="ghost"
          tone="neutral"
          aria-label="Fechar aviso"
          onClick={onClose}
          style={{
            minWidth: "auto",
            padding: `${spacing(1)} ${spacing(1.5)}`,
          }}
        >
          Fechar
        </Button>
      </div>
      {autoDismiss && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: 3,
            width: "100%",
            background: hexToRgba(accent, 0.2),
            overflow: "hidden",
          }}
        >
          <span
            style={{
              display: "block",
              height: "100%",
              width: "100%",
              background: accent,
              animation: `toast-progress ${Math.max(autoDismiss, 500)}ms linear forwards`,
            }}
          />
        </span>
      )}
    </div>
  );

  const animationStyle = document.getElementById("prisma-ui-toast-animation");
  if (!animationStyle) {
    const styleElement = document.createElement("style");
    styleElement.id = "prisma-ui-toast-animation";
    styleElement.textContent = `
      @keyframes toast-progress {
        from { transform: scaleX(1); transform-origin: left; }
        to { transform: scaleX(0); transform-origin: left; }
      }
    `;
    document.head.appendChild(styleElement);
  }

  return createPortal(content, container);
}
