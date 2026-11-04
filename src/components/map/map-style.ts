// Leaflet empaquetado desde node_modules: evita el CDN unpkg, que el service
// worker cacheaba como respuesta "opaque" y rompía el mapa interactivo
// (FetchEvent ... an "opaque" response was used for a request whose type is
// not no-cors). Al ir en el bundle, no hay CORS, ni SRI, ni caché externa.
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

/**
 * Configuración visual compartida de los marcadores del mapa.
 * Los colores distinguen categorías reales del portal.
 */
export const categoryConfig: Record<string, { color: string; label: string }> = {
  'patrimonio-historico': { color: '#102D2B', label: 'Patrimonio' },
  iglesia: { color: '#28685A', label: 'Iglesia' },
  museos: { color: '#C25E00', label: 'Museo' },
  naturaleza: { color: '#166534', label: 'Naturaleza' },
  alojamiento: { color: '#1E40AF', label: 'Alojamiento' },
  gastronomia: { color: '#B45309', label: 'Gastronomía' },
  artesanias: { color: '#7C3AED', label: 'Artesanía' },
  agroindustria: { color: '#A16207', label: 'Agroindustria' },
  servicios: { color: '#0E7490', label: 'Servicio' },
}

export const createPinIcon = (category: string, isSelected: boolean) => {
  const config = categoryConfig[category] || { color: '#102D2B' }
  const size = isSelected ? 40 : 30
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${config.color};
      border:3px solid #fff;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 3px 8px rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;">
      <span style="transform:rotate(45deg);color:#fff;font-weight:700;font-size:11px;">●</span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 6],
  })
}

export const userLocationIcon = L.divIcon({
  className: 'custom-map-marker',
  html: `<div style="width:18px;height:18px;background:#2563EB;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 6px rgba(37,99,235,.25);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

/** Centro aproximado del casco urbano de Santa María de Fe. */
export const CITY_CENTER: [number, number] = [-26.7831, -56.9441]

export interface MapPoint {
  id: string
  name: string
  category: string
  kindLabel: string
  latitude: number
  longitude: number
  description: string
  href: string
  image?: string
  linkLabel: string
}
