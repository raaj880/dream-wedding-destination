
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Add CSP headers that allow eval in development
      'Content-Security-Policy': mode === 'development' 
        ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none';" 
        : "script-src 'self'; object-src 'none';"
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add build configuration to prevent eval usage in production
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Ensure compatibility with development tools
  define: {
    __DEV__: mode === 'development',
  },
}));
