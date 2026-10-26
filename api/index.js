import { createApp } from '../server/app.js'

/**
 * Función serverless de Vercel para la API de administración.
 * Reutiliza la MISMA app Express que usa el servidor local (server/index.js),
 * por lo que no hay lógica duplicada. Conecta a TiDB Cloud usando las
 * variables de entorno definidas en el proyecto de Vercel (TIDB_*).
 */

let appInstance = null
let appPromise = null

async function getApp() {
  if (!appInstance) {
    if (!appPromise) appPromise = createApp()
    appInstance = await appPromise
  }
  return appInstance
}

export default async function handler(req, res) {
  const app = await getApp()

  // Vercel preserva la URL original en req.url (p. ej. /api/health), pero nos
  // aseguramos de que siempre tenga el prefijo /api para que Express enrute
  // correctamente aunque el runtime entregue solo el tramo posterior.
  if (typeof req.url === 'string' && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? '' : '/') + req.url
  }

  return app(req, res)
}
