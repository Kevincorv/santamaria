import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, QrCode, Search } from 'lucide-react'

export interface HeaderProps {
  className?: string
}

export const ChurchIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* Cross on top */}
    <path d="M16 2v4M14 4h4" />
    {/* Bell tower / belfry roof */}
    <path d="M16 6L11 10v18h10V10L16 6z" />
    {/* Bell arch */}
    <path d="M14 13a2 2 0 0 1 4 0v3h-4v-3z" />
    {/* Church portal door */}
    <path d="M14 23a2 2 0 0 1 4 0v5h-4v-5z" />
    {/* Left aisle */}
    <path d="M11 15L5 18v10h6V15z" />
    {/* Right aisle */}
    <path d="M21 15l6 3v10h-6V15z" />
    {/* Small windows */}
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

  return (
    <header className={`bg-[#102D2B] text-white sticky top-0 z-40 border-b border-[#183D38] shadow-md ${className}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="text-white/95 group-hover:text-emerald-300 transition-colors">
              <ChurchIcon className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Santa María de Fe
              </span>
              <span className="text-xs text-[#E5E3DC]/75 tracking-wider font-light">
                Misiones · Paraguay
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden xl:flex items-center gap-5" aria-label="Navegación principal">
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href)

              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`text-[13px] tracking-wide font-medium transition-colors hover:text-emerald-300 relative py-1 whitespace-nowrap ${
                    isActive ? 'text-white font-semibold' : 'text-[#E5E3DC]/85'
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

          {/* Right actions: search + QR */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <form onSubmit={handleSearch} role="search" className="flex items-center">
              <label htmlFor="header-search" className="sr-only">
                Buscar
              </label>
              <input
                id="header-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar…"
                className="w-36 lg:w-48 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:bg-white/15"
              />
              <button
                type="submit"
                className="-ml-9 p-2 text-[#E5E3DC]/90 hover:text-emerald-300 transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <Link
              to="/escanear"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              <QrCode className="w-4 h-4 text-emerald-300" />
              <span>Escanear QR</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/lugares"
              className="p-2 text-white hover:bg-[#183D38] rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-[#183D38] rounded-lg transition-colors"
              aria-label="Menú de navegación"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}