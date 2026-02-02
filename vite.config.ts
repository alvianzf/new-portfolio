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
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/, /^\/Alvian_Zachry_CV\.pdf$/]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react', 'latex.js'],
  },
  assetsInclude: ['**/*.keep'],
});
