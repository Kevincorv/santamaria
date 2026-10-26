import { createConnection } from 'mysql2/promise'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv, dbConfig } from './config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
loadEnv()

/**
 * Script de preparación para TiDB Cloud:
 *  1. Conecta al clúster.
 *  2. Lista los esquemas existentes.
 *  3. Crea la base de datos dedicada "santamaria" si no existe (si hay permisos).
 *  4. Deja TIDB_DATABASE apuntando a la base usable.
 *
 * Uso: node setup-db.js
 */
async function main() {
  const cfg = dbConfig()
  if (cfg.driver !== 'tidb') {
    console.log('[setup] DB_DRIVER no es "tidb"; no hay nada que preparar.')
    return
  }

  const tlsOptions = { minVersion: cfg.sslMinVersion }
  if (cfg.caFile) {
    const caPath = path.isAbsolute(cfg.caFile) ? cfg.caFile : path.resolve(process.cwd(), cfg.caFile)
    tlsOptions.ca = fs.readFileSync(caPath)
  }

  console.log(`[setup] Conectando a ${cfg.host}:${cfg.port} como ${cfg.user}…`)

  // Conexión inicial sin esquema para inspeccionar.
  const conn = await createConnection({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    ssl: tlsOptions,
    charset: 'utf8mb4',
  })
  console.log('[setup] Conexión TLS establecida correctamente.')

  const [dbs] = await conn.query('SHOW DATABASES')
  const names = dbs.map((d) => Object.values(d)[0])
  console.log(`[setup] Esquemas visibles: ${names.join(', ')}`)

  const target = cfg.database
  let usable = names.includes(target)

  if (!usable) {
    try {
      await conn.query(`CREATE DATABASE IF NOT EXISTS \`${target}\` DEFAULT CHARACTER SET utf8mb4`)
      console.log(`[setup] Esquema "${target}" creado.`)
      usable = true
    } catch (error) {
      console.warn(`[setup] No se pudo crear "${target}": ${error.message}`)
    }
  }

  if (!usable) {
    const fallback = names.find((n) => ['test', 'sys', 'default'].includes(n)) || null
    if (fallback) {
      console.warn(`[setup] Usando esquema existente "${fallback}" como alternativa.`)
      usable = true
      updateEnvDatabase(fallback)
    }
  }

  if (!usable) {
    throw new Error(
      'No hay ningún esquema usable. Creá un esquema en el panel de TiDB Cloud y ajustá TIDB_DATABASE en server/.env.'
    )
  }

  // Prueba de escritura/lectura en el esquema elegido.
  await conn.changeUser({ database: cfg.database })
  await conn.query('CREATE TABLE IF NOT EXISTS _probe (id INT PRIMARY KEY, note VARCHAR(64))')
  await conn.query('INSERT INTO _probe (id, note) VALUES (1, ?) ON DUPLICATE KEY UPDATE note = VALUES(note)', [
    'ok',
  ])
  const [[probe]] = await conn.query('SELECT note FROM _probe WHERE id = 1')
  await conn.query('DROP TABLE _probe')
  console.log(`[setup] Prueba de escritura/lectura en "${cfg.database}": ${probe.note}`)

  await conn.end()
  console.log('[setup] Listo. Configuración validada contra TiDB Cloud.')
}

function updateEnvDatabase(name) {
  const envPath = path.join(__dirname, '.env')
  const content = fs.readFileSync(envPath, 'utf8')
  const updated = content.replace(/^TIDB_DATABASE=.*$/m, `TIDB_DATABASE=${name}`)
  fs.writeFileSync(envPath, updated)
  process.env.TIDB_DATABASE = name
  console.log(`[setup] .env actualizado: TIDB_DATABASE=${name}`)
}

main().catch((error) => {
  console.error('[setup] Error:', error.message)
  process.exit(1)
})
