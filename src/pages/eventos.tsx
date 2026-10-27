import React from 'react'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { celebrations, EVENTS_DISCLAIMER } from '../data/events'
import { useSeo } from '../hooks/use-seo'
import { CalendarDays, MapPin, AlertTriangle, Info, ExternalLink, Clock, PartyPopper } from 'lucide-react'

/** Domingo de Pascua (algoritmo gregoriano anónimo). */
const easterSunday = (year: number): Date => {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

const formatDate = (date: Date): string =>
  date.toLocaleDateString('es-PY', { day: 'numeric', month: 'long', year: 'numeric' })

const nextGoodFriday = (): Date => {
  const today = new Date()
  const easter = easterSunday(today.getFullYear())
  const goodFriday = new Date(easter)
  goodFriday.setDate(easter.getDate() - 2)
  if (goodFriday < today) {
    const nextEaster = easterSunday(today.getFullYear() + 1)
    const next = new Date(nextEaster)
    next.setDate(nextEaster.getDate() - 2)
    return next
  }
  return goodFriday
}

const nextPatronDay = (): Date => {
  const today = new Date()
  const candidate = new Date(today.getFullYear(), 8, 8)
  if (candidate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    return new Date(today.getFullYear() + 1, 8, 8)
  }
  return candidate
}

export const EventosPage: React.FC = () => {
  useSeo({
    title: 'Agenda y celebraciones',
    description:
      'Agenda de Santa María de Fe: fiesta patronal del 8 de septiembre, peregrinación al Kurusu Cerro del Viernes Santo y Semana Santa. Fechas calculadas, horarios publicados y fuentes.',
    path: '/eventos',
  })

  const goodFriday = nextGoodFriday()
  const patronDay = nextPatronDay()

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Tradición viva
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Agenda y celebraciones
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Las dos citas que mueven al pueblo, con la fecha ya calculada para la próxima edición. Los
            horarios publicados se muestran tal como fueron informados; el resto se confirma con la
            parroquia o la Municipalidad.
          </p>
        </div>

        {/* Próximas fechas */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-5 flex items-center gap-2">
            <PartyPopper className="w-6 h-6 text-[#B45309]" aria-hidden="true" /> Próximas fechas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="rounded-2xl bg-[#102D2B] text-white p-6 sm:p-7 flex flex-col">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-300">
                Peregrinación
              </span>
              <p className="font-serif text-3xl sm:text-4xl font-bold leading-tight mt-2">
                {formatDate(goodFriday)}
              </p>
              <p className="text-sm text-[#E5E3DC]/85 mt-1">Viernes Santo · Kurusu Cerro</p>
              <p className="text-sm text-[#E5E3DC]/80 mt-3 leading-relaxed flex-1">
                Ascenso desde la madrugada, con salida tradicional desde el centro. El ingreso al cerro es
                gratuito y en la base se instalan artesanos y estacionamientos.
              </p>
              <p className="text-[11px] text-emerald-300/80 mt-4">
                Fecha calculada según el calendario litúrgico. Confirmá el programa con la parroquia.
              </p>
            </article>

            <article className="rounded-2xl bg-white border border-[#E5E3DC] p-6 sm:p-7 flex flex-col">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">
                Fiesta patronal
              </span>
              <p className="font-serif text-3xl sm:text-4xl font-bold leading-tight mt-2 text-[#102D2B]">
                {formatDate(patronDay)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Natividad de la Santísima Virgen · 8 de septiembre</p>
              <p className="text-sm text-gray-700 mt-3 leading-relaxed flex-1">
                Procesión y misa mayor en la iglesia parroquial, frente a la Plaza Mariscal Estigarribia.
                La fecha coincide con el aniversario de la fundación de la reducción (1647).
              </p>
              <p className="text-[11px] text-gray-500 mt-4">
                En 2026 el programa publicado indicó procesión a las 08:00 y misa solemne a las 09:00.
              </p>
            </article>
          </div>
        </section>

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

                  {c.schedule && (
                    <p className="text-xs text-gray-600 mt-1.5 flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />{' '}
                      {c.schedule}
                    </p>
                  )}

                  <p className="text-sm text-gray-700 mt-3 leading-relaxed flex-1">{c.description}</p>

                  {c.note && (
                    <p className="mt-3 text-xs text-amber-700 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                      {c.note}
                    </p>
                  )}

                  <details className="mt-4 pt-3 border-t border-[#E5E3DC] text-[11px] text-gray-500">
                    <summary className="cursor-pointer font-semibold text-gray-600 hover:text-[#18685A]">
                      Fuentes y verificación
                    </summary>
                    <ul className="mt-2 space-y-0.5">
                      {c.sources.map((src) => (
                        <li key={src.title}>
                          {src.url ? (
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#18685A] hover:underline inline-flex items-center gap-1"
                            >
                              {src.title} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            src.title
                          )}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1">Última verificación: {c.verificationStatus.lastChecked}</p>
                  </details>
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
