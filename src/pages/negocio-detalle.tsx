import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { accommodations } from '../data/accommodations'
import { restaurants } from '../data/restaurants'
import { canonicalUrl } from '../data/site'
import { placeJsonLd, useSeo } from '../hooks/use-seo'
import type { Accommodation, Restaurant } from '../types/places'
import {
  AlertTriangle,
  ArrowLeft,
  Bed,
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  Globe,
  Lightbulb,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
  Tag,
  Utensils,
} from 'lucide-react'

type Business = Accommodation | Restaurant

interface BusinessDetailProps {
  business?: Business
  /** Ruta base del listado, p. ej. "/hospedajes". */
  basePath: string
  backLabel: string
  /** Etiqueta de la sección cuando la ficha no existe. */
  notFoundLabel: string
  isAccommodation: boolean
}

const mapsLink = (business: Business): string | null => {
  const destination = business.coordinates
    ? `${business.coordinates.latitude},${business.coordinates.longitude}`
    : [business.name, business.address.street, business.address.city, business.address.region, business.address.country]
        .filter(Boolean)
        .join(', ')
  if (!destination) return null
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
}

const BusinessDetail: React.FC<BusinessDetailProps> = ({
  business,
  basePath,
  backLabel,
  notFoundLabel,
  isAccommodation,
}) => {
  const [shareSuccess, setShareSuccess] = useState(false)
  const path = business ? `${basePath}/${business.slug}` : basePath

  useSeo({
    title: business ? business.name : notFoundLabel,
    description: business ? business.shortDescription : 'La ficha solicitada no existe.',
    path,
    image: business?.images[0],
    jsonLd: business
      ? placeJsonLd({
          name: business.name,
          description: business.shortDescription,
          path,
          image: business.images[0],
          address: business.address.street,
          latitude: business.coordinates?.latitude,
          longitude: business.coordinates?.longitude,
        })
      : undefined,
  })

  if (!business) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Compass className="w-16 h-16 text-[#28685A]/40 mb-6" aria-hidden="true" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] mb-3">{notFoundLabel}</h1>
          <p className="text-gray-600 max-w-md mb-8">
            La ficha que buscás no existe o fue movida. Volvé al listado para ver todas las opciones.
          </p>
          <Link
            to={basePath}
            className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const verified = business.verificationStatus.status === 'verified'
  const mapsUrl = mapsLink(business)
  const pageUrl = canonicalUrl(path)
  const siblings = (isAccommodation ? accommodations : restaurants).filter((b) => b.id !== business.id)
  const KindIcon = isAccommodation ? Bed : Utensils
  const services = (business.services || []).filter((s) => s !== 'Consultar previamente')

  const handleShare = async () => {
    const shareData = { title: business.name, text: business.shortDescription, url: pageUrl }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
      await navigator.clipboard.writeText(pageUrl)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 2500)
    } catch {
      /* la persona canceló el compartir */
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link
          to={basePath}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#18685A] hover:text-[#102D2B] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {backLabel}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E5E3DC] bg-white">
              <SmartImage
                src={business.images[0]}
                alt={business.name}
                className="w-full h-64 sm:h-96"
                imgClassName="object-cover object-center"
                lazy={false}
                fallbackNote="Fotografía pendiente de incorporar"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#28685A]">
                  <KindIcon className="w-4 h-4" aria-hidden="true" />
                  {business.categoryLabel || (isAccommodation ? 'Alojamiento' : 'Gastronomía')}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  {verified ? 'Información verificada' : 'Pendiente de verificación'}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight leading-tight mt-2">
                {business.name}
              </h1>
              <p className="mt-3 text-sm text-gray-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#18685A] mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {business.address.street || 'Centro urbano'}, {business.address.city || 'Santa María de Fe'},{' '}
                  {business.address.region || 'Misiones'}, {business.address.country || 'Paraguay'}
                </span>
              </p>
            </div>

            <section>
              <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3">Sobre este lugar</h2>
              <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">{business.description}</p>
              {business.address.note && (
                <p className="mt-3 text-xs text-amber-700 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                  {business.address.note}
                </p>
              )}
            </section>

            {services.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3">
                  {isAccommodation ? 'Servicios y comodidades' : 'Qué encontrás'}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map((service) => (
                    <li key={service} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#18685A] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {business.recommendations && business.recommendations.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#28685A]" aria-hidden="true" /> Recomendaciones
                </h2>
                <ul className="space-y-2.5">
                  {business.recommendations.map((rec) => (
                    <li key={rec} className="flex items-start gap-2.5 text-[15px] text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#18685A] mt-1 shrink-0" aria-hidden="true" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#28685A]" aria-hidden="true" /> Fuentes
              </h2>
              <ul className="space-y-2">
                {business.sources.map((src) => (
                  <li key={src.title} className="text-sm">
                    {src.url ? (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#18685A] hover:underline"
                      >
                        {src.title} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-gray-600">{src.title}</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                Última verificación: {business.verificationStatus.lastChecked || 'sin fecha'} ·{' '}
                {business.verificationStatus.source}
              </p>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-[#E5E3DC] shadow-sm p-6 space-y-5">
              <h2 className="font-serif text-xl font-bold text-[#102D2B]">Datos para tu visita</h2>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#102D2B]">Horarios</p>
                    <p className="text-gray-600">{business.openingHours || 'Consultar previamente'}</p>
                    {business.openingHoursNote && (
                      <p className="text-xs text-amber-700 mt-1">{business.openingHoursNote}</p>
                    )}
                  </div>
                </li>
                {business.priceInfo && (
                  <li className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#102D2B]">{isAccommodation ? 'Tarifas' : 'Precios'}</p>
                      <p className="text-gray-600">{business.priceInfo}</p>
                      {business.priceNote && <p className="text-xs text-gray-500 mt-1">{business.priceNote}</p>}
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#102D2B]">Ubicación</p>
                    <p className="text-gray-600">{business.address.street || 'Centro urbano'}</p>
                    {business.coordinates ? (
                      <p className="text-xs text-gray-500 mt-1">
                        {business.coordinates.latitude}, {business.coordinates.longitude}
                        {business.coordinatesSource && (
                          <>
                            <br />
                            <span className="italic">{business.coordinatesSource}</span>
                          </>
                        )}
                      </p>
                    ) : (
                      <p className="text-xs text-amber-700 mt-1">Coordenadas pendientes de verificar.</p>
                    )}
                  </div>
                </li>
                {business.access && (
                  <li className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#102D2B]">Cómo llegar</p>
                      <p className="text-gray-600">{business.access}</p>
                    </div>
                  </li>
                )}
              </ul>

              <div className="space-y-2.5">
                {business.contact?.whatsapp && (
                  <a
                    href={`https://wa.me/${business.contact.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Escribir por WhatsApp
                  </a>
                )}
                {business.contact?.phone && (
                  <a
                    href={`tel:${business.contact.phone.replace(/\s/g, '')}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E3DC] bg-white text-gray-700 hover:border-gray-400 px-5 py-3 text-sm font-semibold transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Llamar {business.contact.phone}
                  </a>
                )}
                {mapsUrl ? (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-5 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    <Navigation className="w-4 h-4" /> Cómo llegar
                  </a>
                ) : (
                  <p className="rounded-full bg-amber-50 border border-amber-200 text-amber-800 px-5 py-3 text-xs font-medium text-center">
                    Ubicación exacta pendiente de verificar
                  </p>
                )}
                {isAccommodation && (business as Accommodation).bookingUrl && (
                  <a
                    href={(business as Accommodation).bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#102D2B] hover:bg-[#183D38] px-5 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    <Bed className="w-4 h-4" /> Consultar disponibilidad
                  </a>
                )}
                {business.contact?.website && (
                  <a
                    href={business.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E3DC] bg-white text-gray-700 hover:border-gray-400 px-5 py-3 text-sm font-semibold transition-colors"
                  >
                    <Globe className="w-4 h-4" /> Sitio oficial
                  </a>
                )}
                {business.contact?.instagram && (
                  <a
                    href={business.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E3DC] bg-white text-gray-700 hover:border-gray-400 px-5 py-3 text-sm font-semibold transition-colors"
                  >
                    <Camera className="w-4 h-4" /> Instagram
                  </a>
                )}
                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E3DC] bg-white text-gray-600 hover:border-gray-400 px-5 py-3 text-sm font-semibold transition-colors"
                >
                  {shareSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  {shareSuccess ? 'Enlace copiado' : 'Compartir ficha'}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {siblings.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-5">
              {isAccommodation ? 'Otros alojamientos' : 'Otros locales'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {siblings.slice(0, 3).map((s) => (
                <Link
                  key={s.id}
                  to={`${basePath}/${s.slug}`}
                  className="group bg-white rounded-2xl border border-[#E5E3DC] overflow-hidden hover:shadow-md transition-shadow"
                >
                  <SmartImage src={s.images[0]} alt={s.name} className="w-full h-36" />
                  <div className="p-4">
                    <h3 className="font-serif text-base font-bold text-[#102D2B] leading-snug">{s.name}</h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{s.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export const AlojamientoDetallePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const business = accommodations.find((a) => a.slug === slug || a.id === slug)
  return (
    <BusinessDetail
      business={business}
      basePath="/hospedajes"
      backLabel="Volver a hospedajes"
      notFoundLabel="Alojamiento no encontrado"
      isAccommodation
    />
  )
}

export const LocalDetallePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const business = restaurants.find((r) => r.slug === slug || r.id === slug)
  return (
    <BusinessDetail
      business={business}
      basePath="/gastronomia"
      backLabel="Volver a gastronomía"
      notFoundLabel="Local no encontrado"
      isAccommodation={false}
    />
  )
}
