import React from 'react'
import { Link } from 'react-router-dom'
import { ChurchIcon } from './header'
import { MapPin, QrCode, Heart, Info } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#102D2B] text-white border-t border-[#183D38] pt-14 pb-8 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ChurchIcon className="w-8 h-8 text-emerald-300" />
              <div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                  Santa María de Fe
                </h3>
                <p className="text-xs text-[#E5E3DC]/70 tracking-wider">
                  Misiones · Paraguay
                </p>
              </div>
            </div>
            <p className="text-sm text-[#E5E3DC]/80 leading-relaxed">
              Guía turística y patrimonial de la antigua reducción jesuítico-guaraní:
              historia, museo, naturaleza, artesanías y gente linda.
            </p>
            <div className="pt-1 text-xs text-emerald-300/90 font-serif italic flex items-center gap-1.5">
              <span>Santa María de Fe te espera</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            </div>
          </div>

          {/* Col 2: Explorar */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide border-b border-emerald-900/60 pb-2">
              Explorar la ciudad
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E5E3DC]/85">
              <li>
                <Link to="/lugares" className="hover:text-emerald-300 transition-colors">
                  Lugares y atractivos
                </Link>
              </li>
              <li>
                <Link to="/historia" className="hover:text-emerald-300 transition-colors">
                  Historia y cronología
                </Link>
              </li>
              <li>
                <Link to="/mapa" className="hover:text-emerald-300 transition-colors">
                  Mapa interactivo
                </Link>
              </li>
              <li>
                <Link to="/hospedajes" className="hover:text-emerald-300 transition-colors">
                  Hoteles y hospedajes
                </Link>
              </li>
              <li>
                <Link to="/gastronomia" className="hover:text-emerald-300 transition-colors">
                  Gastronomía local
                </Link>
              </li>
              <li>
                <Link to="/artesania" className="hover:text-emerald-300 transition-colors">
                  Artesanías y productos
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="hover:text-emerald-300 transition-colors">
                  Celebraciones tradicionales
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Herramientas */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide border-b border-emerald-900/60 pb-2">
              Herramientas turísticas
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E5E3DC]/85">
              <li>
                <Link to="/recorridos" className="hover:text-emerald-300 transition-colors">
                  Recorridos autoguiados
                </Link>
              </li>
              <li>
                <Link to="/escanear" className="hover:text-emerald-300 transition-colors flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-300" />
                  <span>Escaneo de códigos QR</span>
                </Link>
              </li>
              <li>
                <Link to="/instalar" className="hover:text-emerald-300 transition-colors">
                  Instalar como aplicación
                </Link>
              </li>
              <li>
                <Link to="/acerca-de" className="hover:text-emerald-300 transition-colors">
                  Acerca del proyecto
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="hover:text-emerald-300 transition-colors">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Ubicación y contacto real */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide border-b border-emerald-900/60 pb-2">
              Cómo llegar y contactos
            </h4>
            <div className="space-y-3 text-sm text-[#E5E3DC]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-300 mt-1 flex-shrink-0" />
                <span>
                  A 15 km de San Ignacio y unos 250 km de Asunción por Ruta PY01, departamento de Misiones.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-300 mt-1 flex-shrink-0" />
                <span>
                  Contactos de alojamientos, talleres y museo: publicados en cada ficha con su fuente.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#183D38] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5E3DC]/60">
          <p>© {new Date().getFullYear()} Santa María de Fe Digital.</p>
          <p>
            Hecho con orgullo en Misiones 🇵🇾 · Desarrollado por{' '}
            <a
              href="https://www.krctechnologiess.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline hover:text-emerald-300 transition-colors"
            >
              KRC Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
