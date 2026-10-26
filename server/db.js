import fs from 'node:fs'
import path from 'node:path'
import { dbConfig } from './config.js'

/**
 * Capa de datos del backend.
 *
 * Implementaciones:
 *   - createSqliteStore(): SQLite local con el módulo integrado node:sqlite
 *     (Node.js 22+, sin dependencias nativas). Es la opción por defecto.
 *   - createTidbStore(): TiDB Cloud vía mysql2 (compatible con MySQL).
 *
 * Ambas exponen la misma interfaz asíncrona, por lo que el resto del servidor
 * no depende del motor elegido.
 */

export const CONTENT_TYPES = [
  'places',
  'accommodations',
  'restaurants',
  'celebrations',
  'crafts',
  'experiences',
  'tours',
]

const SQLITE_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  username   TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS content (
  type       TEXT NOT NULL,
  id         TEXT NOT NULL,
  data       TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_by TEXT,
  PRIMARY KEY (type, id)
);
`

const MYSQL_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(190) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token      VARCHAR(128) PRIMARY KEY,
    username   VARCHAR(190) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    INDEX idx_sessions_expires (expires_at)
  )`,
  `CREATE TABLE IF NOT EXISTS content (
    type       VARCHAR(64)  NOT NULL,
    id         VARCHAR(190) NOT NULL,
    data       MEDIUMTEXT   NOT NULL,
    updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by VARCHAR(190),
    PRIMARY KEY (type, id)
  )`,
]

/* ------------------------------------------------------------------ */
/* SQLite (node:sqlite)                                               */
/* ------------------------------------------------------------------ */

function createSqliteStore(cfg, DatabaseSync) {
  const dir = path.dirname(cfg.file)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  const db = new DatabaseSync(cfg.file)
  db.exec('PRAGMA journal_mode = WAL;')
  db.exec(SQLITE_SCHEMA)

  const isoNow = () => new Date().toISOString().replace('T', ' ').slice(0, 19)

  return {
    driver: 'sqlite',
    async health() {
      db.prepare('SELECT 1').get()
      return { ok: true }
    },

    async getUser(username) {
      return db.prepare('SELECT * FROM users WHERE username = ?').get(username) || null
    },
    async countUsers() {
      return db.prepare('SELECT COUNT(*) AS n FROM users').get().n
    },
    async createUser(username, passwordHash) {
      db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, passwordHash)
    },
    async updateUserPassword(username, passwordHash) {
      db.prepare('UPDATE users SET password_hash = ? WHERE username = ?').run(passwordHash, username)
    },

    async createSession(token, username, expiresAt) {
      db.prepare('INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)').run(
        token,
        username,
        expiresAt
      )
    },
    async getSession(token) {
      return db.prepare('SELECT * FROM sessions WHERE token = ?').get(token) || null
    },
    async deleteSession(token) {
      db.prepare('DELETE FROM sessions WHERE token = ?').run(token)
    },
    async deleteExpiredSessions() {
      db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(isoNow())
    },

    async listContent(type) {
      const rows = db.prepare('SELECT * FROM content WHERE type = ? ORDER BY updated_at DESC').all(type)
      return rows.map((row) => ({
        id: row.id,
        data: JSON.parse(row.data),
        updatedAt: row.updated_at,
        updatedBy: row.updated_by,
      }))
    },
    async saveContent(type, id, data, updatedBy) {
      db.prepare(
        `INSERT INTO content (type, id, data, updated_at, updated_by)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(type, id) DO UPDATE SET
           data = excluded.data, updated_at = excluded.updated_at, updated_by = excluded.updated_by`
      ).run(type, id, JSON.stringify(data), isoNow(), updatedBy)
    },
    async deleteContent(type, id) {
      db.prepare('DELETE FROM content WHERE type = ? AND id = ?').run(type, id)
    },
    async exportAll() {
      const out = {}
      for (const type of CONTENT_TYPES) {
        const rows = db.prepare('SELECT id, data FROM content WHERE type = ?').all(type)
        out[type] = rows.map((r) => JSON.parse(r.data))
      }
      return out
    },
    async close() {
      db.close()
    },
  }
}

/* ------------------------------------------------------------------ */
/* TiDB Cloud (mysql2)                                                 */
/* ------------------------------------------------------------------ */

async function createTidbStore(cfg) {
  const { createPool } = await import('mysql2/promise')
  const tlsOptions = { minVersion: cfg.sslMinVersion }
  if (cfg.caFile) {
    const caPath = path.isAbsolute(cfg.caFile) ? cfg.caFile : path.resolve(process.cwd(), cfg.caFile)
    tlsOptions.ca = fs.readFileSync(caPath)
  }

  const pool = createPool({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database,
    waitForConnections: true,
    connectionLimit: 5,
    ssl: tlsOptions,
    charset: 'utf8mb4',
  })

  for (const stmt of MYSQL_SCHEMA) {
    await pool.query(stmt)
  }

  const isoNow = () => new Date().toISOString().slice(0, 19).replace('T', ' ')

  return {
    driver: 'tidb',
    async health() {
      await pool.query('SELECT 1')
      return { ok: true }
    },

    async getUser(username) {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
      return rows[0] || null
    },
    async countUsers() {
      const [rows] = await pool.query('SELECT COUNT(*) AS n FROM users')
      return Number(rows[0].n)
    },
    async createUser(username, passwordHash) {
      await pool.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash])
    },
    async updateUserPassword(username, passwordHash) {
      await pool.query('UPDATE users SET password_hash = ? WHERE username = ?', [passwordHash, username])
    },

    async createSession(token, username, expiresAt) {
      await pool.query('INSERT INTO sessions (token, username, expires_at) VALUES (?, ?, ?)', [
        token,
        username,
        expiresAt,
      ])
    },
    async getSession(token) {
      const [rows] = await pool.query('SELECT * FROM sessions WHERE token = ?', [token])
      return rows[0] || null
    },
    async deleteSession(token) {
      await pool.query('DELETE FROM sessions WHERE token = ?', [token])
    },
    async deleteExpiredSessions() {
      await pool.query('DELETE FROM sessions WHERE expires_at < ?', [isoNow()])
    },

    async listContent(type) {
      const [rows] = await pool.query(
        'SELECT id, data, updated_at, updated_by FROM content WHERE type = ? ORDER BY updated_at DESC',
        [type]
      )
      return rows.map((row) => ({
        id: row.id,
        data: JSON.parse(row.data),
        updatedAt: row.updated_at,
        updatedBy: row.updated_by,
      }))
    },
    async saveContent(type, id, data, updatedBy) {
      await pool.query(
        `INSERT INTO content (type, id, data, updated_at, updated_by)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = VALUES(updated_at), updated_by = VALUES(updated_by)`,
        [type, id, JSON.stringify(data), isoNow(), updatedBy]
      )
    },
    async deleteContent(type, id) {
      await pool.query('DELETE FROM content WHERE type = ? AND id = ?', [type, id])
    },
    async exportAll() {
      const out = {}
      for (const type of CONTENT_TYPES) {
        const [rows] = await pool.query('SELECT id, data FROM content WHERE type = ?', [type])
        out[type] = rows.map((r) => JSON.parse(r.data))
      }
      return out
    },
    async close() {
      await pool.end()
    },
  }
}

/* ------------------------------------------------------------------ */

let storePromise = null

/** Inicializa (una sola vez) y devuelve el almacén de datos configurado. */
export function getStore() {
  if (!storePromise) {
    const cfg = dbConfig()
    if (cfg.driver === 'tidb') {
      storePromise = createTidbStore(cfg)
    } else {
      // node:sqlite es experimental y solo existe en Node 22+ local; se carga
      // perezosamente para no romper el despliegue serverless (TiDB).
      storePromise = import('node:sqlite').then(({ DatabaseSync }) =>
        createSqliteStore(cfg, DatabaseSync)
      )
    }
  }
  return storePromise
}
