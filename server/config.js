import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Carga variables de entorno desde server/.env sin dependencias externas. */
export function loadEnv() {
  const envPath = path.join(__dirname, '.env')
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

/**
 * Configuración de la base de datos.
 *
 * DB_DRIVER:
 *   - 'sqlite' (por defecto): base de datos local en server/data/santamaria.sqlite
 *     usando el módulo integrado node:sqlite de Node.js 22+. Sin dependencias nativas.
 *   - 'tidb': TiDB Cloud (compatible con MySQL) usando mysql2. Requiere las
 *     variables TIDB_HOST, TIDB_USER, TIDB_PASSWORD y TIDB_DATABASE.
 */
export function dbConfig() {
  const driver = (process.env.DB_DRIVER || 'sqlite').toLowerCase()
  if (driver === 'tidb') {
    const required = ['TIDB_HOST', 'TIDB_USER', 'TIDB_PASSWORD', 'TIDB_DATABASE']
    const missing = required.filter((k) => !process.env[k])
    if (missing.length) {
      throw new Error(
        `DB_DRIVER=tidb requiere definir: ${missing.join(', ')}. Copiá server/.env.example a server/.env y completalo.`
      )
    }
    return {
      driver: 'tidb',
      host: process.env.TIDB_HOST,
      port: Number(process.env.TIDB_PORT || 4000),
      user: process.env.TIDB_USER,
      password: process.env.TIDB_PASSWORD,
      database: process.env.TIDB_DATABASE,
      // TiDB Cloud entrega un certificado raíz; si TIDB_CA_FILE no está definido,
      // se usa el TLS del propio sistema con verificación del servidor.
      caFile: process.env.TIDB_CA_FILE || '',
      sslMinVersion: 'TLSv1.2',
    }
  }
  return {
    driver: 'sqlite',
    file: process.env.SQLITE_FILE || path.join(__dirname, 'data', 'santamaria.sqlite'),
  }
}

export const PORT = Number(process.env.PORT || 4000)
export const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'http://localhost:5173'
export const SESSION_HOURS = Number(process.env.SESSION_HOURS || 8)
