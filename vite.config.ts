import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Santa María de Fe Digital',
        short_name: 'Santa María',
        description: 'Guía turística digital de Santa María de Fe, Misiones',
        theme_color: '#102D2B',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/images/logo-pestana-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/images/logo-pestana-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // registerType: 'autoUpdate' ya maneja la actualización correcta:
        // - Precache los assets hasheados por Vite (CSS/JS tienen URLs únicas por hash)
        // - registerType 'autoUpdate' claima el SW nuevo en refresh
        // - Las rutas HTML (React Router) usan el JS precachado, por lo que siempre van al latest
        // - Los tiles de mapa usan CacheFirst con expiración 7 días
        disableDevLogs: import.meta.env.production,
      },
    }),
  ],
})
