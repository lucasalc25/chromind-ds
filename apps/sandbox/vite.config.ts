import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    dedupe: ["react", "react-dom", "@chromind/core"],
    alias: {
      "@chromind/core": path.resolve(
        __dirname,
        "../../packages/core/src/index.ts"
      ),
    },
  },
  optimizeDeps: {
    exclude: ["@chromind/core", "@chromind/sales"],
    include: ["react", "react-dom"],
  },
  server: { fs: { allow: ["..", "."] } },
});
