import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/layout/header'
import { Footer } from '../../components/layout/footer'
import { places } from '../../data/places'
import { QRCodeComponent } from './qrcode-component'
import { canonicalUrl } from '../../data/site'
import { useSeo } from '../../hooks/use-seo'
import { QrCode, MapPin, ExternalLink, Smartphone, Printer } from 'lucide-react'

/**
 * Generador de placas QR: elegí un lugar, obtené su URL permanente y
 * descargá o imprimí el código. El escaneo en sí lo realiza la cámara
 * del teléfono del visitante; acá no se simula ninguna función.
 */
export const QRScanner: React.FC = () => {
  const [selectedPlaceSlug, setSelectedPlaceSlug] = useState<string>(places[0]?.slug || '')

  useSeo({
    title: 'Códigos QR',
    description:
      'Generá, descargá e imprimí los códigos QR permanentes de cada lugar de Santa María de Fe. Escanealos con la cámara de tu celular para abrir su ficha.',
    path: '/escanear',
  })

  const selectedPlace = places.find((p) => p.slug === selectedPlaceSlug) || places[0]
  const targetUrl = canonicalUrl(`/lugares/${selectedPlace.slug}`)

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102D2B]/10 text-[#102D2B] text-xs font-semibold mb-3">
            <QrCode className="w-4 h-4" /> Códigos QR turísticos
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#102D2B] mb-3">
            Placas QR de los atractivos
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Cada lugar del portal tiene una URL permanente y su código QR. Elegí un monumento, descargá el
            código en PNG o SVG o imprimí la placa lista para colocar.
          </p>
        </div>

        <div className="rounded-xl bg-[#102D2B]/5 border border-[#102D2B]/15 p-4 sm:p-5 mb-8 max-w-3xl mx-auto flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-[#102D2B]">Cómo funciona:</strong> el código QR apunta a la dirección
            permanente de la ficha del lugar (por ejemplo, <span className="font-mono text-xs">{targetUrl}</span>).
            Cualquier celular lo abre con su cámara. En este portal no se simula ningún escaneo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Selector de lugares */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-[#E5E3DC]">
            <h2 className="text-lg font-serif font-bold text-[#102D2B] mb-2">Lugares con ficha propia</h2>
            <p className="text-xs text-gray-500 mb-4">Seleccioná un lugar para generar su placa QR:</p>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {places.map((place) => (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlaceSlug(place.slug)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left border transition-all ${
                    selectedPlace.slug === place.slug
                      ? 'border-[#102D2B] bg-[#102D2B]/5 text-[#102D2B] font-medium shadow-sm'
                      : 'border-transparent hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1c4a42] to-[#102D2B] flex items-center justify-center text-emerald-200 flex-shrink-0 overflow-hidden"
                    aria-hidden="true"
                  >
                    <img
                      src={place.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold truncate">{place.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#28685A]" /> Santa María de Fe
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Placa QR */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E5E3DC] flex flex-col items-center">
            <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
                  Vista de placa
                </span>
                <h3 className="text-xl font-serif font-bold text-[#102D2B]">{selectedPlace.name}</h3>
              </div>
              <Link
                to={`/lugares/${selectedPlace.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#28685A] hover:underline"
              >
                Abrir ficha <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <QRCodeComponent
              value={targetUrl}
              title={selectedPlace.name}
              subtitle="Santa María de Fe · Misiones"
              size={200}
              showPlaque
              showActions
            />

            <p className="mt-6 text-xs text-gray-500 text-center max-w-md flex items-center gap-1.5 justify-center">
              <Printer className="w-4 h-4 text-[#28685A]" aria-hidden="true" />
              La vista imprimible muestra solo la placa con el nombre y el código del lugar.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
