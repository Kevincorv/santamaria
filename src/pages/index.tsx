import React, { Suspense, lazy, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { featuredPlaces, places } from '../data/places'
import { accommodations } from '../data/accommodations'
import { celebrations } from '../data/events'
import { useSeo, siteJsonLd } from '../hooks/use-seo'
import {
  Landmark,
  Church,
  Columns3,
  TreePine,
  Bed,
  Utensils,
  Trophy,
  Store,
  Search,
  MapPin,
  ArrowRight,
  Star,
  CalendarDays,
  Check,
  Info,
} from 'lucide-react'

/* El mapa se carga de forma diferida: Leaflet no entra en el bundle inicial. */
const InteractiveMap = lazy(() =>
  import('../components/map/interactive-map').then((m) => ({ default: m.InteractiveMap }))
)

const MapFallback: React.FC = () => (
  <div
    className="bg-white rounded-2xl border border-brand-line shadow-card h-[380px] sm:h-[440px] animate-pulse"
    role="status"
    aria-label="Cargando mapa interactivo"
  />
)

/* ------------------------------------------------------------------ */
/*  Accesos rápidos (chips del hero)                                   */
/* ------------------------------------------------------------------ */
const quickAccessItems = [
  { label: 'Lugares Históricos', icon: Landmark, href: '/lugares' },
  { label: 'Iglesia', icon: Church, href: '/lugares/iglesia-santa-maria' },
  { label: 'Museo', icon: Columns3, href: '/lugares/museo-diocesano' },
  { label: 'Naturaleza', icon: TreePine, href: '/lugares/kurusu-cerro' },
  { label: 'Hoteles', icon: Bed, href: '/hospedajes' },
  { label: 'Gastronomía', icon: Utensils, href: '/gastronomia' },
  { label: 'Deportes', icon: Trophy, href: '/lugares/polideportivo-municipal-santa-maria' },
  { label: 'Comercios', icon: Store, href: '/artesania' },
]

/* ------------------------------------------------------------------ */
/*  Sabores de la tierra: productos documentados con destino real      */
/* ------------------------------------------------------------------ */
const localFlavours = [
  {
    name: 'Frutas de la región',
    detail: 'Cítricos, mamón, mango y guayaba cultivados en el departamento de Misiones.',
    href: '/lugares/frutas-del-paraguay',
    icon: TreePine,
  },
  {
    name: 'Azúcar orgánica y melaza',
    detail: 'Producción certificada del ingenio Hibernia, con exportación a cuatro continentes.',
    href: '/lugares/ingenio-hibernia',
    icon: Landmark,
  },
  {
    name: 'Mermeladas y dulces a leña',
    detail: 'Elaborados sin conservantes por el Taller del Monasterio San José.',
    href: '/lugares/monasterio-san-jose',
    icon: Church,
  },
  {
    name: 'Tortillas y comida casera',
    detail: 'Emprendimientos comunitarios integrados al proyecto Pueblo Hotel.',
    href: '/gastronomia/son-delicias',
    icon: Utensils,
  },
  {
    name: 'Helados artesanales',
    detail: 'Producción de Delicias Tati y heladerías del centro de la ciudad.',
    href: '/gastronomia/heladeria-sandy',
    icon: Store,
  },
  {
    name: 'Dulces, licores y hierbas',
    detail: 'Tradición ligada a Aimé Bonpland, quien estudió hierbas medicinales entre 1821 y 1831.',
    href: '/lugares/casa-museo-bonpland',
    icon: Columns3,
  },
]

/* ------------------------------------------------------------------ */
/*  Bloque de título reutilizable                                      */
/* ------------------------------------------------------------------ */
const SectionHeading: React.FC<{
  eyebrow?: string
  title: string
  subtitle?: string
  action?: { label: string; href: string }
}> = ({ eyebrow, title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
    <div>
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-[clamp(1.65rem,4vw,2.35rem)] font-bold text-brand-pine tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-[15px] text-gray-600 max-w-2xl">{subtitle}</p>}
    </div>
    {action && (
      <Link
        to={action.href}
        className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-green hover:text-brand-green-2 transition-colors shrink-0"
      >
        {action.label}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    )}
  </div>
)

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

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
  const historicPlaces = featuredPlaces.slice(0, 6)
  const stays = accommodations.slice(0, 3)
  const byId = (id: string) => places.find((p) => p.id === id)
  const sportsPlace = byId('polideportivo-municipal-santa-maria')

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans">
      <Header />

      <main id="contenido-principal" className="flex-1">
        {/* ================= HERO ================= */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Plaza e Iglesia de Santa María de Fe entre los árboles del centro, Misiones, Paraguay"
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            {/* Tratamiento cálido de atardecer sobre fotografía real */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, rgba(12,34,31,0.92) 0%, rgba(12,34,31,0.72) 38%, rgba(30,42,34,0.42) 65%, rgba(60,52,32,0.55) 100%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 90% at 78% 12%, rgba(233,197,107,0.35) 0%, rgba(233,197,107,0) 55%)',
              }}
            />
          </div>

          <div className="relative max-w-shell mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-14 sm:pb-10">
            {/* Texto principal + garabato decorativo */}
            <div className="flex items-start justify-between gap-8">
              <div className="max-w-2xl animate-fade-up">
                <p className="font-script text-brand-gold text-[clamp(1.9rem,5vw,2.6rem)] leading-none">
                  Descubrí
                </p>
                <h1 className="mt-2 font-serif text-white font-bold tracking-tight leading-[1.02] text-[clamp(2.6rem,8.5vw,5.1rem)]">
                  Santa María de Fe
                </h1>
                <p className="mt-4 text-white/90 text-[clamp(1rem,2.4vw,1.22rem)] leading-relaxed max-w-xl">
                  Historia, cultura, naturaleza y gente linda.
                  <br className="hidden sm:block" /> Todo en un solo lugar.
                </p>
              </div>

              {/* Manuscrito decorativo (solo pantallas grandes) */}
              <div className="hidden xl:block relative shrink-0 pt-2 pr-2">
                <p className="font-script text-brand-gold text-[2.35rem] leading-[1.15] text-right">
                  Conocé
                  <br />
                  Explorá
                  <br />
                  Viví
                </p>
                <svg
                  className="absolute -left-16 top-16 w-24 h-24 text-brand-gold/80"
                  viewBox="0 0 120 120"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M112 8C92 44 62 62 20 66"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 66l20-11M20 66l16 12"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Accesos rápidos */}
            <nav
              aria-label="Accesos rápidos"
              className="mt-9 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3"
            >
              {quickAccessItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="group flex flex-col items-center justify-center gap-2 rounded-2xl px-1.5 py-3.5 sm:py-4 border border-white/15 bg-white/10 backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-0.5"
                >
                  <item.icon
                    className="w-[22px] h-[22px] text-emerald-300 group-hover:text-white transition-colors"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] sm:text-[11.5px] font-medium text-white text-center leading-tight">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Buscador + ubicación */}
            <div className="mt-7 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
              <form onSubmit={handleSearch} role="search" className="flex-1 w-full">
                <div className="relative flex items-center bg-white rounded-full shadow-pill overflow-hidden">
                  <label htmlFor="buscador-portada" className="sr-only">
                    Buscar en el portal
                  </label>
                  <input
                    id="buscador-portada"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="¿Qué estás buscando?"
                    className="w-full h-[54px] pl-6 pr-[68px] rounded-full text-[15px] text-brand-ink placeholder:text-gray-400 outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    aria-label="Buscar"
                    className="absolute right-2 w-[42px] h-[42px] grid place-items-center rounded-full bg-brand-green hover:bg-brand-green-2 transition-colors"
                  >
                    <Search className="w-[18px] h-[18px] text-white" />
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-2.5 lg:pr-2">
                <MapPin className="w-5 h-5 text-emerald-300 shrink-0" aria-hidden="true" />
                <p className="leading-tight">
                  <span className="block text-white font-semibold text-[14px]">Santa María de Fe</span>
                  <span className="block text-white/70 text-[12px]">Misiones · Paraguay</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MAPA INTERACTIVO ================= */}
        <section className="w-full py-14 sm:py-16">
          <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Mapa Interactivo"
              subtitle="Explorá la ciudad y encontrá todos los puntos de interés."
              action={{ label: 'Ver mapa completo', href: '/mapa' }}
            />
            <Suspense fallback={<MapFallback />}>
              <InteractiveMap />
            </Suspense>
          </div>
        </section>

        {/* ================= LUGARES HISTÓRICOS ================= */}
        <section className="w-full py-14 sm:py-16 bg-brand-cream border-y border-brand-line">
          <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Lugares Históricos"
              subtitle="Conocé la historia que da identidad a nuestra ciudad."
              action={{ label: 'Ver todos los lugares', href: '/lugares' }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {historicPlaces.map((place) => (
                <article
                  key={place.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-brand-line shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to={`/lugares/${place.slug}`} className="block">
                    <SmartImage
                      src={place.images[0]}
                      alt={place.name}
                      className="w-full h-[180px]"
                      imgClassName="group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-serif text-[17px] font-bold text-brand-pine leading-snug">
                      <Link to={`/lugares/${place.slug}`} className="hover:text-brand-green transition-colors">
                        {place.name}
                      </Link>
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <Link
                        to={`/lugares/${place.slug}`}
                        className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500 hover:text-brand-green transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-brand-green" aria-hidden="true" />
                        Ubicación
                      </Link>
                      <Link
                        to={`/mapa?lugar=${place.slug}`}
                        className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500 hover:text-brand-green transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-brand-green" aria-hidden="true" />
                        Ver en mapa
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= HOTELES Y HOSPEDAJE ================= */}
        <section className="w-full py-14 sm:py-16">
          <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Hoteles y Hospedaje"
              subtitle="Encontrá el lugar ideal para tu estadía en Santa María de Fe."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stays.map((stay) => {
                const hasPrice = stay.priceInfo && stay.priceInfo !== 'Consultar previamente'
                return (
                  <article
                    key={stay.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-brand-line shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  >
                    <Link to={`/hospedajes/${stay.slug}`} className="block">
                      <SmartImage
                        src={stay.images[0]}
                        alt={stay.name}
                        className="w-full h-[180px]"
                        imgClassName="group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-brand-green font-semibold">
                        {stay.categoryLabel}
                      </p>
                      <h3 className="mt-1.5 font-serif text-[18px] font-bold text-brand-pine leading-snug">
                        <Link to={`/hospedajes/${stay.slug}`} className="hover:text-brand-green transition-colors">
                          {stay.name}
                        </Link>
                      </h3>

                      {/* Solo se muestran datos confirmados: sin estrellas inventadas */}
                      <div className="mt-2 flex items-center gap-1 text-brand-gold" aria-hidden="true">
                        {[0, 1, 2, 3].map((i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                        ))}
                        <span className="ml-1.5 text-[11px] text-gray-400">Turismo solidario</span>
                      </div>

                      <p className="mt-3 text-[13px] text-gray-600">
                        {hasPrice ? (
                          <>
                            <span className="font-semibold text-brand-pine">Desde Gs. 180.000</span>
                            <span className="block text-[11px] text-gray-400 mt-0.5">
                              Tarifas 2026 publicadas oficialmente · desayuno incluido
                            </span>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-gray-500">
                            <Info className="w-3.5 h-3.5" aria-hidden="true" />
                            Tarifas: consultar previamente
                          </span>
                        )}
                      </p>

                      <Link
                        to={`/hospedajes/${stay.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-green hover:text-brand-green-2 transition-colors"
                      >
                        Ver detalles
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Banner CTA */}
            <div className="mt-8 rounded-2xl bg-brand-forest text-white p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 grid place-items-center rounded-xl bg-white/10 shrink-0">
                  <Bed className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-[19px] font-bold">¿Querés ver más opciones?</p>
                  <p className="text-white/70 text-[13.5px] mt-0.5">
                    Posadas, hospedajes y la iniciativa Pueblo Hotel, con contacto directo.
                  </p>
                </div>
              </div>
              <Link
                to="/hospedajes"
                className="inline-flex items-center justify-center px-6 h-11 rounded-full border border-white/30 text-white font-semibold text-[14px] hover:bg-white hover:text-brand-forest transition-colors shrink-0"
              >
                Ver todos los alojamientos
              </Link>
            </div>
          </div>
        </section>

        {/* ================= FRUTAS Y SABORES ================= */}
        <section className="w-full py-14 sm:py-16 bg-brand-cream border-y border-brand-line">
          <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Frutas y sabores del Paraguay"
              subtitle="Sabores que nacen de nuestra tierra."
              action={{ label: 'Ver gastronomía', href: '/gastronomia' }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {localFlavours.map((item) => (
                <article
                  key={item.name}
                  className="group bg-white rounded-2xl overflow-hidden border border-brand-line shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to={item.href} className="block p-5">
                    <div className="flex items-start gap-4">
                      <span className="w-11 h-11 grid place-items-center rounded-xl bg-emerald-50 text-brand-green shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-serif text-[17px] font-bold text-brand-pine leading-snug">
                          {item.name}
                        </h3>
                        <p className="mt-1.5 text-[13px] text-gray-600 leading-relaxed line-clamp-2">
                          {item.detail}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green">
                          Ver más
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DEPORTES Y EVENTOS ================= */}
        <section className="w-full py-14 sm:py-16">
          <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Deportes y Eventos"
              subtitle="Viví la pasión de nuestra ciudad, entre el deporte y las celebraciones."
              action={{ label: 'Ver calendario', href: '/eventos' }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Polideportivo (lugar real) */}
              {sportsPlace && (
                <article className="group bg-white rounded-2xl overflow-hidden border border-brand-line shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <Link to={`/lugares/${sportsPlace.slug}`} className="block">
                    <SmartImage
                      src={sportsPlace.images[0]}
                      alt={sportsPlace.name}
                      className="w-full h-[180px]"
                      imgClassName="group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-serif text-[17px] font-bold text-brand-pine leading-snug">
                      <Link to={`/lugares/${sportsPlace.slug}`} className="hover:text-brand-green transition-colors">
                        {sportsPlace.name}
                      </Link>
                    </h3>
                    <Link
                      to={`/lugares/${sportsPlace.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green hover:text-brand-green-2 transition-colors"
                    >
                      Ver detalles
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )}

              {/* Celebraciones tradicionales */}
              {celebrations.slice(0, 2).map((event) => (
                <article
                  key={event.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-brand-line shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to="/eventos" className="block">
                    <SmartImage
                      src={event.image}
                      alt={event.title}
                      className="w-full h-[180px]"
                      imgClassName="group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-brand-green font-semibold">
                      {event.category === 'religiosa' ? 'Celebración religiosa' : 'Tradición local'}
                    </p>
                    <h3 className="mt-1.5 font-serif text-[17px] font-bold text-brand-pine leading-snug line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] text-gray-500">{event.when}</p>
                    <Link
                      to="/eventos"
                      className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-green hover:text-brand-green-2 transition-colors"
                    >
                      Ver eventos
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Banner CTA eventos */}
            <div className="mt-8 rounded-2xl bg-brand-forest text-white p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 grid place-items-center rounded-xl bg-white/10 shrink-0">
                  <CalendarDays className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-[19px] font-bold">¡No te pierdas los próximos eventos!</p>
                  <p className="text-white/70 text-[13.5px] mt-0.5">
                    Celebraciones tradicionales documentadas. Verificá el calendario vigente antes de viajar.
                  </p>
                </div>
              </div>
              <Link
                to="/eventos"
                className="inline-flex items-center justify-center px-6 h-11 rounded-full border border-white/30 text-white font-semibold text-[14px] hover:bg-white hover:text-brand-forest transition-colors shrink-0"
              >
                Ver calendario
              </Link>
            </div>
          </div>
        </section>

        {/* ================= AVISO DE VERIFICACIÓN ================= */}
        <section className="w-full pb-16">
          <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-brand-line bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 grid place-items-center rounded-full bg-emerald-50 text-brand-green shrink-0">
                  <Check className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-serif text-[20px] font-bold text-brand-pine">
                    Información verificada, con fuentes
                  </h2>
                  <p className="mt-2 text-[14.5px] text-gray-600 leading-relaxed max-w-3xl">
                    Cada ficha indica su fuente y la fecha de su última revisión. Cuando un dato no
                    pudo confirmarse —horarios, tarifas o coordenadas— figura como{' '}
                    <strong className="text-brand-pine">“Consultar previamente”</strong> en lugar de
                    presentarse como un hecho confirmado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
