import { createApp } from './app.js'
import { getStore } from './db.js'
import { loadEnv, PORT } from './config.js'

loadEnv()

/**
 * Servidor local (desarrollo / VPS). En Vercel no se usa este archivo:
 * la entrada es api/index.js, que envuelve la misma app en una función
 * serverless.
 */
async function main() {
  const app = await createApp()
  const store = await getStore()
  app.listen(PORT, () => {
    console.log(`[santamaria] API de administración escuchando en http://localhost:${PORT}/api`)
    console.log(`[santamaria] Motor de datos: ${store.driver}`)
  })
}

main().catch(async (error) => {
  console.error('[santamaria] Error al iniciar:', error.message)
  process.exit(1)
})
