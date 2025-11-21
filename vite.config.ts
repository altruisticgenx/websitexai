import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      // Core React
      "react", 
      "react-dom",
      // Animation libraries that depend on React
      "framer-motion",
      // Canvas animation libraries
      "uvcanvas",
      // Three.js React wrappers
      "@react-three/fiber",
      "@react-three/drei",
      "three",
      // All Radix UI packages (UI component library)
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-slot",
      "@radix-ui/react-dialog",
      "@radix-ui/react-popover",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tabs",
      "@radix-ui/react-select",
      "@radix-ui/react-scroll-area",
    ],
  },
}));
