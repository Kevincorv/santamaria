import React, { useState } from 'react'
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
} from 'lucide-react'

const quickAccessItems = [
  { label: 'Lugares', icon: Landmark, href: '/lugares' },
  { label: 'Iglesia', icon: Church, href: '/lugares/iglesia-santa-maria' },
  { label: 'Museo', icon: Columns3, href: '/lugares/museo-diocesano' },
  { label: 'Naturaleza', icon: TreePine, href: '/lugares/kurusu-cerro' },
  { label: 'Hoteles', icon: Bed, href: '/hospedajes' },
  { label: 'Gastronomía', icon: Utensils, href: '/gastronomia' },
  { label: 'Artesanías', icon: Scissors, href: '/artesania' },
  { label: 'Recorridos', icon: Compass, href: '/recorridos' },
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
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative bg-[#102D2B] text-white overflow-hidden">
          <div className="absolute inset-0">
            <SmartImage
              src={heroImage}
              alt="Iglesia y plaza central de Santa María de Fe entre la arboleda, Misiones, Paraguay"
              className="w-full h-full"
              imgClassName="object-cover object-center"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f1d]/95 via-[#102D2B]/75 to-[#102D2B]/35" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0b1f1d] to-transparent" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-2xl">
                <span className="font-script text-4xl sm:text-5xl text-amber-200 block mb-1">
                  Descubrí
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                  Santa María de Fe
                </h1>
                <p className="mt-5 text-base sm:text-lg text-[#E5E3DC]/90 leading-relaxed max-w-lg">
                  Historia, cultura, naturaleza y gente linda.
                  <br />
                  Todo en un solo lugar.
                </p>
              </div>

              <div className="hidden lg:block text-right select-none pt-6">
                <span className="font-script text-3xl xl:text-4xl text-amber-200/90 block -rotate-6">
                  Conoce
                </span>
                <span className="font-script text-3xl xl:text-4xl text-amber-200/90 block rotate-3 ml-8">
                  Explorá
                </span>
                <span className="font-script text-3xl xl:text-4xl text-amber-200/90 block -rotate-2">
                  Viví
                </span>
              </div>
            </div>

            {/* Accesos rápidos */}
            <nav
              aria-label="Accesos rápidos"
              className="mt-10 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 max-w-4xl"
            >
              {quickAccessItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-2 py-4 sm:py-5 hover:bg-white/20 hover:border-white/25 transition-all text-center"
                >
                  <item.icon className="w-6 h-6 text-emerald-200 group-hover:text-white transition-colors" aria-hidden="true" />
                  <span className="text-[11px] sm:text-xs font-medium text-[#E5E3DC] leading-tight">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Buscador + ubicación */}
            <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
              <form onSubmit={handleSearch} role="search" className="flex-1 max-w-2xl">
                <label htmlFor="home-search" className="sr-only">
                  ¿Qué estás buscando?
                </label>
                <div className="relative">
                  <input
                    id="home-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="¿Qué estás buscando?"
                    className="w-full rounded-full bg-white pl-6 pr-16 py-4 text-[#202724] placeholder:text-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    type="submit"
                    aria-label="Buscar"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#18685A] hover:bg-[#22806d] text-white transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-2.5 text-[#E5E3DC]/90 shrink-0">
                <MapPin className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                <div className="text-sm leading-tight">
                  <p className="font-semibold text-white">Santa María de Fe</p>
                  <p className="text-xs text-[#E5E3DC]/75">Misiones · Paraguay</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ LUGARES DESTACADOS ============ */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
                Patrimonio y naturaleza
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] tracking-tight mt-1">
                Lugares destacados
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
                Cada ficha incluye historia, ubicación, mapa, indicaciones, fuente y código QR.
              </p>
            </div>
            <Link
              to="/lugares"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18685A] hover:text-[#102D2B] transition-colors"
            >
              Ver todos los lugares <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaces.map((place) => (
              <Link
                key={place.id}
                to={`/lugares/${place.slug}`}
                className="group bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <SmartImage
                  src={place.images[0]}
                  alt={place.name}
                  className="w-full h-52"
                  imgClassName="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">
                    {place.categoryLabel}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#102D2B] mt-1.5 leading-snug">
                    {place.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                    {place.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      {place.coordinates ? 'Ver en mapa' : 'Coordenadas a verificar'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#18685A]">
                      Ver ficha <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ ALOJAMIENTOS ============ */}
        <section className="bg-white border-y border-[#E5E3DC]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
                  Turismo solidario
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] tracking-tight mt-1">
                  Dormí en Santa María
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
                  El Santa María Hotel financia becas universitarias; el proyecto Pueblo Hotel integra casas de familia de la comunidad.
                </p>
              </div>
              <Link
                to="/hospedajes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#18685A] hover:text-[#102D2B] transition-colors"
              >
                Ver todos los alojamientos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.slice(0, 3).map((a) => (
                <Link
                  key={a.id}
                  to="/hospedajes"
                  className="group bg-[#F7F4ED] rounded-2xl border border-[#E5E3DC] overflow-hidden hover:shadow-lg transition-all"
                >
                  <SmartImage
                    src={a.images[0]}
                    alt={a.name}
                    className="w-full h-48"
                    imgClassName="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">
                      {a.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#102D2B] mt-1.5">{a.name}</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">
                      {a.shortDescription}
                    </p>
                    {a.id === 'santa-maria-hotel' && (
                      <p className="mt-3 text-sm font-semibold text-[#102D2B]">
                        Desde Gs. 180.000 · desayuno incluido
                        <span className="block text-[11px] font-normal text-gray-500">
                          Tarifas 2026 publicadas oficialmente
                        </span>
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Banner CTA */}
            <div className="mt-8 rounded-2xl bg-[#102D2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <Bed className="w-8 h-8 text-emerald-300 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-serif text-xl font-bold">¿Querés ver más opciones?</p>
                  <p className="text-sm text-[#E5E3DC]/80">
                    Hospedajes, posadas y la iniciativa comunitaria Pueblo Hotel.
                  </p>
                </div>
              </div>
              <Link
                to="/hospedajes"
                className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold transition-colors"
              >
                Ver todos los alojamientos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============ GASTRONOMÍA ============ */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
                Sabores de la tierra
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] tracking-tight mt-1">
                Gastronomía local
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
                Helados artesanales, pastelería y comida casera, con los locales realmente documentados del distrito.
              </p>
            </div>
            <Link
              to="/gastronomia"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18685A] hover:text-[#102D2B] transition-colors"
            >
              Ver gastronomía <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 3).map((r) => (
              <Link
                key={r.id}
                to="/gastronomia"
                className="group bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden hover:shadow-lg transition-all"
              >
                <SmartImage
                  src={r.images[0]}
                  alt={r.name}
                  className="w-full h-44"
                  imgClassName="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B45309]">
                    {r.kind}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#102D2B] mt-1.5">{r.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">
                    {r.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ CELEBRACIONES ============ */}
        <section className="bg-white border-y border-[#E5E3DC]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
                  Tradición viva
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] tracking-tight mt-1">
                  Celebraciones de siempre
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
                  No publicamos eventos futuros sin confirmar: estas son las tradiciones anuales documentadas.
                </p>
              </div>
              <Link
                to="/eventos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#18685A] hover:text-[#102D2B] transition-colors"
              >
                Ver celebraciones <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {celebrations.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-[#E5E3DC] bg-[#F7F4ED] p-5 hover:shadow-md transition-shadow"
                >
                  <CalendarDays className="w-6 h-6 text-[#28685A]" aria-hidden="true" />
                  <h3 className="font-serif text-base font-bold text-[#102D2B] mt-3 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#B45309] mt-2">{c.when}</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ RECORRIDOS ============ */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
                Planeá tu visita
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] tracking-tight mt-1">
                Recorridos autoguiados
              </h2>
            </div>
            <Link
              to="/recorridos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18685A] hover:text-[#102D2B] transition-colors"
            >
              Ver recorridos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((t) => (
              <Link
                key={t.id}
                to="/recorridos"
                className="group rounded-2xl overflow-hidden bg-[#102D2B] text-white hover:shadow-lg transition-all"
              >
                <SmartImage
                  src={t.image}
                  alt={t.title}
                  className="w-full h-40 opacity-90"
                  imgClassName="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-5">
                  <h3 className="font-serif text-base font-bold leading-snug">{t.title}</h3>
                  <p className="text-xs text-[#E5E3DC]/75 mt-2">{t.estimatedDuration}</p>
                  <p className="text-[11px] text-emerald-300/90 mt-1">
                    {t.stopSlugs.length} paradas
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ PWA ============ */}
        {!hasInstalled && showPrompt && (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
            <div className="rounded-2xl bg-gradient-to-r from-[#183D38] to-[#102D2B] text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
              <div className="flex items-center gap-4">
                <Download className="w-7 h-7 text-emerald-300 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-serif text-lg font-bold">Llevá la guía en tu celular</p>
                  <p className="text-sm text-[#E5E3DC]/80">
                    Instalala como aplicación y usala aunque no tengas señal.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={promptInstall}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#102D2B] transition-colors"
                >
                  <Check className="w-4 h-4" /> Instalar
                </button>
                <button
                  onClick={dismissPrompt}
                  className="p-2.5 rounded-full hover:bg-white/10 text-[#E5E3DC] transition-colors"
                  aria-label="Cerrar aviso de instalación"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
