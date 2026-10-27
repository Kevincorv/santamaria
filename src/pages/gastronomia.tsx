import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { restaurants, nearbyGastronomy } from '../data/restaurants'
import { regionalProducts } from '../data/crafts'
import { useSeo } from '../hooks/use-seo'
import {
  Navigation,
  Phone,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Utensils,
  MapPin,
} from 'lucide-react'

export const GastronomiaPage: React.FC = () => {
  useSeo({
    title: 'Gastronomía y sabores',
    description:
      'Locales gastronómicos reales de Santa María de Fe: Delicias Tati, Dolce Aroma, heladería Sandy y más, con direcciones, fuentes y gastronomía paraguaya y productos regionales.',
    path: '/gastronomia',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Sabores de la tierra
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Gastronomía y comidas
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Esta sección lista únicamente locales que operan realmente en Santa María de Fe, con su fuente.
            No inventamos menús ni precios: si un dato no está publicado, indicamos "Consultar previamente".
          </p>
        </div>

        {/* Locales */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-6 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#B45309]" aria-hidden="true" /> Locales del distrito
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {restaurants.map((r) => {
              const verified = r.verificationStatus.status === 'verified'
              return (
                <article
                  key={r.id}
                  className="bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden flex flex-col"
                >
                  <Link to={`/gastronomia/${r.slug}`} className="block">
                    <SmartImage src={r.images[0]} alt={r.name} className="w-full h-44" />
                  </Link>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B45309]">
                        {r.kind}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold shrink-0 ${
                          verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {verified ? 'Verificado' : 'A verificar'}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#102D2B] mt-1.5">
                      <Link to={`/gastronomia/${r.slug}`} className="hover:text-[#B45309] transition-colors">
                        {r.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed flex-1">{r.shortDescription}</p>

                    <ul className="mt-3 space-y-1.5 text-xs text-gray-600">
                      <li className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                        {r.address.street || 'Centro urbano'}, Santa María de Fe
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                        {r.openingHours || 'Consultar previamente'}
                      </li>
                      {r.contact?.phone && (
                        <li className="flex items-start gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#28685A] mt-0.5 shrink-0" aria-hidden="true" />
                          <a href={`tel:${r.contact.phone.replace(/\s/g, '')}`} className="text-[#18685A] hover:underline">
                            {r.contact.phone}
                          </a>
                        </li>
                      )}
                    </ul>

                    {r.openingHoursNote && (
                      <p className="mt-2 text-[11px] text-amber-700">{r.openingHoursNote}</p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {r.coordinates && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${r.coordinates.latitude},${r.coordinates.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#18685A] hover:bg-[#22806d] px-4 py-2 text-xs font-semibold text-white transition-colors"
                        >
                          <Navigation className="w-3.5 h-3.5" /> Cómo llegar
                        </a>
                      )}
                      {r.contact?.website && (
                        <a
                          href={r.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] px-4 py-2 text-xs font-semibold text-gray-600 hover:border-gray-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Sitio
                        </a>
                      )}
                      <Link
                        to={`/gastronomia/${r.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#18685A]/30 px-4 py-2 text-xs font-semibold text-[#18685A] hover:bg-[#18685A]/10 transition-colors"
                      >
                        Ver ficha
                      </Link>
                    </div>

                    <div className="mt-auto pt-4 text-[11px] text-gray-500 border-t border-[#E5E3DC] mt-4">
                      <ul className="space-y-0.5">
                        {r.sources.map((src) => (
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
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Gastronomía general */}
        <section className="mt-14 bg-white rounded-2xl border border-[#E5E3DC] p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-4">Comida paraguaya y sabores misioneros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-[#102D2B] mb-2">La mesa mariense</h3>
              <p>
                Como en todo el Paraguay, la cocina local gira en torno al maíz y a la mandioca: tortillas,
                chipa, sopa paraguaya y tereré acompañan el día a día de las familias. En los emprendimientos
                comunitarios del pueblo se destacan las tortillas artesanales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#102D2B] mb-2">Dulces, frutas y hierbas</h3>
              <p>
                La tradición de dulces y licores de frutas se vincula con la memoria de Aimé Bonpland, quien
                durante su confinamiento (1821–1831) enseñó técnicas de elaboración y estudió las hierbas
                medicinales de la región junto a los pobladores.
              </p>
            </div>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#102D2B] mt-8 mb-4">Productos regionales documentados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionalProducts.map((p) => (
              <div key={p.name} className="rounded-xl bg-[#F7F4ED] border border-[#E5E3DC] p-4">
                <p className="font-semibold text-[#102D2B] text-sm">{p.name}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{p.detail}</p>
                <p className="text-[10px] text-gray-400 mt-2">Fuente: {p.source}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alternativas cercanas */}
        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-amber-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" /> Alternativas cercanas (fuera del distrito)
          </h2>
          <p className="text-sm text-amber-900/80 mb-4">
            Estas opciones están en localidades vecinas, no en Santa María de Fe. Se listan solo como
            referencia para quien quiera alternativas a menos de una media hora en auto.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nearbyGastronomy.map((alt) => (
              <div key={alt.name} className="rounded-xl bg-white border border-amber-200 p-4">
                <p className="font-semibold text-[#102D2B] text-sm">{alt.name}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{alt.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl bg-[#102D2B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <MapPin className="w-8 h-8 text-emerald-300 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl font-bold">¿Querés llegar a alguno de estos locales?</p>
              <p className="text-sm text-[#E5E3DC]/80">
                Los locales con coordenadas verificadas están marcados en el mapa interactivo.
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
