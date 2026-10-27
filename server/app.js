import express from 'express'
import { getStore, CONTENT_TYPES } from './db.js'
import { hashPassword, verifyPassword, newSessionToken, passwordPolicy } from './auth.js'
import { loadEnv, ADMIN_ORIGIN, SESSION_HOURS } from './config.js'

loadEnv()

/**
 * Construye la aplicación Express (API de administración).
 * Se usa tanto por el servidor local (server/index.js → app.listen) como por
 * la función serverless de Vercel (api/index.js). Devuelve una promesa porque
 * la capa de datos (SQLite/TiDB) se inicializa de forma perezosa.
 */
export async function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '4mb' }))

  /* CORS: permite el panel administrativo y el servidor de Vite en desarrollo. */
  const allowedOrigins = new Set(
    (process.env.ADMIN_ORIGINS || `${ADMIN_ORIGIN},http://localhost:5173,http://127.0.0.1:5173`)
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean)
  )

  app.use((req, res, next) => {
    const origin = req.headers.origin
    if (origin && allowedOrigins.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Vary', 'Origin')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    if (req.method === 'OPTIONS') return res.status(204).end()
    next()
  })

  const respond = (res, status, payload) => res.status(status).json(payload)

  /* --------------------------- Autenticación --------------------------- */

  async function requireAuth(req, res, next) {
    const header = req.headers.authorization || ''
    const match = header.match(/^Bearer\s+(\S+)$/i)
    if (!match) return respond(res, 401, { ok: false, error: 'authentication_required' })

    const store = await getStore()
    const session = await store.getSession(match[1])
    if (!session || new Date(session.expires_at + 'Z') < new Date()) {
      if (session) await store.deleteSession(match[1])
      return respond(res, 401, { ok: false, error: 'session_expired' })
    }
    req.user = session.username
    req.token = match[1]
    next()
  }

  /* ------------------------------ Rutas API ------------------------------ */

  app.get('/api/health', async (_req, res) => {
    try {
      const store = await getStore()
      await store.health()
      const userCount = await store.countUsers()
      respond(res, 200, {
        ok: true,
        service: 'santamaria-admin-api',
        version: '1.0.0',
        driver: store.driver,
        users: userCount,
      })
    } catch (error) {
      respond(res, 500, { ok: false, error: 'db_error', detail: error.message })
    }
  })

  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body || {}
    if (!username || !password) {
      return respond(res, 400, { ok: false, error: 'missing_credentials' })
    }
    const store = await getStore()
    const user = await store.getUser(String(username).trim())
    if (!user || !verifyPassword(String(password), user.password_hash)) {
      // Retardo contra fuerza bruta
      await new Promise((r) => setTimeout(r, 400))
      return respond(res, 401, { ok: false, error: 'invalid_credentials' })
    }
    const token = newSessionToken()
    const expiresAt = new Date(Date.now() + SESSION_HOURS * 3600 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
    await store.createSession(token, user.username, expiresAt)
    respond(res, 200, { ok: true, token, username: user.username, expiresAt })
  })

  app.post('/api/auth/logout', requireAuth, async (req, res) => {
    const store = await getStore()
    await store.deleteSession(req.token)
    respond(res, 200, { ok: true })
  })

  /* ------------------------------ Contenido ------------------------------ */

  /*
   * Registro público de prestadores. Guarda la solicitud en la tabla content
   * con estado "pending" para que el equipo la revise en el panel de admin.
   * No publica nada automáticamente.
   */
  const requestLog = new Map()

  app.post('/api/provider-requests', async (req, res) => {
    const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
      .toString()
      .split(',')[0]
      .trim()
    const now = Date.now()
    const recent = (requestLog.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000)
    if (recent.length >= 5) {
      return respond(res, 429, { ok: false, error: 'too_many_requests' })
    }

    const body = req.body || {}
    const clean = (value, max) => String(value ?? '').trim().slice(0, max)
    const data = {
      businessName: clean(body.businessName, 120),
      businessType: clean(body.businessType, 60),
      ownerName: clean(body.ownerName, 120),
      phone: clean(body.phone, 40),
      email: clean(body.email, 160),
      address: clean(body.address, 200),
      description: clean(body.description, 1200),
      website: clean(body.website, 200),
      status: 'pending',
      submittedAt: new Date().toISOString(),
    }

    if (
      !data.businessName ||
      !data.businessType ||
      !data.ownerName ||
      !data.phone ||
      !data.address ||
      data.description.length < 40
    ) {
      return respond(res, 400, { ok: false, error: 'missing_fields' })
    }
    if (body.authorization !== true) {
      return respond(res, 400, { ok: false, error: 'authorization_required' })
    }

    const id = `sol-${now}-${Math.random().toString(36).slice(2, 8)}`
    const store = await getStore()
    await store.saveContent('provider_requests', id, data, 'public-web')

    requestLog.set(ip, [...recent, now])
    respond(res, 201, { ok: true, id, status: 'pending' })
  })

  app.get('/api/content/:type', requireAuth, async (req, res) => {
    const { type } = req.params
    if (!CONTENT_TYPES.includes(type)) {
      return respond(res, 400, { ok: false, error: 'invalid_type', allowed: CONTENT_TYPES })
    }
    const store = await getStore()
    const items = await store.listContent(type)
    respond(res, 200, { ok: true, type, items })
  })

  app.post('/api/content/:type', requireAuth, async (req, res) => {
    const { type } = req.params
    if (!CONTENT_TYPES.includes(type)) {
      return respond(res, 400, { ok: false, error: 'invalid_type', allowed: CONTENT_TYPES })
    }
    const data = req.body?.data
    if (!data || typeof data !== 'object' || !data.id) {
      return respond(res, 400, { ok: false, error: 'data_with_id_required' })
    }
    const store = await getStore()
    await store.saveContent(type, String(data.id), data, req.user)
    respond(res, 200, { ok: true, id: data.id, type })
  })

  app.post('/api/content/:type/delete', requireAuth, async (req, res) => {
    const { type } = req.params
    const id = req.body?.id
    if (!CONTENT_TYPES.includes(type) || !id) {
      return respond(res, 400, { ok: false, error: 'invalid_params' })
    }
    const store = await getStore()
    await store.deleteContent(type, String(id))
    respond(res, 200, { ok: true, deleted: id, by: req.user })
  })

  app.get('/api/export', requireAuth, async (_req, res) => {
    const store = await getStore()
    const content = await store.exportAll()
    respond(res, 200, { ok: true, exportedAt: new Date().toISOString(), content })
  })

  /* --------------------- Usuario inicial (si hace falta) --------------------- */

  const store = await getStore()
  await store.deleteExpiredSessions()
  const userCount = await store.countUsers()
  if (userCount === 0) {
    const username = process.env.ADMIN_USER || 'admin'
    const password = process.env.ADMIN_INITIAL_PASSWORD
    if (password) {
      const policyError = passwordPolicy(password)
      if (policyError) throw new Error(policyError)
      await store.createUser(username, hashPassword(password))
      console.log(`[santamaria] Usuario inicial "${username}" creado desde ADMIN_INITIAL_PASSWORD.`)
    } else {
      console.log('[santamaria] Aún no hay usuarios. Creá uno con: npm run create-user')
    }
  }

  return app
}
