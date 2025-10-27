import { useTheme } from "@chromind/core";

type RatingStarsProps = {
  rating: number;
  size?: number;
  readOnly?: boolean;
  avaliations?: number;
  fontScale?: number;
};

const MAX_STARS = 5;

export function RatingStars({
  rating,
  size = 18,
  readOnly = true,
  avaliations,
  fontScale = 1,
}: RatingStarsProps) {
  const { colors, spacing } = useTheme();

  const clamped = Math.max(0, Math.min(MAX_STARS, rating));
  const rounded = Math.round(clamped);
  const colorOn = colors.brand;
  const colorOff = colors.brand;

  return (
    <div
      aria-label={`Avaliação ${clamped.toFixed(1)} de ${MAX_STARS}${
        avaliations ? ` com ${avaliations} avaliações` : ""
      }`}
      style={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {Array.from({ length: MAX_STARS }).map((_, index) => {
        const isFilled = index < rounded;
        return (
          <span
            key={index}
            aria-hidden
            style={{
              fontSize: size * fontScale,
              lineHeight: fontScale,
              color: isFilled ? colorOn : colorOff,
              transition: "transform 120ms ease",
              cursor: readOnly ? "default" : "pointer",
            }}
          >
            {isFilled ? "★" : "☆"}
          </span>
        );
      })}
      {typeof avaliations === "number" && (
        <span
          style={{
            color: colors.brand,
            fontSize: (size - 4) * fontScale,
            marginLeft: spacing(0.5),
            userSelect: "none",
          }}
          aria-label={`${avaliations} avaliações`}
        >
          ({avaliations})
        </span>
      )}
    </div>
  );
}
