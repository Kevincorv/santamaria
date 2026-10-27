import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { tours } from '../data/tours'
import { placeFromSlug } from '../data/places'
import { useSeo } from '../hooks/use-seo'
import { Compass, MapPin, Clock, ArrowRight, AlertTriangle, CheckCircle2, Route } from 'lucide-react'

export const RecorridosPage: React.FC = () => {
  useSeo({
    title: 'Recorridos autoguiados',
    description:
      'Circuitos a pie y en vehículo por Santa María de Fe: circuito histórico jesuítico, espiritualidad y artesanía, naturaleza y Kurusu Cerro, y la ruta de Bonpland.',
    path: '/recorridos',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Planeá tu visita
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Recorridos autoguiados
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Circuitos armados con los lugares reales del portal, ordenados para caminar o moverte en vehículo.
            Las duraciones son estimaciones, no servicios contratados.
          </p>
        </div>

        <div className="space-y-8">
          {tours.map((tour) => {
            const verified = tour.verificationStatus.status === 'verified'
            const stops = tour.stopSlugs
              .map((slug) => placeFromSlug(slug))
              .filter((p): p is NonNullable<typeof p> => Boolean(p))

            return (
              <article key={tour.id} className="bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">
                  <SmartImage src={tour.image} alt={tour.title} className="w-full h-[220px] md:h-full" />

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">
                        Recorrido autoguiado
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {verified ? 'Lugares verificados' : 'Verificar acceso'}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-[#102D2B] mt-2">{tour.title}</h2>
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">{tour.description}</p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
                      {tour.estimatedDuration && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#28685A]" aria-hidden="true" /> {tour.estimatedDuration}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <Route className="w-4 h-4 text-[#28685A]" aria-hidden="true" /> {stops.length} paradas
                      </span>
                    </div>

                    {/* Paradas */}
                    <ol className="mt-5 space-y-2">
                      {stops.map((stop, index) => (
                        <li key={stop.id} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#102D2B] text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <div>
                            <Link
                              to={`/lugares/${stop.slug}`}
                              className="font-semibold text-[#102D2B] hover:text-[#18685A] text-sm"
                            >
                              {stop.name}
                            </Link>
                            <p className="text-xs text-gray-600 line-clamp-2">{stop.shortDescription}</p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    {tour.note && (
                      <p className="mt-4 text-xs text-amber-700 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                        {tour.note}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        to={`/lugares/${tour.stopSlugs[0]}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                      >
                        Empezar recorrido <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        to="/mapa"
                        className="inline-flex items-center gap-2 rounded-full border border-[#E5E3DC] text-gray-600 hover:border-gray-400 px-5 py-2.5 text-sm font-semibold transition-colors"
                      >
                        <MapPin className="w-4 h-4" /> Ver en el mapa
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-[#102D2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Compass className="w-8 h-8 text-emerald-300 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl font-bold">Llevá el mapa en el celular</p>
              <p className="text-sm text-[#E5E3DC]/80">
                Instalá la aplicación y consultá las fichas aunque no tengas señal.
              </p>
            </div>
          </div>
          <Link
            to="/instalar"
            className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold transition-colors"
          >
            Cómo instalarla <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
