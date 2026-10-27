import React, { useEffect, useState, useCallback } from 'react'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { useSeo } from '../hooks/use-seo'
import {
  LogIn,
  LogOut,
  Database,
  Server,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Save,
  Trash2,
  FilePlus2,
  RefreshCw,
  Eye,
} from 'lucide-react'

/**
 * Panel de administración conectado al backend Node.js real (server/).
 * No simula autenticación ni persistencia: si la API no responde, se
 * muestran las instrucciones de configuración en lugar de un login falso.
 */

const API_BASE = (
  (import.meta.env.VITE_API_URL as string | undefined) ||
  (import.meta.env.DEV ? 'http://localhost:4000/api' : '/api')
).replace(/\/$/, '')

const TYPES = [
  { key: 'places', label: 'Lugares' },
  { key: 'accommodations', label: 'Alojamientos' },
  { key: 'restaurants', label: 'Gastronomía' },
  { key: 'celebrations', label: 'Celebraciones' },
  { key: 'crafts', label: 'Artesanías' },
  { key: 'experiences', label: 'Experiencias' },
  { key: 'tours', label: 'Recorridos' },
  { key: 'provider_requests', label: 'Solicitudes de prestadores' },
] as const

type TypeKey = (typeof TYPES)[number]['key']

interface ContentItem {
  id: string
  data: Record<string, unknown>
  updatedAt?: string
  updatedBy?: string
}

interface HealthInfo {
  ok: boolean
  driver?: string
  users?: number
  version?: string
  error?: string
}

const TOKEN_KEY = 'santamaria-admin-token'

export const AdminPage: React.FC = () => {
  useSeo({
    title: 'Panel de administración',
    description: 'Gestión de contenidos del portal turístico de Santa María de Fe.',
    path: '/admin',
  })

  const [health, setHealth] = useState<HealthInfo | null>(null)
  const [checking, setChecking] = useState(true)
  const [token, setToken] = useState<string>(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const [activeType, setActiveType] = useState<TypeKey>('places')
  const [items, setItems] = useState<ContentItem[]>([])
  const [loadingList, setLoadingList] = useState(false)
  const [listError, setListError] = useState('')

  const [editorOpen, setEditorOpen] = useState(false)
  const [editorId, setEditorId] = useState('')
  const [editorJson, setEditorJson] = useState('')
  const [editorError, setEditorError] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const checkHealth = useCallback(async () => {
    setChecking(true)
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(6000) })
      const data = await res.json()
      setHealth(data)
    } catch {
      setHealth({ ok: false, error: 'unreachable' })
    } finally {
      setChecking(false)
    }
  }, [])

  useEffect(() => {
    checkHealth()
  }, [checkHealth])

  const authHeaders = useCallback(
    () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
    [token]
  )

  const loadItems = useCallback(
    async (type: TypeKey) => {
      setLoadingList(true)
      setListError('')
      try {
        const res = await fetch(`${API_BASE}/content/${type}`, { headers: authHeaders() })
        if (res.status === 401) {
          setToken('')
          sessionStorage.removeItem(TOKEN_KEY)
          setListError('La sesión expiró. Ingresá nuevamente.')
          return
        }
        const data = await res.json()
        if (data.ok) setItems(data.items)
        else setListError(data.error || 'No se pudo cargar el contenido.')
      } catch {
        setListError('No se pudo conectar con el servidor.')
      } finally {
        setLoadingList(false)
      }
    },
    [API_BASE, authHeaders]
  )

  useEffect(() => {
    if (token) loadItems(activeType)
  }, [token, activeType, loadItems])

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoggingIn(true)
    setLoginError('')
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.ok && data.token) {
        setToken(data.token)
        sessionStorage.setItem(TOKEN_KEY, data.token)
        setPassword('')
        setMessage(`Sesión iniciada como ${data.username}.`)
      } else {
        setLoginError(data.error === 'invalid_credentials' ? 'Usuario o contraseña incorrectos.' : 'Error al iniciar sesión.')
      }
    } catch {
      setLoginError('No se pudo conectar con el servidor.')
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', headers: authHeaders() })
    } catch {
      /* se limpia igualmente el estado local */
    }
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setItems([])
    setMessage('Sesión cerrada.')
  }

  const openNew = () => {
    setEditorId('')
    setEditorJson(JSON.stringify({ id: '', name: '' }, null, 2))
    setEditorError('')
    setEditorOpen(true)
  }

  const openEdit = (item: ContentItem) => {
    setEditorId(item.id)
    setEditorJson(JSON.stringify(item.data, null, 2))
    setEditorError('')
    setEditorOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    setEditorError('')
    try {
      const data = JSON.parse(editorJson)
      if (!data.id) {
        setEditorError('El JSON debe incluir un campo "id".')
        return
      }
      const res = await fetch(`${API_BASE}/content/${activeType}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ data }),
      })
      const body = await res.json()
      if (body.ok) {
        setMessage(`Guardado: ${data.id}`)
        setEditorOpen(false)
        loadItems(activeType)
      } else {
        setEditorError(body.error || 'No se pudo guardar.')
      }
    } catch (error) {
      setEditorError(`JSON inválido: ${(error as Error).message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm(`¿Eliminar "${id}" de ${activeType}? Esta acción no se puede deshacer.`)) return
    try {
      const res = await fetch(`${API_BASE}/content/${activeType}/delete`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ id }),
      })
      const body = await res.json()
      if (body.ok) {
        setMessage(`Eliminado: ${id}`)
        loadItems(activeType)
      } else {
        setListError(body.error || 'No se pudo eliminar.')
      }
    } catch {
      setListError('No se pudo conectar con el servidor.')
    }
  }

  /* ------------------------------ Vistas ------------------------------ */

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-[#28685A] animate-spin" aria-hidden="true" />
          <p className="text-sm text-gray-600">Verificando conexión con el servidor…</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!health?.ok) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex flex-col font-sans">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-14 w-full">
          <div className="bg-white rounded-2xl border border-[#E5E3DC] p-8">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-7 h-7 text-amber-500" aria-hidden="true" />
              <h1 className="font-serif text-2xl font-bold text-[#102D2B]">Servidor no disponible</h1>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              El backend de administración no está respondiendo en <code className="font-mono text-xs bg-[#F7F4ED] px-1.5 py-0.5 rounded">{API_BASE}</code>.
              Este portal <strong>no simula</strong> un login ni una base de datos: hasta que el servidor real
              no esté en marcha, el panel queda inactivo.
            </p>

            <h2 className="font-serif text-lg font-bold text-[#102D2B] mt-6 mb-2">Cómo levantarlo</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>
                Abrí una terminal en la carpeta <code className="font-mono text-xs bg-[#F7F4ED] px-1.5 py-0.5 rounded">server/</code> del proyecto.
              </li>
              <li>
                Instalá las dependencias: <code className="font-mono text-xs bg-[#F7F4ED] px-1.5 py-0.5 rounded">npm install</code>
              </li>
              <li>
                Copiá la configuración:{' '}
                <code className="font-mono text-xs bg-[#F7F4ED] px-1.5 py-0.5 rounded">cp .env.example .env</code> y completala
                (SQLite local por defecto, o TiDB Cloud).
              </li>
              <li>
                Creá el usuario administrador:{' '}
                <code className="font-mono text-xs bg-[#F7F4ED] px-1.5 py-0.5 rounded">npm run create-user</code>
              </li>
              <li>
                Iniciá el servidor:{' '}
                <code className="font-mono text-xs bg-[#F7F4ED] px-1.5 py-0.5 rounded">npm start</code>
              </li>
            </ol>

            <p className="text-xs text-gray-500 mt-5">
              Si la API corre en otro puerto o dominio, definí la variable de entorno{' '}
              <code className="font-mono">VITE_API_URL</code> al construir el frontend. Detalles completos en{' '}
              <code className="font-mono">server/README.md</code>.
            </p>

            <button
              onClick={checkHealth}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Reintentar conexión
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex flex-col font-sans">
        <Header />
        <main className="flex-1 max-w-md mx-auto px-4 py-14 w-full">
          <div className="bg-white rounded-2xl border border-[#E5E3DC] p-8">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-6 h-6 text-[#28685A]" aria-hidden="true" />
              <h1 className="font-serif text-2xl font-bold text-[#102D2B]">Administración</h1>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Backend activo · motor de datos: <strong>{health.driver}</strong>
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-user" className="block text-sm font-medium text-gray-700 mb-1">
                  Usuario
                </label>
                <input
                  id="admin-user"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#E5E3DC] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                />
              </div>
              <div>
                <label htmlFor="admin-pass" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#E5E3DC] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                />
              </div>

              {loginError && (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" aria-hidden="true" /> {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                {loggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                Ingresar
              </button>
            </form>

            <p className="text-[11px] text-gray-500 mt-5">
              La contraseña se valida en el servidor (hash scrypt). El panel solo conserva el token de sesión
              en esta pestaña del navegador.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#102D2B]">Panel de administración</h1>
            <p className="text-sm text-gray-600 mt-1">
              Contenido almacenado en el servidor ({health.driver}). Los cambios se guardan en la base de datos real.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E3DC] bg-white text-gray-600 hover:border-gray-400 px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" /> Cerrar sesión
          </button>
        </div>

        {message && (
          <p className="mb-6 inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 text-sm">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> {message}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
          <aside className="bg-white rounded-2xl border border-[#E5E3DC] p-3 h-fit">
            <p className="px-3 py-2 text-xs uppercase tracking-wider font-semibold text-gray-400">Tipos de contenido</p>
            <div className="flex flex-col gap-1">
              {TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setActiveType(t.key)
                    setEditorOpen(false)
                  }}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium text-left transition-colors ${
                    activeType === t.key ? 'bg-[#102D2B] text-white' : 'text-gray-600 hover:bg-[#F7F4ED]'
                  }`}
                  aria-pressed={activeType === t.key}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="bg-white rounded-2xl border border-[#E5E3DC] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-bold text-[#102D2B]">
                {TYPES.find((t) => t.key === activeType)?.label}{' '}
                <span className="text-sm font-normal text-gray-500">({items.length})</span>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => loadItems(activeType)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] text-gray-600 hover:border-gray-400 px-4 py-2 text-xs font-semibold transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Actualizar
                </button>
                <button
                  onClick={openNew}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#18685A] hover:bg-[#22806d] text-white px-4 py-2 text-xs font-semibold transition-colors"
                >
                  <FilePlus2 className="w-3.5 h-3.5" /> Nuevo
                </button>
              </div>
            </div>

            {listError && (
              <p className="mb-4 text-sm text-amber-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" /> {listError}
              </p>
            )}

            {editorOpen && (
              <div className="mb-6 rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#102D2B] text-sm">
                    {editorId ? `Editando: ${editorId}` : 'Nuevo registro'}
                  </h3>
                  <button onClick={() => setEditorOpen(false)} className="text-xs text-gray-500 hover:text-gray-700">
                    Cerrar
                  </button>
                </div>
                <label htmlFor="editor-json" className="sr-only">
                  Contenido JSON del registro
                </label>
                <textarea
                  id="editor-json"
                  value={editorJson}
                  onChange={(e) => setEditorJson(e.target.value)}
                  rows={14}
                  spellCheck={false}
                  className="w-full rounded-xl border border-[#E5E3DC] bg-white p-3 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                />
                {editorError && (
                  <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" /> {editorError}
                  </p>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#102D2B] hover:bg-[#183D38] disabled:opacity-60 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Guardar en la base de datos
                </button>
              </div>
            )}

            {loadingList ? (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Cargando…
              </p>
            ) : items.length === 0 ? (
              <p className="text-sm text-gray-500">
                Sin registros en este tipo. Usá “Nuevo” para agregar el primero.
              </p>
            ) : (
              <ul className="divide-y divide-[#E5E3DC]">
                {items.map((item) => (
                  <li key={item.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-[#102D2B] text-sm truncate">
                        {(item.data.name as string) || (item.data.title as string) || item.id}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        id: {item.id}
                        {item.updatedAt ? ` · actualizado ${item.updatedAt}` : ''}
                        {item.updatedBy ? ` por ${item.updatedBy}` : ''}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => openEdit(item)}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E5E3DC] text-gray-600 hover:border-gray-400 px-3 py-1.5 text-xs font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center gap-1 rounded-full border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 text-xs font-semibold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-6 text-[11px] text-gray-500 border-t border-[#E5E3DC] pt-4">
              El frontend público sigue leyendo los archivos de <code className="font-mono">src/data/</code>.
              Para publicar los cambios del panel en la web, exportá el contenido con{' '}
              <code className="font-mono">GET /api/export</code> y actualizá esos archivos (o automatizálo en el
              proceso de build). Detalles en <code className="font-mono">server/README.md</code>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
