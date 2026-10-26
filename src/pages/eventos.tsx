import React from 'react'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { celebrations, EVENTS_DISCLAIMER } from '../data/events'
import { useSeo } from '../hooks/use-seo'
import { CalendarDays, MapPin, AlertTriangle, Info, ExternalLink } from 'lucide-react'

export const EventosPage: React.FC = () => {
  useSeo({
    title: 'Celebraciones tradicionales',
    description:
      'Fiesta patronal del 8 de septiembre, peregrinación al Kurusu Cerro del Viernes Santo y Semana Santa: las celebraciones documentadas de Santa María de Fe, con fuentes y sin eventos inventados.',
    path: '/eventos',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Tradición viva
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Celebraciones y agenda
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Santa María de Fe se mueve al ritmo de sus tradiciones religiosas y comunitarias.
          </p>
        </div>

        {/* Aviso editorial */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6 mb-10 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm text-amber-900 leading-relaxed">{EVENTS_DISCLAIMER}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {celebrations.map((c) => {
            const verified = c.verificationStatus.status === 'verified'
            return (
              <article key={c.id} className="bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden flex flex-col">
                <SmartImage src={c.image} alt={c.title} className="w-full h-52" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {verified ? 'Tradición documentada' : 'A verificar'}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">
                      {c.category === 'religiosa' ? 'Religiosa' : 'Cultural'}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-[#102D2B] mt-3 leading-snug">{c.title}</h2>

                  <p className="text-sm font-semibold text-[#B45309] mt-2 flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" aria-hidden="true" /> {c.when}
                  </p>

                  {c.venue && (
                    <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#28685A]" aria-hidden="true" /> {c.venue}
                    </p>
                  )}

                  <p className="text-sm text-gray-700 mt-3 leading-relaxed flex-1">{c.description}</p>

                  {c.note && (
                    <p className="mt-3 text-xs text-amber-700 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                      {c.note}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-[#E5E3DC] text-[11px] text-gray-500">
                    <ul className="space-y-0.5">
                      {c.sources.map((src) => (
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
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
