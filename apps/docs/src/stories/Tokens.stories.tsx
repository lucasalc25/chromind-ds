import { neutralColors, radii, spacing, typography } from "@chromind/core";

export default { title: "Core/Tokens" };

export const Neutrals = () => (
  <table style={{ borderCollapse: "collapse", minWidth: 480 }}>
    <thead>
      <tr>
        <th style={{ textAlign: "left", padding: 8 }}>Token</th>
        <th style={{ textAlign: "left", padding: 8 }}>Valor</th>
        <th style={{ textAlign: "left", padding: 8 }}>Preview</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(neutralColors).map(([k, v]) => (
        <tr key={k}>
          <td style={{ padding: 8 }}>{k}</td>
          <td style={{ padding: 8 }}>{v}</td>
          <td style={{ padding: 8 }}>
            <div
              style={{
                width: 48,
                height: 24,
                background: v as string,
                border: "1px solid #e5e7eb",
              }}
            />
          </td>
        </tr>
      ))}
      <tr>
        <td style={{ padding: 8 }}>radii</td>
        <td style={{ padding: 8 }}>
          sm={radii.sm} md={radii.md} lg={radii.lg} pill={radii.pill}
        </td>
        <td />
      </tr>
      <tr>
        <td style={{ padding: 8 }}>spacing</td>
        <td style={{ padding: 8 }}>spacing(2) =&gt; {spacing(2)}</td>
        <td />
      </tr>
      <tr>
        <td style={{ padding: 8 }}>typography</td>
        <td style={{ padding: 8 }}>
          fontFamily={typography.fontFamily} | base={typography.fontSizeBase}px
        </td>
        <td />
      </tr>
    </tbody>
  </table>
);
