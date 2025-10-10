import React from "react";
import { useTheme } from "@prisma-ui/core";
import { hexToRgba } from "../../utils/color";

export type CheckoutStepStatus = "complete" | "current" | "upcoming";

export type CheckoutStep = {
  id: string;
  label: string;
  description?: string;
  status: CheckoutStepStatus;
};

export type CheckoutStepsProps = {
  steps: CheckoutStep[];
};

export function CheckoutSteps({ steps }: CheckoutStepsProps) {
  const { colors, spacing, radii, typography } = useTheme();

  return (
    <ol
      style={{
        display: "grid",
        gap: spacing(2),
        listStyle: "none",
        margin: 0,
        padding: 0,
        fontFamily: typography.fontFamily,
      }}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const tone =
          step.status === "complete"
            ? colors.success
            : step.status === "current"
            ? colors.brand
            : colors.border;

        return (
          <li
            key={step.id}
            style={{
              display: "grid",
              gap: spacing(1),
              padding: spacing(2),
              background: hexToRgba(colors.surface, 0.96),
              borderRadius: radii.lg,
              border: `1px solid ${hexToRgba(colors.border, 0.85)}`,
              position: "relative",
            }}
          >
            {!isLast && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: spacing(3),
                  top: "calc(100% - 4px)",
                  width: 2,
                  height: spacing(6),
                  background: hexToRgba(colors.border, 0.6),
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: spacing(1.5),
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: spacing(6),
                  height: spacing(6),
                  borderRadius: "50%",
                  background: hexToRgba(tone, 0.18),
                  color: tone,
                  fontWeight: 600,
                }}
              >
                {index + 1}
              </span>
              <div>
                <strong style={{ color: colors.text }}>{step.label}</strong>
                {step.description && (
                  <p
                    style={{
                      margin: `${spacing(0.5)} 0 0`,
                      color: colors.mutedText,
                      fontSize: 13,
                    }}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
