import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { useSeo } from '../hooks/use-seo'
import { accommodations } from '../data/accommodations'
import { crafts, experiences } from '../data/crafts'
import { places } from '../data/places'
import { TOURISM_WHATSAPP, TOURISM_WHATSAPP_HOURS, DATA_REVIEW_DATE } from '../data/site'
import { MapPin, Phone, Mail, Globe, MessageCircle, Info, Navigation, Clock } from 'lucide-react'

interface ContactRow {
  name: string
  role: string
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  instagram?: string
  href: string
}

/** Contactos publicados, derivados de los datos del portal (sin duplicar información). */
const buildContacts = (): ContactRow[] => {
  const rows: ContactRow[] = []

  for (const a of accommodations) {
    if (!a.contact?.phone && !a.contact?.whatsapp && !a.contact?.email && !a.contact?.website) continue
    rows.push({
      name: a.name,
      role: a.categoryLabel || 'Alojamiento',
      phone: a.contact?.phone,
      whatsapp: a.contact?.whatsapp,
      email: a.contact?.email,
      website: a.contact?.website,
      instagram: a.contact?.instagram,
      href: `/hospedajes/${a.slug}`,
    })
  }

  for (const c of crafts) {
    if (!c.contact?.phone && !c.contact?.whatsapp && !c.contact?.email && !c.contact?.instagram) continue
    rows.push({
      name: c.name,
      role: 'Taller / producto local',
      phone: c.contact?.phone,
      whatsapp: c.contact?.whatsapp,
      email: c.contact?.email,
      website: c.contact?.website,
      instagram: c.contact?.instagram,
      href: '/artesania',
    })
  }

  for (const e of experiences) {
    if (!e.contact?.phone && !e.contact?.whatsapp) continue
    rows.push({
      name: e.name,
      role: 'Experiencia / servicio',
      phone: e.contact?.phone,
      whatsapp: e.contact?.whatsapp,
      email: e.contact?.email,
      href: '/artesania',
    })
  }

  for (const p of places) {
    if (!p.contact?.phone && !p.contact?.email) continue
    rows.push({
      name: p.name,
      role: p.categoryLabel || 'Lugar',
      phone: p.contact?.phone,
      email: p.contact?.email,
      website: p.contact?.website,
      href: `/lugares/${p.slug}`,
    })
  }

  return rows
}

export const ContactoPage: React.FC = () => {
  const contacts = buildContacts()

  useSeo({
    title: 'Contacto y cómo llegar',
    description:
      'Contactos publicados de Santa María de Fe (hoteles, talleres, museo y servicios) y accesos desde Asunción y San Ignacio por la Ruta PY01, Misiones, Paraguay.',
    path: '/contacto',
  })

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink flex flex-col font-sans">
      <Header />

      <main id="contenido-principal" className="flex-1 max-w-shell mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-brand-green font-semibold mb-2">
            Estamos para ayudarte
          </p>
          <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] font-bold text-brand-pine tracking-tight">
            Contacto y cómo llegar
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-gray-600 max-w-3xl">
            Teléfonos, correos y sitios publicados por cada prestador del distrito. No inventamos
            datos de contacto: si un canal no está publicado, figura como “Consultar previamente”.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* ---------- Directorio de contactos ---------- */}
          <section aria-labelledby="contactos-titulo">
            <h2 id="contactos-titulo" className="font-serif text-[22px] font-bold text-brand-pine mb-5">
              Contactos publicados
            </h2>

            <div className="space-y-4">
              {contacts.map((row) => (
                <article
                  key={`${row.name}-${row.role}`}
                  className="bg-white rounded-2xl border border-brand-line p-5 shadow-card"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-serif text-[18px] font-bold text-brand-pine leading-snug">
                        <Link to={row.href} className="hover:text-brand-green transition-colors">
                          {row.name}
                        </Link>
                      </h3>
                      <p className="mt-0.5 text-[11px] uppercase tracking-[0.13em] text-brand-green font-semibold">
                        {row.role}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {row.phone && (
                      <li className="flex items-center gap-2 text-[13.5px] text-gray-700">
                        <Phone className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                        <a href={`tel:${row.phone.replace(/\s/g, '')}`} className="hover:text-brand-green transition-colors">
                          {row.phone}
                        </a>
                      </li>
                    )}
                    {row.whatsapp && (
                      <li className="flex items-center gap-2 text-[13.5px] text-gray-700">
                        <MessageCircle className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                        <a
                          href={`https://wa.me/${row.whatsapp.replace(/[^\d]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-green transition-colors"
                        >
                          WhatsApp {row.whatsapp}
                        </a>
                      </li>
                    )}
                    {row.email && (
                      <li className="flex items-center gap-2 text-[13.5px] text-gray-700">
                        <Mail className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                        <a href={`mailto:${row.email}`} className="hover:text-brand-green transition-colors break-all">
                          {row.email}
                        </a>
                      </li>
                    )}
                    {row.website && (
                      <li className="flex items-center gap-2 text-[13.5px] text-gray-700">
                        <Globe className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                        <a
                          href={row.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-green transition-colors break-all"
                        >
                          Sitio web oficial
                        </a>
                      </li>
                    )}
                    {row.instagram && (
                      <li className="flex items-center gap-2 text-[13.5px] text-gray-700">
                        <Globe className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                        <a
                          href={row.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-green transition-colors break-all"
                        >
                          Instagram
                        </a>
                      </li>
                    )}
                    {!row.phone && !row.whatsapp && !row.email && !row.website && (
                      <li className="flex items-center gap-2 text-[13.5px] text-gray-500">
                        <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
                        Consultar previamente
                      </li>
                    )}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* ---------- Cómo llegar / WhatsApp ---------- */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
              <h2 className="font-serif text-[19px] font-bold text-brand-pine flex items-center gap-2">
                <Navigation className="w-5 h-5 text-brand-green" aria-hidden="true" />
                Cómo llegar
              </h2>
              <ul className="mt-4 space-y-3 text-[13.5px] text-gray-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-green mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    <strong>Desde Asunción:</strong> unos 250 km por la Ruta PY01 hasta San Ignacio y
                    luego 15 km hasta Santa María de Fe.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-green mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    <strong>Desde San Ignacio:</strong> 15 km por ruta asfaltada hacia el interior del
                    departamento de Misiones.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-brand-green mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    <strong>Tiempo estimado:</strong> consultá el horario de ómnibus y combis vigente:
                    cambia según la temporada.
                  </span>
                </li>
              </ul>

              <Link
                to="/mapa"
                className="mt-5 inline-flex items-center justify-center gap-2 w-full rounded-full bg-brand-green hover:bg-brand-green-2 px-5 py-3 text-[14px] font-semibold text-white transition-colors"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Abrir el mapa interactivo
              </Link>
            </section>

            <section className="rounded-2xl border border-brand-line bg-brand-forest text-white p-6">
              <h2 className="font-serif text-[19px] font-bold flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                WhatsApp turístico
              </h2>
              {TOURISM_WHATSAPP ? (
                <>
                  <p className="mt-3 text-white/80 text-[13.5px] leading-relaxed">
                    Canal oficial de consultas turísticas del distrito.
                  </p>
                  <a
                    href={`https://wa.me/${TOURISM_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-full bg-white text-brand-forest px-5 py-3 text-[14px] font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    Escribir por WhatsApp
                  </a>
                  <p className="mt-3 text-white/55 text-[12px]">{TOURISM_WHATSAPP_HOURS}</p>
                </>
              ) : (
                <>
                  <p className="mt-3 text-white/80 text-[13.5px] leading-relaxed">
                    El número oficial del WhatsApp turístico está <strong>en habilitación</strong> por la
                    Municipalidad de Santa María de Fe. Mientras tanto, usá los contactos directos de
                    cada prestador de esta página.
                  </p>
                  <p className="mt-3 text-white/55 text-[12px]">{TOURISM_WHATSAPP_HOURS}</p>
                </>
              )}
            </section>

            <section className="rounded-2xl border border-brand-line bg-white p-6">
              <h2 className="font-serif text-[18px] font-bold text-brand-pine">Aviso</h2>
              <p className="mt-2 text-[13px] text-gray-600 leading-relaxed">
                Este portal no gestiona reservas ni pagos. Los botones de contacto abren el canal
                publicado por cada prestador. Última revisión editorial de los datos:{' '}
                <strong>{DATA_REVIEW_DATE}</strong>.
              </p>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
