import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { useSeo } from '../hooks/use-seo'
import { ArrowRight, Info, Languages, MessageCircle, Phone } from 'lucide-react'

interface Phrase {
  es: string
  gn: string
  en: string
  pt: string
}

const phrases: Phrase[] = [
  { es: 'Hola / ¿Cómo estás?', gn: "Mba'éichapa", en: 'Hello / How are you?', pt: 'Olá / Como está?' },
  { es: 'Gracias', gn: 'Aguyje', en: 'Thank you', pt: 'Obrigado / Obrigada' },
  { es: 'Por favor', gn: 'Ikatu ramo', en: 'Please', pt: 'Por favor' },
  { es: 'Sí / No', gn: 'Héẽ / Nahániri', en: 'Yes / No', pt: 'Sim / Não' },
  { es: '¿Dónde está…?', gn: "Moõpa oĩ…?", en: 'Where is…?', pt: 'Onde fica…?' },
  { es: '¿Cuánto cuesta?', gn: 'Mboypa hepy?', en: 'How much does it cost?', pt: 'Quanto custa?' },
  { es: 'Agua', gn: 'Y', en: 'Water', pt: 'Água' },
  { es: 'Comida', gn: "Tembi'u", en: 'Food', pt: 'Comida' },
  { es: 'Ayuda', gn: 'Pytyvõ', en: 'Help', pt: 'Ajuda' },
  { es: 'Hasta luego', gn: 'Jajohecha peve', en: 'See you later', pt: 'Até logo' },
]

export const IdiomasPage: React.FC = () => {
  useSeo({
    title: 'Guía de idiomas',
    description:
      'Frases útiles en guaraní, inglés y portugués para visitar Santa María de Fe, Misiones, Paraguay. Guía básica de comunicación para turistas.',
    path: '/idiomas',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Para comunicarte
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Guía de idiomas
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            En Santa María de Fe se habla español y guaraní, las dos lenguas oficiales del Paraguay.
            Muchos prestadores turísticos también se manejan en inglés y portugués. Estas son frases
            básicas para empezar la conversación.
          </p>
        </div>

        <div className="rounded-2xl border border-[#CFE3DC] bg-[#EAF3EF] p-5 mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#18685A] mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm text-[#102D2B] leading-relaxed">
            El contenido del portal está en español. Esta guía no es una traducción completa del sitio:
            reúne frases de uso cotidiano y datos de contacto para visitantes que hablan otros idiomas.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E5E3DC] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E5E3DC] flex items-center gap-3">
            <div className="rounded-xl bg-[#18685A]/10 p-2.5">
              <Languages className="w-6 h-6 text-[#18685A]" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#102D2B]">Frases esenciales</h2>
              <p className="text-xs text-gray-500">Español · Guaraní · English · Português</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-[#F7F4ED] text-left">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-600">Español</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-600">Guaraní</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-600">English</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-600">Português</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E3DC]">
                {phrases.map((p) => (
                  <tr key={p.es} className="hover:bg-[#F7F4ED]/60">
                    <td className="px-4 py-3 font-medium text-[#102D2B]">{p.es}</td>
                    <td className="px-4 py-3 text-gray-700">{p.gn}</td>
                    <td className="px-4 py-3 text-gray-700">{p.en}</td>
                    <td className="px-4 py-3 text-gray-700">{p.pt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="px-6 py-4 text-[11px] text-gray-500 border-t border-[#E5E3DC]">
            La escritura del guaraní varía según la fuente y la región. Estas formas son las de uso más
            difundido en el Paraguay.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-[#E5E3DC] p-6">
            <h2 className="font-serif text-xl font-bold text-[#102D2B] flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#18685A]" aria-hidden="true" /> Si necesitás ayuda
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              El número nacional de emergencias es el <strong>911</strong>. Para consultas turísticas,
              cada alojamiento y local tiene su contacto directo en su ficha.
            </p>
            <a
              href="tel:911"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              Llamar al 911
            </a>
          </div>

          <div className="rounded-2xl bg-[#102D2B] text-white p-6">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-300" aria-hidden="true" /> Contactos directos
            </h2>
            <p className="text-sm text-[#E5E3DC]/85 mt-2 leading-relaxed">
              Alojamientos, restaurantes y talleres publican teléfono, WhatsApp y ubicación en cada ficha.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Link
                to="/hospedajes"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#18685A] hover:bg-[#22806d] px-4 py-2 text-xs font-semibold transition-colors"
              >
                Dónde dormir <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/gastronomia"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 hover:bg-white/10 px-4 py-2 text-xs font-semibold transition-colors"
              >
                Dónde comer <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
