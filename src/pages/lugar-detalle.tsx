import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { placeFromSlug, places } from '../data/places'
import { QRCodeComponent } from '../features/qr/qrcode-component'
import { canonicalUrl } from '../data/site'
import { useSeo, placeJsonLd } from '../hooks/use-seo'
import {
  MapPin,
  Clock,
  Tag,
  Navigation,
  Share2,
  QrCode,
  ArrowLeft,
  X,
  Compass,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Phone,
  Lightbulb,
  GalleryHorizontal,
} from 'lucide-react'

export const PlaceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const place = placeFromSlug(slug || '')
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null)
  const [showQrModal, setShowQrModal] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [showAllGallery, setShowAllGallery] = useState(false)

  useSeo({
    title: place ? place.name : 'Lugar no encontrado',
    description: place ? place.shortDescription : 'La ficha solicitada no existe.',
    path: place ? `/lugares/${place.slug}` : '/lugares',
    image: place?.images[0],
    jsonLd: place
      ? placeJsonLd({
          name: place.name,
          description: place.shortDescription,
          path: `/lugares/${place.slug}`,
          image: place.images[0],
          address: place.address.street,
          latitude: place.coordinates?.latitude,
          longitude: place.coordinates?.longitude,
        })
      : undefined,
  })

  if (!place) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Compass className="w-16 h-16 text-[#28685A]/40 mb-6" aria-hidden="true" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] mb-3">
            Lugar no encontrado
          </h1>
          <p className="text-gray-600 max-w-md mb-8">
            La ficha que buscás no existe o fue movida. Explorá el catálogo completo de lugares.
          </p>
          <Link
            to="/lugares"
            className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Ver todos los lugares
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const placeUrl = canonicalUrl(`/lugares/${place.slug}`)
  const mapUrl = place.coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${place.coordinates.latitude},${place.coordinates.longitude}`
    : null

  const gallery = showAllGallery ? place.images : place.images.slice(0, 3)

  const handleShare = async () => {
    const shareData = { title: place.name, text: place.shortDescription, url: placeUrl }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
      await navigator.clipboard.writeText(placeUrl)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 2500)
    } catch {
      /* el usuario canceló el compartir */
    }
  }

  const verification = place.verificationStatus

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Link
          to="/lugares"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#18685A] hover:text-[#102D2B] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>

        {/* Hero image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E5E3DC] bg-white">
          <SmartImage
            src={place.images[0]}
            alt={place.name}
            className="w-full h-64 sm:h-96 lg:h-[420px]"
            imgClassName="object-cover object-center"
            lazy={false}
            fallbackNote="Fotografía pendiente de incorporar"
          />
        </div>

        {/* Title + location */}
        <div className="mt-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            {place.categoryLabel}
          </span>
          <div className="flex items-start gap-3 mt-2">
            <MapPin className="w-7 h-7 text-[#18685A] mt-1 shrink-0" aria-hidden="true" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight leading-tight">
              {place.name}
            </h1>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span>
              {place.address.street ? `${place.address.street}, ` : ''}
              Santa María de Fe, Misiones, Paraguay
            </span>
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#18685A]/10 text-[#18685A] px-3 py-1.5 text-xs font-semibold hover:bg-[#18685A]/20 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" /> Ver en mapa
              </a>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                verification.status === 'verified'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {verification.status === 'verified' ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5" />
              )}
              {verification.status === 'verified' ? 'Información verificada' : 'Pendiente de verificación'}
            </span>
          </div>
        </div>

        {/* Two-column body */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: descripción, historia, galería, recomendaciones, fuentes */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3">Descripción</h2>
              <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                {place.description}
              </p>
            </section>

            {place.history && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3">Historia</h2>
                <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                  {place.history}
                </p>
              </section>
            )}

            {/* Galería */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-serif text-2xl font-bold text-[#102D2B] flex items-center gap-2">
                  <GalleryHorizontal className="w-5 h-5 text-[#28685A]" aria-hidden="true" /> Galería
                </h2>
                {place.images.length > 3 && (
                  <button
                    onClick={() => setShowAllGallery(!showAllGallery)}
                    className="text-sm font-semibold text-[#18685A] hover:text-[#102D2B]"
                  >
                    {showAllGallery ? 'Ver menos' : `Ver galería completa (${place.images.length})`}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {gallery.map((img, index) => (
                  <button
                    key={img}
                    onClick={() => setSelectedGalleryImg(img)}
                    className="rounded-xl overflow-hidden border border-[#E5E3DC] hover:ring-2 hover:ring-[#18685A]/60 transition-all"
                    aria-label={`Ampliar fotografía ${index + 1} de ${place.name}`}
                  >
                    <SmartImage src={img} alt={`${place.name} — fotografía ${index + 1}`} className="w-full h-28 sm:h-36" />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Fotografías con sujeto verificado. Créditos y licencias en las fuentes del portal.
              </p>
            </section>

            {/* Indicaciones */}
            {place.access && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-[#28685A]" aria-hidden="true" /> Cómo llegar
                </h2>
                <p className="text-[15px] leading-relaxed text-gray-700">{place.access}</p>
              </section>
            )}

            {/* Recomendaciones */}
            {place.recommendations && place.recommendations.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#28685A]" aria-hidden="true" /> Recomendaciones
                </h2>
                <ul className="space-y-2.5">
                  {place.recommendations.map((rec) => (
                    <li key={rec} className="flex items-start gap-2.5 text-[15px] text-gray-700">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#18685A] mt-1 shrink-0" aria-hidden="true" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Fuentes */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#28685A]" aria-hidden="true" /> Fuentes
              </h2>
              <ul className="space-y-2">
                {place.sources.map((src) => (
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
                Última verificación: {place.verificationStatus.lastChecked} · Estado:{' '}
                {verification.source}
              </p>
            </section>
          </div>

          {/* Right: Información útil */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-[#E5E3DC] shadow-sm p-6">
              <h2 className="font-serif text-xl font-bold text-[#102D2B] mb-5">Información útil</h2>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#102D2B]">Horarios</p>
                    <p className="text-gray-600">{place.openingHours || 'Consultar previamente'}</p>
                    {place.openingHoursNote && (
                      <p className="text-xs text-amber-700 mt-1">{place.openingHoursNote}</p>
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#102D2B]">Ubicación</p>
                    <p className="text-gray-600">
                      {place.address.street || 'Centro urbano'}, Santa María de Fe
                    </p>
                    {place.coordinates ? (
                      <p className="text-xs text-gray-500 mt-1">
                        Coordenadas: {place.coordinates.latitude}, {place.coordinates.longitude}
                        <br />
                        <span className="italic">{place.coordinatesSource}</span>
                      </p>
                    ) : (
                      <p className="text-xs text-amber-700 mt-1">
                        Coordenadas pendientes de verificar. No figura en el mapa del portal.
                      </p>
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#102D2B]">Categoría</p>
                    <p className="text-gray-600">{place.categoryLabel}</p>
                  </div>
                </li>
                {place.contact?.phone && (
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#102D2B]">Contacto</p>
                      <a
                        href={`tel:${place.contact.phone.replace(/\s/g, '')}`}
                        className="text-[#18685A] hover:underline"
                      >
                        {place.contact.phone}
                      </a>
                    </div>
                  </li>
                )}
                {place.priceInfo && (
                  <li className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#102D2B]">Tarifas</p>
                      <p className="text-gray-600">{place.priceInfo}</p>
                      {place.priceNote && <p className="text-xs text-gray-500 mt-1">{place.priceNote}</p>}
                    </div>
                  </li>
                )}
              </ul>

              <div className="mt-6 space-y-3">
                {mapUrl ? (
                  <a
                    href={mapUrl}
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

                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E3DC] bg-white text-gray-600 hover:border-gray-400 px-5 py-3 text-sm font-semibold transition-colors"
                >
                  {shareSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  {shareSuccess ? 'Enlace copiado' : 'Compartir'}
                </button>

                <button
                  onClick={() => setShowQrModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E3DC] bg-white text-gray-600 hover:border-gray-400 px-5 py-3 text-sm font-semibold transition-colors"
                >
                  <QrCode className="w-4 h-4" /> Ver código QR
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-2xl bg-[#102D2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Compass className="w-8 h-8 text-emerald-300 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl font-bold">¿Querés seguir explorando?</p>
              <p className="text-sm text-[#E5E3DC]/80">
                Descubrí todos los atractivos y planificá tu recorrido por el distrito.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/recorridos"
              className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold transition-colors"
            >
              Ver recorridos
            </Link>
            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 hover:bg-white/10 px-6 py-3 text-sm font-semibold transition-colors"
            >
              Abrir el mapa
            </Link>
          </div>
        </div>

        {/* Lugares relacionados */}
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-5">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {places
              .filter((p) => p.id !== place.id && p.category === place.category)
              .concat(places.filter((p) => p.id !== place.id && p.category !== place.category))
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/lugares/${p.slug}`}
                  className="group bg-white rounded-2xl border border-[#E5E3DC] overflow-hidden hover:shadow-md transition-shadow"
                >
                  <SmartImage src={p.images[0]} alt={p.name} className="w-full h-36" />
                  <div className="p-4">
                    <h3 className="font-serif text-base font-bold text-[#102D2B] leading-snug">{p.name}</h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{p.shortDescription}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>

      {/* Modal galería */}
      {selectedGalleryImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImg(null)}
          role="dialog"
          aria-label="Fotografía ampliada"
        >
          <button
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
          <SmartImage
            src={selectedGalleryImg}
            alt={`${place.name} — fotografía ampliada`}
            className="max-w-5xl max-h-[85vh] w-auto h-auto rounded-xl"
            imgClassName="object-contain"
            lazy={false}
          />
        </div>
      )}

      {/* Modal QR */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-[#0b1f1d]/90 flex items-center justify-center p-4"
          role="dialog"
          aria-label={`Código QR de ${place.name}`}
        >
          <div className="bg-[#F7F4ED] rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-gray-500"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl font-bold text-[#102D2B] text-center mb-1">
              Código QR
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Escaneá para abrir la ficha permanente en cualquier dispositivo.
            </p>
            <QRCodeComponent
              value={placeUrl}
              title={place.name}
              subtitle="Santa María de Fe · Misiones"
              size={200}
              showPlaque
              showActions
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
