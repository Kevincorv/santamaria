import React from 'react'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { crafts, experiences } from '../data/crafts'
import { useSeo } from '../hooks/use-seo'
import {
  Scissors,
  Sparkles,
  ExternalLink,
  Phone,
  Camera,
  Mail,
  AlertTriangle,
  CheckCircle2,
  Compass,
} from 'lucide-react'

export const ArtesaniaPage: React.FC = () => {
  useSeo({
    title: 'Artesanías, productos y experiencias',
    description:
      'Taller de Hermandad, tapices de Santa María, Taller del Monasterio, azúcar orgánica Hibernia y experiencias culturales: artesanías y productos reales de Santa María de Fe con sus fuentes y contactos.',
    path: '/artesania',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Manos marienses
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Artesanías, productos y experiencias
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Bordados, tapices, dulces a leña y azúcar orgánica: la comunidad transforma su patrimonio en
            trabajo digno. Solo se muestran contactos que existen públicamente; no hay tiendas online inventadas.
          </p>
        </div>

        {/* Artesanías y productos */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-6 flex items-center gap-2">
            <Scissors className="w-6 h-6 text-[#7C3AED]" aria-hidden="true" /> Talleres y productos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crafts.map((c) => {
              const verified = c.verificationStatus.status === 'verified'
              return (
                <article
                  key={c.id}
                  className="bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden flex flex-col"
                >
                  <SmartImage src={c.image} alt={c.name} className="w-full h-48" />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl font-bold text-[#102D2B] leading-snug">{c.name}</h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shrink-0 ${
                          verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {verified ? 'Verificado' : 'A verificar'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 leading-relaxed flex-1">{c.description}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {c.products.map((p) => (
                        <li
                          key={p}
                          className="rounded-full bg-[#F7F4ED] border border-[#E5E3DC] px-3 py-1 text-[11px] font-medium text-gray-600"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.contact?.phone && (
                        <a
                          href={`tel:${c.contact.phone.replace(/\s/g, '')}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] px-4 py-2 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" /> {c.contact.phone}
                        </a>
                      )}
                      {c.contact?.email && (
                        <a
                          href={`mailto:${c.contact.email}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] px-4 py-2 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" /> {c.contact.email}
                        </a>
                      )}
                      {c.contact?.instagram && (
                        <a
                          href={c.contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] px-4 py-2 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors"
                        >
                          <Camera className="w-3.5 h-3.5" /> Instagram <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="mt-auto pt-4 text-[11px] text-gray-500 border-t border-[#E5E3DC] mt-4">
                      <ul className="space-y-0.5">
                        {c.sources.map((src) => (
                          <li key={src.title}>
                            {src.url ? (
                              <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-[#18685A] hover:underline">
                                {src.title}
                              </a>
                            ) : (
                              src.title
                            )}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-1">Última verificación: {c.verificationStatus.lastChecked}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Experiencias */}
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#28685A]" aria-hidden="true" /> Experiencias
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((e) => (
              <article key={e.id} className="bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden flex flex-col">
                <SmartImage src={e.image} alt={e.name} className="w-full h-40" />
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">{e.kind}</span>
                  <h3 className="font-serif text-base font-bold text-[#102D2B] mt-1.5 leading-snug">{e.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed flex-1 line-clamp-3">{e.description}</p>
                  {e.note && <p className="text-[11px] text-amber-700 mt-2">{e.note}</p>}
                  <div className="mt-3 text-[11px] text-gray-500">
                    {e.sources[0]?.url ? (
                      <a href={e.sources[0].url} target="_blank" rel="noopener noreferrer" className="text-[#18685A] hover:underline inline-flex items-center gap-1">
                        Fuente <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      e.sources[0]?.title
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl bg-[#102D2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Compass className="w-8 h-8 text-emerald-300 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl font-bold">¿Querés vivir estas experiencias?</p>
              <p className="text-sm text-[#E5E3DC]/80">
                Los recorridos autoguiados incluyen talleres, museo y naturaleza.
              </p>
            </div>
          </div>
          <a
            href="/recorridos"
            className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold transition-colors"
          >
            Ver recorridos
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
