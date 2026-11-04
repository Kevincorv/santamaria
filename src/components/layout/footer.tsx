import React from 'react'
import { Link } from 'react-router-dom'
import { ChurchIcon, primaryNav, secondaryNav } from './header'
import { Check, Heart, QrCode } from 'lucide-react'

const checklist = [
  'Toda la información en un solo lugar',
  'Escaneá códigos QR en la ciudad',
  'Mapa y ubicación en tiempo real',
  'Diseño responsive (80% móvil)',
  'Fácil de usar y rápido',
]

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-forest text-white font-sans">
      <div className="max-w-shell mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* ---------- Identidad centrada ---------- */}
        <div className="flex flex-col items-center text-center">
          <ChurchIcon className="w-12 h-12 text-emerald-300" />
          <h2 className="mt-4 font-serif text-[26px] sm:text-[32px] font-bold text-white leading-tight">
            Santa María de Fe
          </h2>
          <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-white/55">
            Misiones · Paraguay
          </p>

          {/* ---------- Checklist ---------- */}
          <ul className="mt-9 space-y-3 text-left">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-5 h-5 grid place-items-center rounded-full bg-emerald-400/20 shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-300" strokeWidth={3} />
                </span>
                <span className="text-[14px] sm:text-[15px] text-white/85">{item}</span>
              </li>
            ))}
          </ul>

          {/* ---------- Firma manuscrita ---------- */}
          <p className="mt-10 font-script text-brand-gold text-[30px] sm:text-[38px] flex items-center gap-2">
            Santa María de Fe Te espera
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400" aria-hidden="true" />
          </p>
        </div>

        {/* ---------- Enlaces (accesibilidad y navegación) ---------- */}
        <nav
          aria-label="Enlaces del pie de página"
          className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">Explorar</h3>
            <ul className="space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[14px] text-white/75 hover:text-emerald-300 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">Servicios turísticos</h3>
            <ul className="space-y-2">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[14px] text-white/75 hover:text-emerald-300 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">Cómo llegar</h3>
            <p className="text-[14px] text-white/75 leading-relaxed">
              A 15 km de San Ignacio y unos 250 km de Asunción por la Ruta PY01, departamento de
              Misiones, Paraguay.
            </p>
            <Link
              to="/escanear"
              className="mt-4 inline-flex items-center gap-2 text-[14px] text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              Escaneá los códigos QR de la ciudad
            </Link>
            <p className="mt-3 text-[13px] text-white/50 leading-relaxed">
              Horarios, tarifas y contactos se publican solo cuando están verificados; el resto se
              indica como “Consultar previamente”.
            </p>
          </div>
        </nav>

        {/* ---------- Barra legal ---------- */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/50">
          <p>© {year} Santa María de Fe Digital.</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/acerca-de" className="hover:text-emerald-300 transition-colors">
              Acerca del proyecto
            </Link>
            <Link to="/privacidad" className="hover:text-emerald-300 transition-colors">
              Política de privacidad
            </Link>
            <Link to="/instalar" className="hover:text-emerald-300 transition-colors">
              Instalar como aplicación
            </Link>
            <span>
              Hecho con orgullo en Misiones ·{' '}
              <a
                href="https://www.krctechnologiess.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors underline underline-offset-2"
              >
                KRC Technologies
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
