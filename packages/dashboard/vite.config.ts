import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 5555,
  },
  publicDir: "public",
  build: {
    minify: "esbuild",
  },
  // root: path.join(__dirname, "./public"),
});
