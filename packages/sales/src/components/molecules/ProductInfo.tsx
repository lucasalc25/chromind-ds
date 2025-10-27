import { useTheme } from "@chromind/core";
import { Text } from "@chromind/core";

type ProductInfoProps = {
  name: string;
  description?: String[];
};

export function ProductInfo({ name, description }: ProductInfoProps) {
  const { spacing, colors } = useTheme();

  return (
    <div style={{ display: "grid", gap: spacing(8) }}>
      <div>
        <Text
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            lineHeight: "1.4rem",
          }}
        >
          {name}
        </Text>
      </div>
      {description && (
        <div>
          <Text
            style={{
              fontSize: "0.9rem",
              color: colors.brand,
              fontWeight: "bold",
            }}
          >
            SOBRE O PRODUTO
          </Text>

          <ul
            style={{
              marginTop: spacing(3),
              paddingLeft: spacing(6),
              color: colors.text,
            }}
          >
            {Array.isArray(description) ? (
              description.map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: spacing(0.5),
                    lineHeight: 1.5,
                    listStyleType: "disc",
                  }}
                >
                  {item}
                </li>
              ))
            ) : (
              <li
                style={{
                  lineHeight: 1.5,
                  listStyleType: "disc",
                }}
              >
                {description}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
