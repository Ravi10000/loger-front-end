import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#pages": "/src/pages",
      "#components": "/src/components",
      "#layouts": "/src/layouts",
      "#assets": "/src/assets",
      "#context": "/src/context",
      "#api": "/src/api",
      "#data": "/src/data",
      "#hooks": "/src/hooks",
      "#utils": "/src/utils",
      "#contexts": "/src/contexts",
      "#redux": "/src/redux",
    },
  },
});
