import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { historyTimeline, historicalFigures, historySections, districtFacts } from '../data/history'
import { useSeo } from '../hooks/use-seo'
import { BookOpen, User, AlertTriangle, ExternalLink, ArrowRight, Landmark } from 'lucide-react'

export const HistoriaPage: React.FC = () => {
  useSeo({
    title: 'Historia y patrimonio',
    description:
      'Cronología de Santa María de Fe: la reducción de Nuestra Señora del Taré (1647), el éxodo de 1669, José Agustín Molas, Aimé Bonpland, el incendio de 1889 y el museo de arte jesuítico guaraní, con fuentes y discrepancias señaladas.',
    path: '/historia',
    image: '/images/commons/museo-esculturas-grupo.jpg',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero editorial */}
        <div className="relative rounded-3xl overflow-hidden bg-[#102D2B] text-white p-8 sm:p-14 mb-14 shadow-lg">
          <div className="absolute inset-0 opacity-30">
            <SmartImage
              src="/images/commons/museo-esculturas-grupo.jpg"
              alt=""
              className="w-full h-full"
              imgClassName="object-cover"
            />
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="font-script text-3xl sm:text-4xl text-amber-200 block mb-2">
              Patrimonio vivo
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Historia de Santa María de Fe
            </h1>
            <p className="mt-5 text-[#E5E3DC]/90 leading-relaxed">
              Casi cuatro siglos de historia en la antigua reducción de Nuestra Señora del Taré: desde su
              fundación jesuítico-guaraní hasta el reconocimiento internacional de su turismo comunitario.
              Cuando las fuentes discrepan, lo señalamos en lugar de ocultarlo.
            </p>
          </div>
        </div>

        {/* Datos del distrito */}
        <section className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-5 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#28685A]" aria-hidden="true" /> El distrito en datos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {districtFacts.map((fact) => (
              <div key={fact.label} className="bg-white rounded-xl border border-[#E5E3DC] p-4">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">
                  {fact.label}
                </p>
                <p className="font-serif text-lg font-bold text-[#102D2B] mt-1 leading-snug">{fact.value}</p>
                <p className="text-[10px] text-gray-400 mt-1">Fuente: {fact.source}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cronología */}
          <section className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-6">Cronología</h2>
            <ol className="relative border-l-2 border-[#E5E3DC] ml-3 space-y-8">
              {historyTimeline.map((event) => (
                <li key={`${event.year}-${event.title}`} className="relative pl-6">
                  <span
                    className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white ${
                      event.highlight ? 'bg-[#18685A]' : 'bg-[#28685A]/50'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="bg-white rounded-2xl border border-[#E5E3DC] p-5">
                    <span className="font-serif text-sm font-bold text-[#B45309]">{event.year}</span>
                    <h3 className="font-serif text-lg font-bold text-[#102D2B] mt-1 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">{event.description}</p>
                    {event.conflict && (
                      <p className="mt-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                        {event.conflict}
                      </p>
                    )}
                    <ul className="mt-3 space-y-0.5">
                      {event.sources.map((src) => (
                        <li key={src.title} className="text-[11px]">
                          {src.url ? (
                            <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#18685A] hover:underline inline-flex items-center gap-1">
                              {src.title} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <span className="text-gray-500">{src.title}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Columna lateral */}
          <aside className="space-y-10">
            <section>
              <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-5 flex items-center gap-2">
                <User className="w-6 h-6 text-[#28685A]" aria-hidden="true" /> Figuras históricas
              </h2>
              <div className="space-y-5">
                {historicalFigures.map((fig) => (
                  <div key={fig.name} className="bg-white rounded-2xl border border-[#E5E3DC] p-5">
                    <h3 className="font-serif text-lg font-bold text-[#102D2B]">{fig.name}</h3>
                    <p className="text-xs font-semibold text-[#28685A] mt-0.5">
                      {fig.role} · {fig.period}
                    </p>
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">{fig.bio}</p>
                    <p className="text-xs text-gray-600 mt-2 italic">{fig.legacy}</p>
                    {fig.conflict && (
                      <p className="mt-2 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-start gap-1.5">
                        <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" aria-hidden="true" />
                        {fig.conflict}
                      </p>
                    )}
                    <ul className="mt-2 space-y-0.5">
                      {fig.sources.map((src) => (
                        <li key={src.title} className="text-[11px]">
                          {src.url ? (
                            <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#18685A] hover:underline">
                              {src.title}
                            </a>
                          ) : (
                            <span className="text-gray-500">{src.title}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-5 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#28685A]" aria-hidden="true" /> Contextos
              </h2>
              <div className="space-y-5">
                {historySections.map((sec) => (
                  <div key={sec.title} className="bg-white rounded-2xl border border-[#E5E3DC] p-5">
                    <h3 className="font-serif text-lg font-bold text-[#102D2B]">{sec.title}</h3>
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">{sec.body}</p>
                    <ul className="mt-2 space-y-0.5">
                      {sec.sources.map((src) => (
                        <li key={src.title} className="text-[11px]">
                          {src.url ? (
                            <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#18685A] hover:underline">
                              {src.title}
                            </a>
                          ) : (
                            <span className="text-gray-500">{src.title}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <div className="mt-14 rounded-2xl bg-[#102D2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-emerald-300 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl font-bold">¿Querés ver la historia en persona?</p>
              <p className="text-sm text-[#E5E3DC]/80">
                El museo de arte jesuítico guaraní guarda las imágenes rescatadas del incendio de 1889.
              </p>
            </div>
          </div>
          <Link
            to="/lugares/museo-diocesano"
            className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold transition-colors"
          >
            Ver el museo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
