import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@prisma-ui/core";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default preview;
