import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    dedupe: ["react", "react-dom", "@prisma-ui/core"],
    alias: {
      "@prisma-ui/core": path.resolve(
        __dirname,
        "../../packages/core/src/index.ts"
      ),
    },
  },
  optimizeDeps: {
    exclude: ["@prisma-ui/core", "@prisma-ui/sales"],
    include: ["react", "react-dom"],
  },
  server: { fs: { allow: ["..", "."] } },
});
