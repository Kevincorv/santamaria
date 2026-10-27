import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { accommodations } from '../data/accommodations'
import { useSeo } from '../hooks/use-seo'
import {
  MapPin,
  Phone,
  MessageCircle,
  Bed,
  Check,
  ExternalLink,
  Globe,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Navigation,
} from 'lucide-react'

export const HospedajesPage: React.FC = () => {
  useSeo({
    title: 'Hoteles y hospedajes',
    description:
      'Directorio de alojamientos de Santa María de Fe: Santa María Hotel (tarifas 2026 publicadas), Hospedaje Aguará, Posada Tío Lalo y Posada ÑandeRoga, con contactos, fichas individuales y fuentes.',
    path: '/hospedajes',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Turismo solidario
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Hoteles y hospedaje
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Encontrá el lugar ideal para tu estadía en Santa María de Fe. Todos los establecimientos
            listados operan realmente en el distrito o se indica claramente la discrepancia de sus fuentes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {accommodations.map((a) => {
            const verified = a.verificationStatus.status === 'verified'
            // Destino de Google Maps: coordenadas verificadas si existen; si no,
            // la dirección publicada (nombre + calle + ciudad).
            const mapsDestination = a.coordinates
              ? `${a.coordinates.latitude},${a.coordinates.longitude}`
              : [a.name, a.address.street, a.address.city, a.address.region, a.address.country]
                  .filter(Boolean)
                  .join(', ')
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              mapsDestination
            )}`
            return (
              <article
                key={a.id}
                className="bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden flex flex-col"
              >
                <Link to={`/hospedajes/${a.slug}`} className="block">
                  <SmartImage src={a.images[0]} alt={a.name} className="w-full h-[220px]" />
                </Link>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">
                        {a.categoryLabel}
                      </span>
                      <h2 className="font-serif text-xl font-bold text-[#102D2B] mt-1">
                        <Link to={`/hospedajes/${a.slug}`} className="hover:text-[#18685A] transition-colors">
                          {a.name}
                        </Link>
                      </h2>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shrink-0 ${
                        verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      {verified ? 'Verificado' : 'A verificar'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{a.shortDescription}</p>

                  {a.priceInfo && (
                    <div className="mt-4 rounded-xl bg-[#F7F4ED] border border-[#E5E3DC] p-3">
                      <p className="text-sm font-semibold text-[#102D2B]">{a.priceInfo}</p>
                      {a.priceNote && <p className="text-xs text-gray-500 mt-1">{a.priceNote}</p>}
                    </div>
                  )}

                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {a.services.filter((s) => s !== 'Consultar previamente').slice(0, 8).map((service) => (
                      <li key={service} className="flex items-start gap-2 text-xs text-gray-600">
                        <Check className="w-3.5 h-3.5 text-[#18685A] mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>

                  {a.address.note && (
                    <p className="mt-3 text-xs text-amber-700 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                      {a.address.note}
                    </p>
                  )}

                  <div className="mt-auto pt-5 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {a.contact?.phone && (
                        <a
                          href={`tel:${a.contact.phone.replace(/\s/g, '')}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] px-4 py-2 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" /> {a.contact.phone}
                        </a>
                      )}
                      {a.contact?.whatsapp && (
                        <a
                          href={`https://wa.me/${a.contact.whatsapp.replace(/[^\d]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </a>
                      )}
                      {a.contact?.website && (
                        <a
                          href={a.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] px-4 py-2 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" /> Sitio oficial <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {a.contact?.instagram && (
                        <a
                          href={a.contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] px-4 py-2 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors"
                        >
                          <Camera className="w-3.5 h-3.5" /> Instagram
                        </a>
                      )}
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#18685A] hover:bg-[#22806d] px-4 py-2 text-xs font-semibold text-white transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" /> Cómo llegar
                      </a>
                      <Link
                        to={`/hospedajes/${a.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#18685A]/30 text-[#18685A] hover:bg-[#18685A]/10 px-4 py-2 text-xs font-semibold transition-colors"
                      >
                        Ver ficha completa
                      </Link>
                      {a.bookingUrl && (
                        <a
                          href={a.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#102D2B] hover:bg-[#183D38] px-4 py-2 text-xs font-semibold text-white transition-colors"
                        >
                          <Bed className="w-3.5 h-3.5" /> Consultar disponibilidad
                        </a>
                      )}
                    </div>

                    <div className="text-[11px] text-gray-500 border-t border-[#E5E3DC] pt-3">
                      <p className="font-semibold text-gray-600">Fuentes:</p>
                      <ul className="mt-1 space-y-0.5">
                        {a.sources.map((src) => (
                          <li key={src.title}>
                            {src.url ? (
                              <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#18685A] hover:underline inline-flex items-center gap-1">
                                {src.title} <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              src.title
                            )}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-1">Última verificación: {a.verificationStatus.lastChecked}</p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl bg-[#102D2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <MapPin className="w-8 h-8 text-emerald-300 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl font-bold">¿Dónde están en el mapa?</p>
              <p className="text-sm text-[#E5E3DC]/80">
                Los alojamientos con coordenadas verificadas aparecen en el mapa interactivo del portal.
              </p>
            </div>
          </div>
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold transition-colors"
          >
            Abrir el mapa <Navigation className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
