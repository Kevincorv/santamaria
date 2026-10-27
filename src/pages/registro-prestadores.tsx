import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { useSeo } from '../hooks/use-seo'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  Send,
  ShieldCheck,
  Store,
} from 'lucide-react'

const API_BASE = (
  (import.meta.env.VITE_API_URL as string | undefined) ||
  (import.meta.env.DEV ? 'http://localhost:4000/api' : '/api')
).replace(/\/$/, '')

const BUSINESS_TYPES = [
  'Alojamiento',
  'Gastronomía',
  'Artesanía',
  'Experiencia o tour',
  'Transporte',
  'Comercio',
  'Otro',
]

export const RegistroPrestadoresPage: React.FC = () => {
  useSeo({
    title: 'Registro de prestadores',
    description:
      'Formulario para que alojamientos, restaurantes, artesanos y guías de Santa María de Fe soliciten incorporar su emprendimiento al portal turístico, con autorización y revisión municipal.',
    path: '/registro-prestadores',
  })

  const [form, setForm] = useState({
    businessName: '',
    businessType: BUSINESS_TYPES[0],
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    website: '',
    authorization: false,
    websiteTrap: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const update = (field: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (form.websiteTrap) {
      // Honeypot: un bot completó el campo oculto.
      setStatus('success')
      return
    }
    if (!form.authorization) {
      setError('Necesitamos tu autorización para revisar y publicar los datos.')
      return
    }
    if (form.description.trim().length < 40) {
      setError('Contanos un poco más sobre el emprendimiento (al menos 40 caracteres).')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`${API_BASE}/provider-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: form.businessName.trim(),
          businessType: form.businessType,
          ownerName: form.ownerName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          description: form.description.trim(),
          website: form.website.trim(),
          authorization: true,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'No se pudo enviar la solicitud.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo enviar la solicitud. Revisá tu conexión e intentá de nuevo.'
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Para emprendedores locales
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Registro de prestadores
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-3xl">
            Si tenés un alojamiento, restaurante, taller, experiencia o servicio turístico en Santa María
            de Fe, podés pedir que aparezca en el portal. Cada solicitud pasa por revisión antes de
            publicarse: no se carga automáticamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="bg-white rounded-3xl border border-emerald-200 p-8 text-center">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" aria-hidden="true" />
                <h2 className="font-serif text-2xl font-bold text-[#102D2B] mt-4">Solicitud enviada</h2>
                <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Gracias por sumarte. La solicitud quedó registrada para revisión. Si hace falta
                  confirmar algún dato, nos comunicamos al teléfono que indicaste.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] px-6 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    Volver al inicio <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setStatus('idle')
                      setForm({
                        businessName: '',
                        businessType: BUSINESS_TYPES[0],
                        ownerName: '',
                        phone: '',
                        email: '',
                        address: '',
                        description: '',
                        website: '',
                        authorization: false,
                        websiteTrap: '',
                      })
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E5E3DC] px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400 transition-colors"
                  >
                    Cargar otra solicitud
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-[#E5E3DC] p-6 sm:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-[#102D2B] mb-1.5">
                      Nombre del emprendimiento *
                    </label>
                    <input
                      id="businessName"
                      required
                      maxLength={120}
                      value={form.businessName}
                      onChange={(e) => update('businessName', e.target.value)}
                      className="w-full rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                      placeholder="Ej.: Hospedaje, restaurante o taller"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-semibold text-[#102D2B] mb-1.5">
                      Rubro *
                    </label>
                    <select
                      id="businessType"
                      value={form.businessType}
                      onChange={(e) => update('businessType', e.target.value)}
                      className="w-full rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                    >
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-semibold text-[#102D2B] mb-1.5">
                      Persona responsable *
                    </label>
                    <input
                      id="ownerName"
                      required
                      maxLength={120}
                      value={form.ownerName}
                      onChange={(e) => update('ownerName', e.target.value)}
                      className="w-full rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#102D2B] mb-1.5">
                      Teléfono o WhatsApp *
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      maxLength={40}
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="w-full rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                      placeholder="+595 9xx xxx xxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#102D2B] mb-1.5">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      maxLength={160}
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-[#102D2B] mb-1.5">
                      Sitio web o Instagram
                    </label>
                    <input
                      id="website"
                      type="url"
                      maxLength={200}
                      value={form.website}
                      onChange={(e) => update('website', e.target.value)}
                      className="w-full rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                      placeholder="https://"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-[#102D2B] mb-1.5">
                    Dirección o referencia *
                  </label>
                  <input
                    id="address"
                    required
                    maxLength={200}
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    className="w-full rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                    placeholder="Calle, barrio o referencia dentro del distrito"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-[#102D2B] mb-1.5">
                    Descripción del servicio *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={5}
                    maxLength={1200}
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    className="w-full rounded-xl border border-[#E5E3DC] bg-[#F7F4ED] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18685A]/50"
                    placeholder="Qué ofrecés, horarios si los tenés, servicios, capacidad, precios publicados…"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    No inventes datos: si algo no está confirmado, escribí “a confirmar”. La revisión
                    verifica la información antes de publicarla.
                  </p>
                </div>

                {/* Honeypot anti-spam */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="websiteTrap">No completar</label>
                  <input
                    id="websiteTrap"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.websiteTrap}
                    onChange={(e) => update('websiteTrap', e.target.value)}
                  />
                </div>

                <label className="flex items-start gap-3 rounded-xl bg-[#F7F4ED] border border-[#E5E3DC] p-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.authorization}
                    onChange={(e) => update('authorization', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#18685A]"
                    required
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    <strong className="text-[#102D2B]">Autorizo</strong> al portal Santa María de Fe
                    Digital y a la instancia de revisión municipal a verificar los datos de contacto y a
                    publicar la información de mi emprendimiento si la solicitud es aprobada. Entiendo
                    que el envío no garantiza la publicación.
                  </span>
                </label>

                {error && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] disabled:opacity-60 px-7 py-3 text-sm font-semibold text-white transition-colors"
                >
                  {status === 'sending' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-white border border-[#E5E3DC] p-6">
              <Store className="w-7 h-7 text-[#18685A]" aria-hidden="true" />
              <h2 className="font-serif text-xl font-bold text-[#102D2B] mt-3">Qué podés registrar</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>· Alojamientos y posadas</li>
                <li>· Restaurantes, heladerías y comedores</li>
                <li>· Talleres de artesanía y productores</li>
                <li>· Guías, experiencias y transporte turístico</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-[#E5E3DC] p-6">
              <ClipboardCheck className="w-7 h-7 text-[#18685A]" aria-hidden="true" />
              <h2 className="font-serif text-xl font-bold text-[#102D2B] mt-3">Cómo es la revisión</h2>
              <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>Recibimos la solicitud.</li>
                <li>Verificamos nombre, contacto y ubicación.</li>
                <li>Si falta un dato, te escribimos.</li>
                <li>Si se aprueba, se publica la ficha.</li>
              </ol>
              <p className="text-[11px] text-gray-500 mt-3">
                No se publican datos sin autorización ni sin verificación previa.
              </p>
            </div>

            <div className="rounded-2xl bg-[#102D2B] text-white p-6">
              <ShieldCheck className="w-7 h-7 text-emerald-300" aria-hidden="true" />
              <h2 className="font-serif text-xl font-bold mt-3">Tus datos</h2>
              <p className="text-sm text-[#E5E3DC]/85 mt-2 leading-relaxed">
                La información se usa solo para la revisión y la ficha pública. Podés pedir su
                corrección o baja escribiendo a la organización del portal.
              </p>
              <Link
                to="/privacidad"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200 mt-3"
              >
                Política de privacidad <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
