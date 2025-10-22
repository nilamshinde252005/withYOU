import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist" },
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:8080" } // local dev only
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  }
});
