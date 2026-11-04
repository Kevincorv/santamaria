import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Santa María de Fe Digital',
        short_name: 'Santa María',
        description: 'Guía turística digital de Santa María de Fe, Misiones',
        lang: 'es',
        dir: 'ltr',
        theme_color: '#102D2B',
        background_color: '#F7F4ED',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        scope: '/',
        categories: ['travel', 'tourism', 'education'],
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
        // Limpia los precache de versiones anteriores para evitar respuestas
        // inconsistentes entre deploys.
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        // Precache mínima: los assets con hash de Vite. Las fotografías se
        // cachean bajo demanda (regla /images/) para no pesar en la primera carga.
        globPatterns: ['**/*.{js,css,html,svg}'],
        globIgnores: ['**/images/**', '**/*.png', '**/*.jpg', '**/*.jpeg'],

        // Anula el default de vite-plugin-pwa ("index.html").
        //
        // Si Workbox registra esa NavigationRoute, la resuelve ANTES que las
        // reglas de runtime y sirve siempre el index.html precacheado. Ese HTML
        // queda obsoleto tras cada deploy: referencia chunks con hash que ya no
        // existen y la app se rompe con "Failed to fetch dynamically imported
        // module". Las navegaciones se resuelven con NetworkFirst más abajo,
        // garantizando siempre HTML vigente.
        navigateFallback: undefined,

        runtimeCaching: [
          // 1) Navegaciones: la red primero. El navegador recibe el index.html
          //    actual, que referencia los chunks correctos. La caché solo se usa
          //    si no hay conexión.
          {
            urlPattern: ({ request }: { request: Request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'santamaria-navegaciones',
              networkTimeoutSeconds: 6,
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          // 2) Chunks lazy y assets con hash: revalidación en segundo plano.
          {
            urlPattern: ({ url, sameOrigin }: { url: URL; sameOrigin?: boolean }) =>
              sameOrigin !== false && url.pathname.startsWith('/assets/'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'santamaria-assets',
              expiration: { maxEntries: 140, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          // 3) Fotografías del portal: caché primero para funcionar sin conexión.
          {
            urlPattern: ({ url, sameOrigin }: { url: URL; sameOrigin?: boolean }) =>
              sameOrigin !== false &&
              (url.pathname.startsWith('/images/') || url.pathname.startsWith('/apple-touch-icon')),
            handler: 'CacheFirst',
            options: {
              cacheName: 'santamaria-imagenes',
              expiration: { maxEntries: 160, maxAgeSeconds: 60 * 60 * 24 * 60 },
            },
          },
          // 4) Tiles de OpenStreetMap: caché primero (son estáticos).
          {
            urlPattern: ({ url }: { url: URL }) => url.hostname.endsWith('tile.openstreetmap.org'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'santamaria-mapa-tiles',
              expiration: { maxEntries: 600, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          // 5) Fuentes de Google: caché con revalidación.
          {
            urlPattern: ({ url }: { url: URL }) =>
              url.hostname.endsWith('fonts.googleapis.com') ||
              url.hostname.endsWith('fonts.gstatic.com'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'santamaria-fuentes',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          // NOTA: no hay regla para CDNs externos. Los estilos de Leaflet se
          // empaquetan desde node_modules (src/components/map/map-style.ts);
          // cachear un CDN con peticiones `crossorigin` producía respuestas
          // "opaque" que el service worker no podía reutilizar y rompía el mapa.
        ],
      },
    }),
  ],
})
