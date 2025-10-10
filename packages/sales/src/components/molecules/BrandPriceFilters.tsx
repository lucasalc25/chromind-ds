import React from "react";
import { useTheme } from "@prisma-ui/core";
import { spacing, typography } from "@prisma-ui/core";

type Props = {
  brands: string[];
  selectedBrands: string[];
  onChangeBrands: (brands: string[]) => void;

  minLimit: number;
  maxLimit: number;
  value: [number, number];
  onChangeValue: (range: [number, number]) => void;

  onClear?: () => void;
};

export const BrandPriceFilters: React.FC<Props> = ({
  brands,
  selectedBrands,
  onChangeBrands,
  minLimit,
  maxLimit,
  value,
  onChangeValue,
  onClear,
}) => {
  const { colors } = useTheme();
  const [min, max] = value;

  // slider handlers
  const onMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), max - 1);
    onChangeValue([newMin, max]);
  };
  const onMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), min + 1);
    onChangeValue([min, newMax]);
  };

  const percent = React.useMemo(() => {
    const range = maxLimit - minLimit || 1;
    const left = ((min - minLimit) / range) * 100;
    const right = ((max - minLimit) / range) * 100;
    return { left, right };
  }, [min, max, minLimit, maxLimit]);

  const toggleBrand = (b: string) => {
    onChangeBrands(
      selectedBrands.includes(b)
        ? selectedBrands.filter((x) => x !== b)
        : [...selectedBrands, b]
    );
  };

  return (
    <div
      style={{
        padding: spacing(3),
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        fontFamily: typography.fontFamily,
        display: "grid",
        gap: spacing(4),
      }}
    >
      <style>{`
        .range-wrap { position: relative; height: 44px; }
        .range {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 4px; background: transparent; position: absolute; top: 20px; pointer-events: none;
        }
        .range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--thumb-bg); border: 2px solid var(--thumb-border);
          pointer-events: all;
        }
        .range::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--thumb-bg); border: 2px solid var(--thumb-border);
          pointer-events: all;
        }
        .track {
          position: absolute; top: 20px; left: 0; right: 0; height: 4px;
          border-radius: 999px; background: var(--track-bg);
        }
        .track-fill {
          position: absolute; top: 20px; height: 4px;
          border-radius: 999px; background: var(--track-fill);
          left: var(--left, 0%); right: calc(100% - var(--right, 100%));
        }
      `}</style>

      {/* MARCA */}
      <section>
        <h4 style={{ margin: 0, fontSize: 14, color: colors.mutedText }}>
          Marca
        </h4>
        <div
          style={{
            marginTop: spacing(2),
            display: "grid",
            gap: spacing(1),
            maxHeight: 240,
            overflow: "auto",
          }}
        >
          {brands.map((b) => (
            <label
              key={b}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
              />
              <span style={{ fontSize: 14, color: colors.text }}>{b}</span>
            </label>
          ))}
        </div>
      </section>

      {/* PREÇO */}
      <section>
        <h4 style={{ margin: 0, fontSize: 14, color: colors.mutedText }}>
          Preço
        </h4>

        <div
          className="range-wrap"
          style={
            {
              "--track-bg": colors.surface,
              "--track-fill": colors.brand,
              "--thumb-bg": colors.background,
              "--thumb-border": colors.brand,
              "--left": `${percent.left}%`,
              "--right": `${percent.right}%`,
            } as React.CSSProperties
          }
        >
          <div className="track" />
          <div className="track-fill" />
          <input
            aria-label="Preço mínimo"
            className="range"
            type="range"
            min={minLimit}
            max={maxLimit}
            step="1"
            value={min}
            onChange={onMinChange}
            style={{ zIndex: 2 }}
          />
          <input
            aria-label="Preço máximo"
            className="range"
            type="range"
            min={minLimit}
            max={maxLimit}
            step="1"
            value={max}
            onChange={onMaxChange}
            style={{ zIndex: 1 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: spacing(2),
            color: colors.text,
            fontSize: 14,
          }}
        >
          <span>{`R$ ${min.toFixed(2)}`}</span>
          <span>{`R$ ${max.toFixed(2)}`}</span>
        </div>
      </section>

      <button
        type="button"
        onClick={onClear}
        style={{
          marginTop: spacing(1),
          padding: "8px 12px",
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          background: "transparent",
          color: colors.text,
          cursor: "pointer",
        }}
      >
        Limpar filtros
      </button>
    </div>
  );
};
