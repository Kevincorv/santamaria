import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'
import { SmartImage } from '../components/ui/smart-image'
import { useSeo } from '../hooks/use-seo'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import {
  categoryConfig,
  createPinIcon,
  userLocationIcon,
  CITY_CENTER,
  type MapPoint,
} from '../components/map/map-style'
import { buildMapPoints, buildPendingLocations } from '../components/map/map-points'
import { places } from '../data/places'
import {
  Navigation,
  MapPin,
  Crosshair,
  AlertTriangle,
  ExternalLink,
  Landmark,
  Church,
  Columns3,
  TreePine,
  Bed,
  Utensils,
  Scissors,
  LayoutGrid,
  Leaf,
  Store,
} from 'lucide-react'

type MapCategory =
  | 'todos'
  | 'patrimonio-historico'
  | 'iglesia'
  | 'museos'
  | 'naturaleza'
  | 'alojamiento'
  | 'gastronomia'
  | 'artesanias'
  | 'agroindustria'
  | 'servicios'

const FlyTo: React.FC<{ lat: number; lon: number; trigger: number }> = ({ lat, lon, trigger }) => {
  const map = useMap()
  React.useEffect(() => {
    if (trigger > 0) map.flyTo([lat, lon], 16, { duration: 0.8 })
  }, [trigger, lat, lon, map])
  return null
}

export const MapPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MapCategory>('todos')
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)
  const [geoState, setGeoState] = useState<'idle' | 'loading' | 'denied' | 'error' | 'located'>('idle')
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
  const [flyTrigger, setFlyTrigger] = useState(0)
  const [geoMessage, setGeoMessage] = useState('')
  const [searchParams] = useSearchParams()

  useSeo({
    title: 'Mapa interactivo',
    description:
      'Mapa interactivo de Santa María de Fe con lugares turísticos, museo, iglesia, naturaleza, hoteles y restaurantes. Tu ubicación se usa solo con tu autorización explícita.',
    path: '/mapa',
  })

  const allPoints: MapPoint[] = useMemo(() => buildMapPoints(), [])

  /** Selección inicial a partir de ?lugar=<slug> (p. ej. desde una ficha). */
  useEffect(() => {
    const slug = searchParams.get('lugar')
    if (!slug) return
    const place = places.find((p) => p.slug === slug || p.id === slug)
    if (!place?.coordinates) return
    const point = allPoints.find((p) => p.id === place.id)
    if (point) {
      setSelectedPoint(point)
      setFlyTrigger((t) => t + 1)
    }
  }, [searchParams, allPoints])

  const filteredPoints = useMemo(
    () => (selectedCategory === 'todos' ? allPoints : allPoints.filter((p) => p.category === selectedCategory)),
    [allPoints, selectedCategory]
  )

  /** Sitios documentados sin coordenadas verificadas: NO se colocan en el mapa. */
  const pendingLocations = useMemo(() => buildPendingLocations(), [])

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoState('error')
      setGeoMessage('Tu navegador no soporta geolocalización.')
      return
    }
    setGeoState('loading')
    setGeoMessage('')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos: [number, number] = [position.coords.latitude, position.coords.longitude]
        setUserPosition(pos)
        setGeoState('located')
        setGeoMessage('Mostrando tu ubicación actual.')
        setFlyTrigger((t) => t + 1)
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setGeoState('denied')
          setGeoMessage('No autorizaste el acceso a tu ubicación. Podés navegar el mapa manualmente.')
        } else {
          setGeoState('error')
          setGeoMessage('No pudimos obtener tu ubicación. Probá nuevamente.')
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const filterButtons: { key: MapCategory; label: string; icon: React.ElementType }[] = [
    { key: 'todos', label: 'Todos', icon: LayoutGrid },
    { key: 'patrimonio-historico', label: 'Patrimonio', icon: Landmark },
    { key: 'iglesia', label: 'Iglesia', icon: Church },
    { key: 'museos', label: 'Museo', icon: Columns3 },
    { key: 'naturaleza', label: 'Naturaleza', icon: TreePine },
    { key: 'alojamiento', label: 'Hoteles', icon: Bed },
    { key: 'gastronomia', label: 'Gastronomía', icon: Utensils },
    { key: 'artesanias', label: 'Artesanías', icon: Scissors },
    { key: 'agroindustria', label: 'Agroindustria', icon: Leaf },
    { key: 'servicios', label: 'Servicios', icon: Store },
  ]

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#202724] flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#28685A]">
            Orientate
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102D2B] tracking-tight mt-1">
            Mapa interactivo
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Explorá la ciudad y encontrá todos los puntos de interés con ubicación verificada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar de filtros */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E5E3DC] p-4">
              <h2 className="font-serif text-base font-bold text-[#102D2B] mb-3">Categorías</h2>
              <div className="flex flex-col gap-1.5" role="group" aria-label="Filtrar marcadores por categoría">
                {filterButtons.map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setSelectedCategory(btn.key)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      selectedCategory === btn.key
                        ? 'bg-[#102D2B] text-white'
                        : 'text-gray-600 hover:bg-[#F7F4ED]'
                    }`}
                    aria-pressed={selectedCategory === btn.key}
                  >
                    <btn.icon className="w-4 h-4" aria-hidden="true" />
                    <span className="flex-1 text-left">{btn.label}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: categoryConfig[btn.key]?.color || '#102D2B' }}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E3DC] p-4">
              <h2 className="font-serif text-base font-bold text-[#102D2B] mb-2">Tu ubicación</h2>
              <p className="text-xs text-gray-600 mb-3">
                Solo se usa con tu autorización explícita y no se guarda en ningún servidor.
              </p>
              <button
                onClick={requestLocation}
                disabled={geoState === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#18685A] hover:bg-[#22806d] disabled:opacity-60 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                <Crosshair className="w-4 h-4" />
                {geoState === 'loading' ? 'Localizando…' : 'Usar mi ubicación'}
              </button>
              {geoMessage && (
                <p
                  className={`text-xs mt-3 ${
                    geoState === 'located'
                      ? 'text-emerald-700'
                      : geoState === 'denied'
                        ? 'text-amber-700'
                        : 'text-gray-600'
                  }`}
                >
                  {geoMessage}
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E3DC] p-4">
              <h2 className="font-serif text-base font-bold text-[#102D2B] mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" aria-hidden="true" />
                Pendientes de ubicación
              </h2>
              <p className="text-xs text-gray-600 mb-3">
                Estos sitios están documentados, pero sus coordenadas aún no fueron verificadas por lo que no se marcan en el mapa.
              </p>
              <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {pendingLocations.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="block rounded-lg px-2 py-1.5 hover:bg-[#F7F4ED] transition-colors">
                      <p className="text-sm font-medium text-[#102D2B] leading-snug">{item.name}</p>
                      <p className="text-[11px] text-amber-700">{item.note}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Mapa + tarjeta del punto seleccionado */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E5E3DC] overflow-hidden shadow-sm">
              <div className="h-[420px] sm:h-[520px] w-full">
                <MapContainer
                  center={CITY_CENTER}
                  zoom={15}
                  scrollWheelZoom
                  className="w-full h-full"
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {userPosition && (
                    <>
                      <Marker position={userPosition} icon={userLocationIcon}>
                        <Popup>Tu ubicación actual</Popup>
                      </Marker>
                      {selectedPoint && (
                        <FlyTo lat={selectedPoint.latitude} lon={selectedPoint.longitude} trigger={flyTrigger} />
                      )}
                    </>
                  )}
                  {filteredPoints.map((point) => (
                    <Marker
                      key={point.id}
                      position={[point.latitude, point.longitude]}
                      icon={createPinIcon(point.category, selectedPoint?.id === point.id)}
                      eventHandlers={{
                        click: () => setSelectedPoint(point),
                      }}
                    >
                      <Popup>
                        <div style={{ minWidth: 200 }}>
                          <p style={{ fontWeight: 700, color: '#102D2B', marginBottom: 4 }}>{point.name}</p>
                          <p style={{ fontSize: 12, color: '#555' }}>{point.kindLabel}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Tarjeta del punto seleccionado */}
            {selectedPoint ? (
              <div className="bg-white rounded-2xl border border-[#E5E3DC] p-4 flex flex-col sm:flex-row gap-4 shadow-sm">
                <SmartImage
                  src={selectedPoint.image}
                  alt={selectedPoint.name}
                  className="w-full sm:w-32 h-32 rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] uppercase tracking-wider font-semibold"
                    style={{ color: categoryConfig[selectedPoint.category]?.color || '#102D2B' }}
                  >
                    {selectedPoint.kindLabel}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#102D2B] leading-snug">{selectedPoint.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{selectedPoint.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {selectedPoint.latitude}, {selectedPoint.longitude}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      to={selectedPoint.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#18685A] hover:bg-[#22806d] px-4 py-2 text-xs font-semibold text-white transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" /> {selectedPoint.linkLabel}
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedPoint.latitude},${selectedPoint.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E3DC] text-gray-600 hover:border-gray-400 px-4 py-2 text-xs font-semibold transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Navegar
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E5E3DC] p-5 text-sm text-gray-600 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#28685A]" aria-hidden="true" />
                Tocá un marcador para ver el detalle del lugar y abrir su ficha.
              </div>
            )}

            <p className="text-xs text-gray-500">
              {filteredPoints.length} puntos con ubicación verificada (fuente: OpenStreetMap). Los sitios sin coordenadas confirmadas aparecen en la lista lateral, no en el mapa.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
