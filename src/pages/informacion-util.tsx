import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { useSeo } from '../hooks/use-seo'
import { TOURISM_WHATSAPP, TOURISM_WHATSAPP_HOURS } from '../data/site'
import {
  Accessibility,
  ArrowRight,
  Banknote,
  Bus,
  Car,
  Languages,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldAlert,
  Toilet,
  Waves,
  Info,
} from 'lucide-react'

const townCenterMaps =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('-26.7830965,-56.9440809')

interface InfoCard {
  icon: React.ElementType
  title: string
  body: string
  note?: string
  href?: string
  hrefLabel?: string
}

const cards: InfoCard[] = [
  {
    icon: Bus,
    title: 'Cómo llegar y transporte',
    body:
      'Santa María de Fe está a 15 km de San Ignacio y a unos 250 km de Asunción por la Ruta PY01 (Ruta 1). El acceso final al pueblo se hace por camino asfaltado desde la ruta.',
    note:
      'Las frecuencias de buses interurbanos y los horarios de terminal no están publicados en las fuentes consultadas: confirmalos en la terminal de San Ignacio o con tu empresa de transporte.',
    href: townCenterMaps,
    hrefLabel: 'Abrir ruta en Google Maps',
  },
  {
    icon: Car,
    title: 'Estacionamiento',
    body:
      'En el centro se estaciona sobre la vía pública, alrededor de la plaza. El Santa María Hotel tiene estacionamiento privado para sus huéspedes.',
    note:
      'En la base del Kurusu Cerro hay sectores de estacionamiento, especialmente habilitados en Semana Santa. No hay tarifas publicadas.',
  },
  {
    icon: Banknote,
    title: 'Cajeros y pagos',
    body:
      'No figura un cajero automático verificado dentro del distrito en las fuentes consultadas. La mayoría de los locales pequeños trabaja con efectivo.',
    note: 'Prevé efectivo antes de llegar y confirmá medios de pago en cada local.',
  },
  {
    icon: Toilet,
    title: 'Sanitarios',
    body:
      'No hay baños públicos documentados en el casco urbano. El museo, los locales gastronómicos y el hotel atienden a sus visitantes.',
    note: 'Si venís en excursión, coordiná las paradas con tu operador.',
  },
  {
    icon: Accessibility,
    title: 'Accesibilidad',
    body:
      'El museo funciona en una casona colonial de adobe y tejas, con desniveles propios de la construcción histórica. No hay información publicada sobre accesibilidad completa.',
    note:
      'Si necesitás acceso adaptado, consultá antes con el museo o el hotel para coordinar la visita.',
  },
  {
    icon: ShieldAlert,
    title: 'Asistencia y emergencias',
    body:
      'El número nacional de emergencias de Paraguay es el 911. Para policía, bomberos o centro de salud local, consultá en la Municipalidad o en el centro del pueblo.',
    note:
      'No publicamos teléfonos locales sin confirmación oficial. En una emergencia, llamá al 911.',
  },
]

export const InformacionUtilPage: React.FC = () => {
  useSeo({
    title: 'Información útil',
    description:
      'Cómo llegar a Santa María de Fe, transporte, estacionamiento, cajeros, sanitarios, accesibilidad, emergencias y WhatsApp turístico. Datos verificados y avisos de lo que falta confirmar.',
    path: '/informacion-util',
  })

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Antes de viajar
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Información útil
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Lo práctico para llegar y moverte por Santa María de Fe. Cuando un dato no está publicado,
            lo decimos: no inventamos horarios, tarifas ni teléfonos.
          </p>
        </div>

        {/* Cómo llegar destacado */}
        <section className="rounded-3xl bg-[#102D2B] text-white p-6 sm:p-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                Ruta principal
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                Asunción → San Ignacio → Santa María de Fe
              </h2>
              <p className="text-sm text-[#E5E3DC]/85 mt-2 leading-relaxed">
                Unos 250 km desde Asunción por la Ruta PY01 hasta San Ignacio, y 15 km más hasta el pueblo.
                El acceso está señalizado y se puede hacer en auto particular o en bus hasta San Ignacio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={townCenterMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold transition-colors"
              >
                <Navigation className="w-4 h-4" /> Cómo llegar
              </a>
              <Link
                to="/mapa"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 hover:bg-white/10 px-6 py-3 text-sm font-semibold transition-colors"
              >
                <MapPin className="w-4 h-4" /> Ver mapa
              </Link>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {cards.map((card) => (
              <article
                key={card.title}
                className="bg-white rounded-2xl border border-[#E5E3DC] p-5 sm:p-6 flex items-start gap-4"
              >
                <div className="rounded-xl bg-[#18685A]/10 p-3 shrink-0">
                  <card.icon className="w-6 h-6 text-[#18685A]" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#102D2B]">{card.title}</h2>
                  <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{card.body}</p>
                  {card.note && (
                    <p className="text-xs text-amber-700 mt-2 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                      {card.note}
                    </p>
                  )}
                  {card.href && (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18685A] hover:underline mt-2"
                    >
                      {card.hrefLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-5">
            {/* WhatsApp turístico */}
            <div className="rounded-2xl bg-white border border-[#E5E3DC] p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-2.5">
                  <MessageCircle className="w-6 h-6 text-emerald-700" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-xl font-bold text-[#102D2B]">WhatsApp turístico</h2>
              </div>
              {TOURISM_WHATSAPP ? (
                <>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    Canal central para consultas de visitantes.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{TOURISM_WHATSAPP_HOURS}</p>
                  <a
                    href={`https://wa.me/${TOURISM_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Escribir ahora
                  </a>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    El canal central de WhatsApp turístico está <strong>en habilitación</strong>: falta
                    confirmar el número oficial de atención al visitante.
                  </p>
                  <p className="text-xs text-amber-700 mt-2">
                    Mientras tanto, cada alojamiento y local tiene su contacto directo en su ficha.
                  </p>
                  <Link
                    to="/hospedajes"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E3DC] px-5 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400 transition-colors"
                  >
                    Ver contactos <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>

            {/* Idiomas */}
            <div className="rounded-2xl bg-white border border-[#E5E3DC] p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#18685A]/10 p-2.5">
                  <Languages className="w-6 h-6 text-[#18685A]" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-xl font-bold text-[#102D2B]">Idiomas</h2>
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Frases útiles en guaraní, inglés y portugués para moverte por el pueblo y saludar a la
                comunidad.
              </p>
              <Link
                to="/idiomas"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                Ver guía de idiomas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Emergencias */}
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-rose-700" aria-hidden="true" />
                <h2 className="font-serif text-xl font-bold text-rose-900">Emergencias</h2>
              </div>
              <p className="text-sm text-rose-900/80 mt-2">
                Número nacional de emergencias en Paraguay:
              </p>
              <a
                href="tel:911"
                className="mt-2 inline-flex items-center gap-2 font-serif text-3xl font-bold text-rose-800 hover:text-rose-700"
              >
                911
              </a>
              <p className="text-xs text-rose-900/70 mt-2">
                Para asistencia local no urgente, consultá en la Municipalidad.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#E5E3DC] p-6">
              <div className="flex items-center gap-3">
                <Waves className="w-6 h-6 text-[#18685A]" aria-hidden="true" />
                <h2 className="font-serif text-xl font-bold text-[#102D2B]">En el río y balnearios</h2>
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                El Balneario Taperã es de uso familiar. Verificá el estado del agua y las condiciones
                antes de bañarte, y mantené limpio el lugar.
              </p>
              <Link
                to="/lugares/balneario-taperã"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18685A] hover:underline mt-2"
              >
                Ver ficha del balneario <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
