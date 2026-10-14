import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The project keeps JSX in .js files (from Create React App),
// so esbuild is told to treat .js in /src as JSX.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  publicDir: "static", // the old CRA /public folder is not used
  esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
  server: { port: 3000, open: true },
});
