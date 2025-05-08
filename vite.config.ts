// vite.config.ts
// This file configures how Vite runs and builds your React project

import { defineConfig } from "vite"; // Core Vite config function
import react from "@vitejs/plugin-react-swc"; // Use the React plugin with SWC for faster builds
import path from "path"; // Node.js utility for resolving file paths
import { componentTagger } from "lovable-tagger"; // Optional plugin to tag components (dev-only)

// Export the Vite configuration
export default defineConfig(({ mode }) => ({
  // Local development server settings
  server: {
    host: "::",     // Allow access via local network (IPv6 support)
    port: 8080,     // Server runs at http://localhost:8080
  },

  // Plugins enhance functionality during dev and build
  plugins: [
    react(),        // Enable React JSX/TSX support
    mode === "development" && componentTagger(), // Tag components only in dev mode
  ].filter(Boolean), // Remove any `false` values (like if mode isn't "development")

  // Path aliasing so you can use @/ instead of long relative paths
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // "@/components/..." becomes "./src/components/..."
    },
  },
}));
