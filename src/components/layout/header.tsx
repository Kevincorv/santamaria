import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, QrCode, Search } from 'lucide-react'

export interface HeaderProps {
  className?: string
}

export const ChurchIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `/lugares?q=${encodeURIComponent(q)}` : '/lugares')
    setMobileMenuOpen(false)
  }

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  const navLinks = [
    { title: 'Inicio', href: '/' },
    { title: 'Lugares', href: '/lugares' },
    { title: 'Mapa', href: '/mapa' },
    { title: 'Historia', href: '/historia' },
    { title: 'Hospedajes', href: '/hospedajes' },
    { title: 'Gastronomía', href: '/gastronomia' },
    { title: 'Artesanías', href: '/artesania' },
    { title: 'Eventos', href: '/eventos' },
    { title: 'Recorridos', href: '/recorridos' },
  ]

  // Safe area insets for iOS
  const safeAreaTop = useMemo(() => {
    if (typeof window !== 'undefined') {
      // Usar CSS.env para safe areas de iOS (Safari support)
      const top = window.CSS?.env?.('safe-area-inset-top')
      return typeof top === 'string' ? parseInt(top) : 0
    }
    return 0
  }, [])

  const safeAreaBottom = useMemo(() => {
    if (typeof window !== 'undefined') {
      const bottom = window.CSS?.env?.('safe-area-inset-bottom')
      return typeof bottom === 'string' ? parseInt(bottom) : 0
    }
    return 0
  }, [])

  return (
    <header className={`bg-[#0f2e2a] text-white sticky top-0 z-40 border-b border-[rgba(255,255,255,0.1)] shadow-md ${className}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 py-2">
          {/* Logo a la izquierda */}
          <div className="flex items-start gap-3">
            <Link to="/" className="flex items-start gap-2">
              <ChurchIcon className="w-7 h-7 text-emerald-400" />
              <div>
                <span className="font-serif text-base font-bold tracking-wider text-white">
                  Santa María de Fe
                </span>
                <span className="text-xs text-[rgba(255,255,255,0.6)] tracking-wider">
                  Misiones · Paraguay
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation: hidden on mobile */}
          <nav className="hidden sm:flex items-center gap-4" aria-label="Navegación principal">
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href)

              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`text-[12px] tracking-wide font-medium transition-colors hover:text-emerald-300 relative py-1 whitespace-nowrap ${
                    isActive ? 'text-white font-semibold' : 'text-[rgba(255,255,255,0.6)]'
                  }`}
                >
                  {item.title}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right actions: search + QR - hidden on mobile, shown on desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.6)]" />
              <input
                id="header-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar lugares, hoteles, restaurantes…"
                className="hidden"
              />
            </div>
            <Link
              to="/escanear"
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.6)] hover:text-white transition-colors text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Escanear QR</span>
            </Link>
          </div>

          {/* Mobile hamburger - shown on mobile only */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/lugares"
              className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] transition-colors"
              aria-label="Menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] transition-colors"
              aria-label="Menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu overlay / drawer */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-[#0f2e2a]/98 backdrop-blur-zxl z-50 flex flex-col pt-20 padding-y-4">
              <nav className="flex flex-col w-full max-h-[calc(100vh_-_80px)] overflow-y-auto px-4 py-4 gap-4 text-white space-y-2">
                {navLinks.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.href)

                  return (
                    <Link
                      key={item.title}
                      to={item.href}
                      className={`text-white font-medium transition-colors hover:text-emerald-400 ${
                        isActive ? 'text-emerald-400' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )
                })}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 text-white/60 hover:text-white transition-colors text-sm"
                  aria-label="Cerrar menú"
                >
                  <X className="w-4 h-4" />
                  <span className="ml-2">Cerrar</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}