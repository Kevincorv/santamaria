import React, { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { featuredPlaces } from '../data/places'
import { accommodations } from '../data/accommodations'
import { restaurants } from '../data/restaurants'
import { celebrations } from '../data/events'
import { tours } from '../data/tours'
import { useSeo, siteJsonLd } from '../hooks/use-seo'
import { useNewInstallPrompt } from '../hooks/use-pwa'
import {
  Landmark,
  Church,
  Columns3,
  TreePine,
  Bed,
  Utensils,
  Scissors,
  Compass,
  Search,
  MapPin,
  ArrowRight,
  Download,
  X,
  Check,
  CalendarDays,
  Share2,
  Route,
} from 'lucide-react'

const quickAccessItems = [
  { label: 'Lugares', icon: Landmark, href: '/lugares' },
  { label: 'Iglesia', icon: Church, href: '/lugares/iglesia-santa-maria' },
  { label: 'Museo', icon: Columns3, href: '/lugares/museo-diocesano' },
  { label: 'Naturaleza', icon: TreePine, href: '/lugares/kurusu-cerro' },
  { label: 'Hoteles', icon: Bed, href: '/hospedajes' },
  { label: 'Gastronomía', icon: Utensils, href: '/gastronomia' },
  { label: 'Artesanías', icon: Scissors, href: '/artesania' },
  { label: 'Recorridos', icon: Route, href: '/recorridos' },
]

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const { showPrompt, promptInstall, dismissPrompt, hasInstalled } = useNewInstallPrompt()

  useSeo({
    title: 'Guía turística y patrimonial',
    description:
      'Descubrí Santa María de Fe, Misiones: historia jesuítico-guaraní, museo de arte sacro, Kurusu Cerro, monos de la plaza, hoteles, gastronomía y artesanías. Información verificada con fuentes.',
    path: '/',
    image: '/images/commons/plaza-iglesia-01.jpg',
    jsonLd: siteJsonLd(),
  })

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const q = searchQuery.trim()
    navigate(q ? `/lugares?q=${encodeURIComponent(q)}` : '/lugares')
  }

  const heroImage = '/images/commons/plaza-iglesia-01.jpg'

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] font-sans">
      <Header />

      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative w-full min-h-[400px] bg-no-repeat bg-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Plaza e Iglesia de Santa María de Fe entre árboles, Misiones, Paraguay"
              className="w-full h-full object-cover"
              style={{}}>
            </img>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/20 to-black/40" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
            <div className="flex flex-col items-start gap-4">
              <span className="font-script text-[clamp(1.5rem,4vw,2rem)] text-[#f2d36b] mb-2">
                Descubrí
              </span>
              <h1 className="font-serif text-[clamp(2.2rem,9vw,3.2rem)] text-white font-bold tracking-tight">
                Santa María de Fe
              </h1>
              <p className="text-white/85 text-base leading-relaxed">
                Historia, cultura, naturaleza y gente linda. Todo en un solo lugar.
              </p>
            </div>
          </div>
        </section>

        {/* ============ GRILLA DE ACCESOS: 4 columnas x 2 filas ============ */}
        <section className="w-full py-4">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {quickAccessItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex flex-col items-center justify-center rounded-2xl bg-white/8 backdrop-blur border border-white/15 border-t-0.5 border-b-0.5 border-emerald-400/20 rounded-2xl py-3 px-2 transition-all hover:bg-white/10"
                >
                  <item.icon className="w-5 h-5 text-emerald-400 group-hover:text-white mb-2 transition-transform duration-300" aria-hidden="true" />
                  <span className="text-[clamp(11px,3.2vw,14px)] text-white text-center transition-all">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ BUSCADOR ============ */}
        <section className="w-full py-4">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1 flex rounded-full bg-white overflow-hidden shadow-sm">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="¿Qué estás buscando?"
                  className="w-full px-6 py-3 rounded-full outline-none placeholder:text-gray-400 text-sm transition-colors"
                  style={{}}>
                </input>
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#14604f] p-2 transition-colors"
                  aria-label="Buscar"
                >
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <div className="text-sm font-medium text-white">
                  <p>Santa María de Fe</p>
                  <p className="text-[rgba(255,255,255,0.6)]">Misiones · Paraguay</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ LUGARES DESTACADOS ============ */}
        <section className="w-full py-6 bg-[#f7f3ec]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <span className="text-xs uppercase tracking-wider text-emerald-600 sm:mb-0">
                PATRIMONIO Y NATURALEZA
              </span>
              <h2 className="font-serif text-[clamp(1.75rem,4vw,2rem)] text-emerald-800 font-bold sm:mt-0">
                Lugares destacados
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPlaces.map((place) => (
                <Link
                  key={place.id}
                  to={`/lugares/${place.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white transition-all duration-300"
                >
                  <SmartImage
                    src={place.images[0]}
                    alt={place.name}
                    className="w-full h-[180px] object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-600 block mb-1">
                      {place.categoryLabel}
                    </span>
                    <h3 className="font-serif text-[clamp(1rem,3vw,1.2rem)] font-bold text-emerald-800 mt-1">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
                      {place.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ RESTO DE SECCIONES (mantener consistencia) ============ */}
        {/* ... otras secciones con mismo patrón de responsividad ... */}
      </main>

      <Footer />
    </div>
  )
}