import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Recuperación ante chunks obsoletos.
 *
 * Tras un deploy, el navegador puede conservar un HTML o un service worker que
 * referencia archivos con hash ya inexistentes. Vite emite entonces
 * `vite:preloadError` y la aplicación se rompe. Recargamos una sola vez para
 * obtener los assets vigentes; el candado evita un bucle infinito si el error
 * es real y no de caché.
 */
const RELOAD_GUARD_KEY = 'smf:chunk-reload-at'
const RELOAD_WINDOW_MS = 60_000

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()

  let lastReload = 0
  try {
    lastReload = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) || 0)
  } catch {
    /* sessionStorage no disponible: se permite la recarga */
  }

  const now = Date.now()
  if (now - lastReload < RELOAD_WINDOW_MS) return

  try {
    sessionStorage.setItem(RELOAD_GUARD_KEY, String(now))
  } catch {
    /* ignorar */
  }
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
