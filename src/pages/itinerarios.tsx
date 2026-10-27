import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { itineraries } from '../data/itineraries'
import { useSeo } from '../hooks/use-seo'
import {
  ArrowRight,
  Clock,
  Coins,
  Info,
  Lightbulb,
  MapPin,
  Navigation,
  Route,
  CalendarDays,
} from 'lucide-react'

export const ItinerariosPage: React.FC = () => {
  useSeo({
    title: 'Itinerarios',
    description:
      'Tres itinerarios por Santa María de Fe: 2 horas, medio día y fin de semana completo, con duración, horarios sugeridos, costos orientativos y enlaces a cada ficha.',
    path: '/itinerarios',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Planeá tu visita
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Itinerarios armados
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Tres formas de recorrer Santa María de Fe según el tiempo que tengas. Las duraciones son
            estimaciones y los costos solo incluyen tarifas publicadas: todo lo demás se confirma en el
            lugar.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-10 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm text-amber-900 leading-relaxed">
            Estos itinerarios son orientativos y no reemplazan una excursión guiada. Antes de salir,
            verificá horarios del museo, estado de los caminos y disponibilidad de los locales.
          </p>
        </div>

        <div className="space-y-12">
          {itineraries.map((it, index) => (
            <article
              key={it.id}
              className="bg-white rounded-3xl border border-[#E5E3DC] shadow-sm overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <SmartImage
                    src={it.image}
                    alt={it.title}
                    className="w-full h-[220px] lg:h-full"
                    imgClassName="object-cover object-center"
                  />
                </div>
                <div className="lg:col-span-2 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-[#18685A] text-white px-3 py-1 font-semibold">
                      Plan {index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#28685A] font-semibold">
                      <Clock className="w-4 h-4" aria-hidden="true" /> {it.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-gray-500">
                      <CalendarDays className="w-4 h-4" aria-hidden="true" /> {it.bestFor}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#102D2B] mt-3">
                    {it.title}
                  </h2>
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">{it.summary}</p>

                  <ol className="mt-6 space-y-4 border-l-2 border-[#CFE3DC] pl-5">
                    {it.stops.map((stop) => (
                      <li key={`${it.id}-${stop.name}`} className="relative">
                        <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#18685A] ring-4 ring-white" />
                        {stop.time && (
                          <p className="text-[11px] uppercase tracking-wider font-semibold text-[#B45309]">
                            {stop.time}
                          </p>
                        )}
                        <div className="flex items-start gap-2 flex-wrap">
                          <p className="font-semibold text-[#102D2B]">
                            {stop.href ? (
                              <Link to={stop.href} className="hover:text-[#18685A] hover:underline">
                                {stop.name}
                              </Link>
                            ) : (
                              stop.name
                            )}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                            <Coins className="w-3 h-3" aria-hidden="true" /> {stop.cost}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{stop.detail}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 rounded-xl bg-[#F7F4ED] border border-[#E5E3DC] p-4">
                    <p className="text-xs font-semibold text-[#102D2B] flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-[#B45309]" aria-hidden="true" /> {it.totalCost}
                    </p>
                    {it.note && <p className="text-[11px] text-gray-500 mt-1">{it.note}</p>}
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-[#102D2B] flex items-center gap-1.5 mb-2">
                      <Lightbulb className="w-4 h-4 text-[#28685A]" aria-hidden="true" /> Consejos
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {it.tips.map((tip) => (
                        <li key={tip} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="text-[#18685A] font-bold">·</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[#102D2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Route className="w-8 h-8 text-emerald-300 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl font-bold">¿Querés seguir armando tu recorrido?</p>
              <p className="text-sm text-[#E5E3DC]/80">
                Mirá los circuitos autoguiados y el mapa interactivo con todos los puntos.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/recorridos"
              className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold transition-colors"
            >
              Recorridos <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 hover:bg-white/10 px-6 py-3 text-sm font-semibold transition-colors"
            >
              <MapPin className="w-4 h-4" /> Abrir mapa
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
