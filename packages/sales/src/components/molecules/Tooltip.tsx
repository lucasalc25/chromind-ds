import React, { useRef, useState } from "react";
import { useTheme, hexToRgba, transition } from "@prisma-ui/core";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  children: React.ReactElement;
  delay?: number;
};

export function Tooltip({
  content,
  placement = "top",
  children,
  delay = 100,
}: TooltipProps) {
  const { colors, radii, spacing, typography } = useTheme();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number>();

  const show = () => {
    timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    window.clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const getPositionStyle = () => {
    const offset = spacing(2);
    const base = {
      position: "absolute" as const,
      whiteSpace: "nowrap" as const,
    };
    switch (placement) {
      case "bottom":
        return {
          ...base,
          top: `calc(100% + ${offset})`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          ...base,
          right: `calc(100% + ${offset})`,
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          ...base,
          left: `calc(100% + ${offset})`,
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "top":
      default:
        return {
          ...base,
          bottom: `calc(100% + ${offset})`,
          left: "50%",
          transform: "translateX(-50%)",
        };
    }
  };

  const positionStyle = getPositionStyle();
  const baseTransform = positionStyle.transform ?? "translate3d(0,0,0)";
  const hiddenOffset =
    placement === "top"
      ? "translateY(4px)"
      : placement === "bottom"
      ? "translateY(-4px)"
      : placement === "left"
      ? "translateX(4px)"
      : "translateX(-4px)";

  return (
    <span
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      style={{ position: "relative", display: "inline-flex" }}
    >
      {React.cloneElement(children, {
        onFocus: (event: React.FocusEvent<unknown>) => {
          children.props.onFocus?.(event);
          show();
        },
        onBlur: (event: React.FocusEvent<unknown>) => {
          children.props.onBlur?.(event);
          hide();
        },
        onMouseEnter: (event: React.MouseEvent<unknown>) => {
          children.props.onMouseEnter?.(event);
          show();
        },
        onMouseLeave: (event: React.MouseEvent<unknown>) => {
          children.props.onMouseLeave?.(event);
          hide();
        },
      })}
      <span
        role="tooltip"
        style={{
          ...positionStyle,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transform: visible
            ? baseTransform
            : `${baseTransform} ${hiddenOffset}`,
          padding: `${spacing(1)} ${spacing(1.5)}`,
          borderRadius: radii.sm,
          background: hexToRgba(colors.text, 0.92),
          color: colors.background,
          fontSize: 12,
          fontFamily: typography.fontFamily,
          transition: transition(["opacity", "transform"]),
          boxShadow: `0 10px 30px ${hexToRgba(colors.text, 0.18)}`,
          zIndex: 20,
        }}
      >
        {content}
      </span>
    </span>
  );
}
