import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { useSeo } from '../hooks/use-seo'
import { Compass, ArrowLeft, Search } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  useSeo({
    title: 'Página no encontrada',
    description: 'La página solicitada no existe. Volvé al inicio de la guía turística de Santa María de Fe.',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <Compass className="w-16 h-16 text-[#28685A]/40 mb-6" aria-hidden="true" />
        <p className="font-serif text-6xl font-bold text-[#102D2B]/20">404</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102D2B] mt-2 mb-3">
          No encontramos esa página
        </h1>
        <p className="text-gray-600 max-w-md mb-8">
          El enlace puede estar desactualizado o la dirección escrita con un error. Explorá la guía desde el
          inicio o usá el buscador de lugares.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <Link
            to="/lugares"
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E3DC] bg-white text-gray-600 hover:border-gray-400 px-6 py-3 text-sm font-semibold transition-colors"
          >
            <Search className="w-4 h-4" /> Buscar lugares
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
