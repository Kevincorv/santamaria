import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, QrCode, Search, ChevronRight } from 'lucide-react'

export interface HeaderProps {
  className?: string
}

/** Isotipo de la iglesia (SVG propio, se reutiliza en header y footer). */
export const ChurchIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 2v4M14 4h4" />
    <path d="M16 6L11 10v18h10V10L16 6z" />
    <path d="M14 13a2 2 0 0 1 4 0v3h-4v-3z" />
    <path d="M14 23a2 2 0 0 1 4 0v5h-4v-5z" />
    <path d="M11 15L5 18v10h6V15z" />
    <path d="M21 15l6 3v10h-6V15z" />
    <circle cx="8" cy="22" r="1" fill="currentColor" />
    <circle cx="24" cy="22" r="1" fill="currentColor" />
  </svg>
)

/** Enlaces principales (6 ítems, igual que la guía visual de referencia). */
export const primaryNav = [
  { title: 'Inicio', href: '/' },
  { title: 'Lugares', href: '/lugares' },
  { title: 'Historia', href: '/historia' },
  { title: 'Mapa', href: '/mapa' },
  { title: 'Servicios', href: '/servicios' },
  { title: 'Contacto', href: '/contacto' },
]

/** Accesos secundarios: se muestran en el menú móvil y en la página Servicios. */
export const secondaryNav = [
  { title: 'Hospedajes', href: '/hospedajes' },
  { title: 'Gastronomía', href: '/gastronomia' },
  { title: 'Artesanías', href: '/artesania' },
  { title: 'Eventos', href: '/eventos' },
  { title: 'Recorridos', href: '/recorridos' },
  { title: 'Itinerarios', href: '/itinerarios' },
  { title: 'Información útil', href: '/informacion-util' },
  { title: 'Guía de idiomas', href: '/idiomas' },
  { title: 'Registro de prestadores', href: '/registro-prestadores' },
]

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `/lugares?q=${encodeURIComponent(q)}` : '/lugares')
    setSearchOpen(false)
    setMobileMenuOpen(false)
  }

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <header
      className={`bg-brand-forest text-white sticky top-0 z-50 border-b border-white/10 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.65)] ${className}`}
    >
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>

      <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-[72px]">
          {/* ---------- Marca ---------- */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Santa María de Fe — Inicio">
            <ChurchIcon className="w-8 h-8 text-emerald-300" />
            <span className="leading-tight block">
              <span className="block font-serif text-[19px] sm:text-[21px] font-bold text-white tracking-tight">
                Santa María de Fe
              </span>
              <span className="block text-[10px] sm:text-[11px] text-white/60 tracking-[0.14em] uppercase">
                Misiones · Paraguay
              </span>
            </span>
          </Link>

          {/* ---------- Navegación escritorio ---------- */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {primaryNav.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`relative px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors hover:bg-white/10 hover:text-white ${
                  isActive(item.href) ? 'text-white' : 'text-white/70'
                }`}
              >
                {item.title}
                {isActive(item.href) && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-emerald-300 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* ---------- Acciones escritorio ---------- */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              aria-label="Abrir buscador"
              className="w-10 h-10 grid place-items-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 transition-colors"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
            <Link
              to="/escanear"
              className="flex items-center gap-2 px-4 h-10 rounded-full border border-white/25 text-white hover:bg-white hover:text-brand-forest transition-colors text-[13.5px] font-medium"
            >
              <QrCode className="w-[18px] h-[18px]" />
              <span>Escanear QR</span>
            </Link>
          </div>

          {/* ---------- Acciones móvil ---------- */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              aria-label="Abrir buscador"
              className="w-10 h-10 grid place-items-center rounded-full border border-white/20 text-white/85"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-movil"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="w-10 h-10 grid place-items-center rounded-full border border-white/20 text-white/85"
            >
              {mobileMenuOpen ? <X className="w-[20px] h-[20px]" /> : <Menu className="w-[20px] h-[20px]" />}
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Buscador desplegable ---------- */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-brand-forest/98 backdrop-blur animate-fade-in">
          <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <form onSubmit={handleSearch} role="search" className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-brand-green"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="¿Qué estás buscando? Lugares, hoteles, gastronomía…"
                  aria-label="Buscar en el portal"
                  className="w-full h-12 pl-11 pr-4 rounded-full bg-white text-brand-ink placeholder:text-gray-400 text-[15px] outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-12 px-6 rounded-full bg-brand-green text-white font-medium text-[15px] hover:bg-brand-green-2 transition-colors"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Menú móvil ---------- */}
      {mobileMenuOpen && (
        <div
          id="menu-movil"
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 bg-brand-forest/98 backdrop-blur-md overflow-y-auto lg:hidden"
        >
          <nav className="px-5 py-6 space-y-1" aria-label="Navegación móvil">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 px-2 pb-2">Explorar</p>
            {primaryNav.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center justify-between px-3 py-3 rounded-xl text-[16px] transition-colors ${
                  isActive(item.href) ? 'bg-emerald-400/15 text-emerald-200' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <span>{item.title}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}

            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 px-2 pt-6 pb-2">
              Servicios turísticos
            </p>
            <div className="grid grid-cols-1 gap-1">
              {secondaryNav.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] text-white/75 hover:bg-white/10 transition-colors"
                >
                  <span>{item.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>
              ))}
            </div>

            <div className="pt-6">
              <Link
                to="/escanear"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-white text-brand-forest font-semibold text-[15px]"
              >
                <QrCode className="w-[18px] h-[18px]" />
                Escanear QR
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
