import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { useSeo } from '../hooks/use-seo'
import {
  Bed,
  Utensils,
  Scissors,
  CalendarDays,
  Route,
  Map as MapIcon,
  Info,
  Languages,
  QrCode,
  ClipboardList,
  Smartphone,
  ArrowRight,
  BookOpen,
} from 'lucide-react'

const services = [
  {
    title: 'Hospedajes',
    description:
      'Hoteles, posadas y hospedajes del distrito con contacto directo, servicios confirmados y tarifas solo cuando están publicadas.',
    href: '/hospedajes',
    icon: Bed,
  },
  {
    title: 'Gastronomía',
    description:
      'Restaurantes, comedores, copetines y heladerías que realmente operan en Santa María de Fe, más la cocina regional.',
    href: '/gastronomia',
    icon: Utensils,
  },
  {
    title: 'Artesanías y productos',
    description:
      'Bordados del Taller de Hermandad, tapices, dulces a leña del monasterio y azúcar orgánica del ingenio Hibernia.',
    href: '/artesania',
    icon: Scissors,
  },
  {
    title: 'Eventos y celebraciones',
    description:
      'Fiesta patronal, Semana Santa y la peregrinación al Kurusu Cerro. Tradiciones documentadas, sin eventos inventados.',
    href: '/eventos',
    icon: CalendarDays,
  },
  {
    title: 'Recorridos autoguiados',
    description:
      'Circuitos históricos, de espiritualidad, naturaleza y el recorrido por los pasos de Aimé Bonpland.',
    href: '/recorridos',
    icon: Route,
  },
  {
    title: 'Itinerarios armados',
    description:
      'Planes de visita de uno, dos y tres días con estimación de costos y distancias entre puntos.',
    href: '/itinerarios',
    icon: BookOpen,
  },
  {
    title: 'Mapa interactivo',
    description:
      'Todos los puntos con ubicación verificada sobre OpenStreetMap, con filtros por categoría e indicaciones.',
    href: '/mapa',
    icon: MapIcon,
  },
  {
    title: 'Información útil',
    description:
      'Accesos, transporte, clima, moneda, conectividad y recomendaciones prácticas para organizar la visita.',
    href: '/informacion-util',
    icon: Info,
  },
  {
    title: 'Guía de idiomas',
    description:
      'Español, guaraní e inglés: frases esenciales para comunicarse con la comunidad mariense.',
    href: '/idiomas',
    icon: Languages,
  },
  {
    title: 'Escaneo de códigos QR',
    description:
      'Escaneá los QR instalados en la ciudad para abrir la ficha de cada lugar al instante.',
    href: '/escanear',
    icon: QrCode,
  },
  {
    title: 'Registro de prestadores',
    description:
      'Formulario para que alojamientos, talleres y emprendimientos locales soliciten su publicación.',
    href: '/registro-prestadores',
    icon: ClipboardList,
  },
  {
    title: 'Instalar como aplicación',
    description:
      'Sumá la guía a la pantalla de inicio de tu teléfono para usarla sin conexión en parte del recorrido.',
    href: '/instalar',
    icon: Smartphone,
  },
]

export const ServiciosPage: React.FC = () => {
  useSeo({
    title: 'Servicios turísticos',
    description:
      'Todos los servicios turísticos de Santa María de Fe: hospedajes, gastronomía, artesanías, eventos, recorridos, mapa interactivo, información útil e instalación como aplicación.',
    path: '/servicios',
  })

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink flex flex-col font-sans">
      <Header />

      <main id="contenido-principal" className="flex-1 max-w-shell mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-brand-green font-semibold mb-2">
            Todo en un solo lugar
          </p>
          <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-bold text-brand-pine tracking-tight">
            Servicios turísticos
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-gray-600 max-w-3xl">
            Herramientas y directorios para organizar tu visita a Santa María de Fe, Misiones.
            Cada servicio se alimenta de información verificada con fuentes publicadas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              to={service.href}
              className="group bg-white rounded-2xl border border-brand-line p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <span className="w-11 h-11 grid place-items-center rounded-xl bg-emerald-50 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
                <service.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-serif text-[19px] font-bold text-brand-pine">{service.title}</h2>
              <p className="mt-2 text-[13.5px] text-gray-600 leading-relaxed">{service.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-green">
                Abrir
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
