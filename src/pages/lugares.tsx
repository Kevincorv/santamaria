import React, { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { places, categoriesOptions } from '../data/places'
import { searchAll, KIND_LABELS } from '../services/places'
import { useSeo } from '../hooks/use-seo'
import { MapPin, Search, ArrowRight, X, SearchX } from 'lucide-react'

export const PlacesCatalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [search, setSearch] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')

  useSeo({
    title: 'Lugares y atractivos',
    description:
      'Catálogo de lugares turísticos de Santa María de Fe: plaza, iglesia, museo de arte jesuítico guaraní, Kurusu Cerro, Ykua Teja, taller de Hermandad, casa-museo Bonpland e ingenio Hibernia.',
    path: '/lugares',
  })

  const filteredPlaces = useMemo(() => {
    const q = search.trim().toLowerCase()
    return places.filter((place) => {
      const matchCategory = selectedCategory === 'todos' || place.category === selectedCategory
      if (!matchCategory) return false
      if (!q) return true
      const haystack = `${place.name} ${place.shortDescription} ${place.description} ${place.categoryLabel ?? ''}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [search, selectedCategory])

  // Resultados del buscador unificado (incluye hoteles, restaurantes y artesanías)
  const unifiedResults = useMemo(
    () => (search.trim() ? searchAll(search).filter((r) => r.kind !== 'lugar') : []),
    [search]
  )

  const updateQuery = (value: string) => {
    setSearch(value)
    const params = new URLSearchParams(searchParams)
    if (value.trim()) params.set('q', value.trim())
    else params.delete('q')
    setSearchParams(params, { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Patrimonio vivo
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Lugares y atractivos
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Conocé la historia que da identidad a nuestra ciudad. Cada ficha indica su fuente y su estado de verificación.
          </p>
        </div>

        {/* Buscador */}
        <div className="relative max-w-2xl mb-6">
          <label htmlFor="places-search" className="sr-only">
            Buscar lugares
          </label>
          <input
            id="places-search"
            type="search"
            value={search}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Buscar por nombre o descripción…"
            className="w-full rounded-full bg-white border border-[#E5E3DC] pl-12 pr-11 py-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/60"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
          {search && (
            <button
              onClick={() => updateQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrar por categoría">
          {categoriesOptions.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-[#102D2B] text-white border-[#102D2B]'
                  : 'bg-white text-gray-600 border-[#E5E3DC] hover:border-[#28685A] hover:text-[#18685A]'
              }`}
              aria-pressed={selectedCategory === cat.key}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de lugares */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <Link
                key={place.id}
                to={`/lugares/${place.slug}`}
                className="group bg-white rounded-2xl border border-[#E5E3DC] shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <SmartImage
                  src={place.images[0]}
                  alt={place.name}
                  className="w-full h-52"
                  imgClassName="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#28685A]">
                    {place.categoryLabel}
                  </span>
                  <h2 className="font-serif text-lg font-bold text-[#102D2B] mt-1.5 leading-snug">
                    {place.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
                    {place.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      {place.coordinates ? 'Ver en mapa' : 'Coordenadas a verificar'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#18685A]">
                      Ver ficha <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E5E3DC] p-10 text-center">
            <SearchX className="w-10 h-10 text-gray-300 mx-auto" aria-hidden="true" />
            <p className="font-serif text-xl font-bold text-[#102D2B] mt-4">
              No encontramos lugares con esa búsqueda
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Probá con otro término o limpiá los filtros.
            </p>
            <button
              onClick={() => {
                updateQuery('')
                setSelectedCategory('todos')
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              Ver todos los lugares
            </button>
          </div>
        )}

        {/* Resultados unificados (hoteles, restaurantes, artesanías) */}
        {unifiedResults.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-[#102D2B] mb-5">
              También encontramos en otros sectores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unifiedResults.slice(0, 9).map((r) => (
                <Link
                  key={`${r.kind}-${r.id}`}
                  to={r.href}
                  className="group flex gap-4 bg-white rounded-xl border border-[#E5E3DC] p-3 hover:shadow-md transition-shadow"
                >
                  <SmartImage
                    src={r.image}
                    alt={r.name}
                    className="w-20 h-20 rounded-lg shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B45309]">
                      {KIND_LABELS[r.kind]}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-[#102D2B] leading-snug truncate">
                      {r.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{r.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
