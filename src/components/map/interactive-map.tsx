import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import {
  LayoutGrid,
  Landmark,
  Church,
  Columns3,
  TreePine,
  Bed,
  Utensils,
  Scissors,
  Leaf,
  Store,
  MapPin,
  Navigation,
  ExternalLink,
} from 'lucide-react'
import { SmartImage } from '../ui/smart-image'
import {
  categoryConfig,
  createPinIcon,
  userLocationIcon,
  CITY_CENTER,
  type MapPoint,
} from './map-style'
import { buildMapPoints } from './map-points'

type FilterKey = 'todos' | string

const filterButtons: { key: FilterKey; label: string; icon: React.ElementType }[] = [
  { key: 'todos', label: 'Todos', icon: LayoutGrid },
  { key: 'patrimonio-historico', label: 'Lugares Históricos', icon: Landmark },
  { key: 'iglesia', label: 'Iglesia', icon: Church },
  { key: 'museos', label: 'Museo', icon: Columns3 },
  { key: 'naturaleza', label: 'Naturaleza', icon: TreePine },
  { key: 'alojamiento', label: 'Hoteles', icon: Bed },
  { key: 'gastronomia', label: 'Gastronomía', icon: Utensils },
  { key: 'artesanias', label: 'Artesanías', icon: Scissors },
  { key: 'agroindustria', label: 'Agroindustria', icon: Leaf },
  { key: 'servicios', label: 'Comercios', icon: Store },
]

const FlyTo: React.FC<{ lat: number; lon: number; trigger: number }> = ({ lat, lon, trigger }) => {
  const map = useMap()
  React.useEffect(() => {
    if (trigger > 0) map.flyTo([lat, lon], 16, { duration: 0.8 })
  }, [trigger, lat, lon, map])
  return null
}

export interface InteractiveMapProps {
  /** Altura del área del mapa. */
  heightClassName?: string
  /** Mostrar el botón de ubicación del usuario. */
  allowGeolocation?: boolean
  /** Enlace al mapa completo. */
  showFullMapLink?: boolean
}

/**
 * Mapa interactivo compacto (Leaflet + OpenStreetMap) con filtros por
 * categoría y tarjeta de detalle superpuesta. Reutilizado en la portada.
 */
export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  heightClassName = 'h-[380px] sm:h-[440px]',
  allowGeolocation = true,
  showFullMapLink = true,
}) => {
  const allPoints = useMemo(() => buildMapPoints(), [])
  const [filter, setFilter] = useState<FilterKey>('todos')
  const [selected, setSelected] = useState<MapPoint | null>(allPoints[0] ?? null)
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
  const [flyTrigger, setFlyTrigger] = useState(0)
  const [geoState, setGeoState] = useState<'idle' | 'loading' | 'denied' | 'error' | 'located'>('idle')

  const points = useMemo(
    () => (filter === 'todos' ? allPoints : allPoints.filter((p) => p.category === filter)),
    [allPoints, filter]
  )

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of allPoints) map.set(p.category, (map.get(p.category) ?? 0) + 1)
    return map
  }, [allPoints])

  const selectPoint = (point: MapPoint) => {
    setSelected(point)
    setFlyTrigger((t) => t + 1)
  }

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoState('error')
      return
    }
    setGeoState('loading')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude])
        setGeoState('located')
        setFlyTrigger((t) => t + 1)
      },
      (error) => {
        setGeoState(error.code === error.PERMISSION_DENIED ? 'denied' : 'error')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-brand-line overflow-hidden shadow-card">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
        {/* ---------- Filtros ---------- */}
        <aside className="p-4 border-b lg:border-b-0 lg:border-r border-brand-line">
          <h3 className="text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-3 px-1">
            Filtrar por tipo
          </h3>
          <div
            className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0"
            role="group"
            aria-label="Filtrar marcadores por categoría"
          >
            {filterButtons.map((btn) => {
              const active = filter === btn.key
              const total = btn.key === 'todos' ? allPoints.length : counts.get(btn.key) ?? 0
              return (
                <button
                  key={btn.key}
                  type="button"
                  onClick={() => setFilter(btn.key)}
                  aria-pressed={active}
                  disabled={btn.key !== 'todos' && total === 0}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${
                    active ? 'bg-brand-forest text-white' : 'text-gray-600 hover:bg-brand-bg'
                  }`}
                >
                  <btn.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1 text-left">{btn.label}</span>
                  <span
                    className={`text-[11px] tabular-nums ${active ? 'text-white/60' : 'text-gray-400'}`}
                  >
                    {total}
                  </span>
                </button>
              )
            })}
          </div>

          {allowGeolocation && (
            <div className="mt-4 pt-4 border-t border-brand-line">
              <button
                type="button"
                onClick={requestLocation}
                disabled={geoState === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-green hover:bg-brand-green-2 disabled:opacity-60 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                {geoState === 'loading' ? 'Localizando…' : 'Usar mi ubicación'}
              </button>
              <p className="mt-2 text-[11px] text-gray-500 leading-relaxed">
                {geoState === 'located'
                  ? 'Mostrando tu ubicación actual.'
                  : geoState === 'denied'
                    ? 'No autorizaste el acceso a tu ubicación. Podés navegar el mapa manualmente.'
                    : geoState === 'error'
                      ? 'No pudimos obtener tu ubicación.'
                      : 'Tu ubicación se usa solo con tu autorización explícita.'}
              </p>
            </div>
          )}
        </aside>

        {/* ---------- Mapa ---------- */}
        <div className="relative">
          <div className={`w-full ${heightClassName}`}>
            <MapContainer
              center={CITY_CENTER}
              zoom={15}
              scrollWheelZoom
              className="w-full h-full"
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {userPosition && (
                <>
                  <Marker position={userPosition} icon={userLocationIcon}>
                    <Popup>Tu ubicación actual</Popup>
                  </Marker>
                  {selected && <FlyTo lat={userPosition[0]} lon={userPosition[1]} trigger={flyTrigger} />}
                </>
              )}
              {!userPosition && selected && (
                <FlyTo lat={selected.latitude} lon={selected.longitude} trigger={flyTrigger} />
              )}
              {points.map((point) => (
                <Marker
                  key={point.id}
                  position={[point.latitude, point.longitude]}
                  icon={createPinIcon(point.category, selected?.id === point.id)}
                  eventHandlers={{ click: () => setSelected(point) }}
                >
                  <Popup>
                    <div style={{ minWidth: 190 }}>
                      <p style={{ fontWeight: 700, color: '#102D2B', marginBottom: 4 }}>{point.name}</p>
                      <p style={{ fontSize: 12, color: '#555' }}>{point.kindLabel}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Tarjeta flotante del punto seleccionado */}
          {selected && (
            <div className="absolute left-3 right-3 sm:right-auto sm:w-[330px] bottom-3 bg-white rounded-xl shadow-card-hover border border-brand-line p-2.5 animate-fade-up">
              <div className="flex items-start gap-3">
                <SmartImage
                  src={selected.image}
                  alt={selected.name}
                  className="w-[68px] h-[68px] rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-brand-pine leading-snug line-clamp-2">
                    {selected.name}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 shrink-0 text-brand-green" aria-hidden="true" />
                    Santa María de Fe, Misiones
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Link
                      to={selected.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-green hover:bg-brand-green-2 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors"
                    >
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      Ver detalles
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selected.latitude},${selected.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${selected.name} en Google Maps`}
                      className="w-7 h-7 grid place-items-center rounded-full border border-brand-line text-gray-500 hover:text-brand-green hover:border-brand-green transition-colors"
                    >
                      <Navigation className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------- Pie del mapa ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-brand-line">
        <p className="text-[11.5px] text-gray-500">
          {points.length} puntos con ubicación verificada · Fuente: OpenStreetMap
        </p>
        {showFullMapLink && (
          <Link
            to="/mapa"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-green hover:text-brand-green-2 transition-colors"
          >
            Ver mapa completo
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  )
}
