import { places } from '../../data/places'
import { accommodations } from '../../data/accommodations'
import { restaurants } from '../../data/restaurants'
import type { MapPoint } from './map-style'

/**
 * Puntos del mapa a partir de los datos verificados del portal.
 * Solo se georreferencian los registros con coordenadas confirmadas.
 */
export const buildMapPoints = (): MapPoint[] => {
  const fromPlaces: MapPoint[] = places
    .filter((p) => p.coordinates)
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      kindLabel: p.categoryLabel || 'Lugar',
      latitude: p.coordinates!.latitude,
      longitude: p.coordinates!.longitude,
      description: p.shortDescription,
      href: `/lugares/${p.slug}`,
      image: p.images?.[0],
      linkLabel: 'Ver ficha',
    }))

  const fromHotels: MapPoint[] = accommodations
    .filter((a) => a.coordinates)
    .map((a) => ({
      id: a.id,
      name: a.name,
      category: 'alojamiento',
      kindLabel: a.categoryLabel || 'Alojamiento',
      latitude: a.coordinates!.latitude,
      longitude: a.coordinates!.longitude,
      description: a.shortDescription,
      href: '/hospedajes',
      image: a.images?.[0],
      linkLabel: 'Ver alojamientos',
    }))

  const fromFood: MapPoint[] = restaurants
    .filter((r) => r.coordinates)
    .map((r) => ({
      id: r.id,
      name: r.name,
      category: 'gastronomia',
      kindLabel: r.kind,
      latitude: r.coordinates!.latitude,
      longitude: r.coordinates!.longitude,
      description: r.shortDescription,
      href: '/gastronomia',
      image: r.images?.[0],
      linkLabel: 'Ver gastronomía',
    }))

  return [...fromPlaces, ...fromHotels, ...fromFood]
}

export interface PendingLocation {
  name: string
  note: string
  href: string
}

/** Registros documentados SIN coordenadas verificadas: nunca se marcan en el mapa. */
export const buildPendingLocations = (): PendingLocation[] => [
  ...places
    .filter((p) => !p.coordinates)
    .map((p) => ({ name: p.name, note: 'Coordenadas pendientes de verificar', href: `/lugares/${p.slug}` })),
  ...accommodations
    .filter((a) => !a.coordinates)
    .map((a) => ({ name: a.name, note: 'Dirección exacta sin verificar', href: '/hospedajes' })),
  ...restaurants
    .filter((r) => !r.coordinates)
    .map((r) => ({ name: r.name, note: 'Ubicación sin verificar', href: '/gastronomia' })),
]
