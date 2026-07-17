import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apples-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Alvian Zachry Portfolio',
        short_name: 'AlvianZF',
        description: 'Portfolio of Alvian Zachry Faturrahman - Program Manager & Full Stack Engineer',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/, /^\/llms\.txt$/, /^\/Alvian_Zachry_CV\.pdf$/],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        // PGlite's Postgres WASM/data blobs (~16MB) and @dbml/core's chunk (~16MB)
        // exceed the precache cap and are only needed by the database tool —
        // fetch them on demand instead.
        globIgnores: ['**/pglite-*.wasm', '**/pglite-*.data', '**/initdb-*.wasm', '**/dbml-*.js']
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@dbml/core')) return 'dbml';
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react', 'latex.js', '@electric-sql/pglite'],
  },
  assetsInclude: ['**/*.keep'],
});
