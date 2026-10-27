import { places, placeFromSlug } from '../data/places'
import { accommodations } from '../data/accommodations'
import { restaurants } from '../data/restaurants'
import { crafts, experiences } from '../data/crafts'
import { Place, Accommodation, Restaurant, Craft, Experience } from '../types/places'

export { placeFromSlug }

export const getPlacesByCategory = (category: string): Place[] => {
  if (category === 'todos') return places
  return places.filter((place) => place.category === category)
}

export const calculateDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371 // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}

export const getNearbyPlaces = (place: Place, radiusKm = 10): Place[] => {
  if (!place.coordinates) return []
  return places
    .filter((p) => p.id !== place.id && p.coordinates)
    .map((p) => ({
      place: p,
      distance: calculateDistanceKm(
        place.coordinates!.latitude,
        place.coordinates!.longitude,
        p.coordinates!.latitude,
        p.coordinates!.longitude
      ),
    }))
    .filter((item) => item.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
    .map((item) => item.place)
}

export type SearchKind = 'lugar' | 'alojamiento' | 'restaurante' | 'artesania' | 'experiencia'

export interface SearchResult {
  kind: SearchKind
  kindLabel: string
  id: string
  slug: string
  name: string
  description: string
  /** Ruta de la ficha (lugares y alojamientos tienen ficha propia). */
  href: string
  image?: string
  hasCoordinates: boolean
}

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const buildIndex = (): SearchResult[] => {
  const results: SearchResult[] = []

  places.forEach((p) =>
    results.push({
      kind: 'lugar',
      kindLabel: p.categoryLabel || 'Lugar',
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.shortDescription,
      href: `/lugares/${p.slug}`,
      image: p.images[0],
      hasCoordinates: Boolean(p.coordinates),
    })
  )

  accommodations.forEach((a: Accommodation) =>
    results.push({
      kind: 'alojamiento',
      kindLabel: a.categoryLabel || 'Alojamiento',
      id: a.id,
      slug: a.slug,
      name: a.name,
      description: a.shortDescription,
      href: `/hospedajes/${a.slug}`,
      image: a.images[0],
      hasCoordinates: Boolean(a.coordinates),
    })
  )

  restaurants.forEach((r: Restaurant) =>
    results.push({
      kind: 'restaurante',
      kindLabel: r.kind || 'Gastronomía',
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.shortDescription,
      href: `/gastronomia`,
      image: r.images[0],
      hasCoordinates: Boolean(r.coordinates),
    })
  )

  crafts.forEach((c: Craft) =>
    results.push({
      kind: 'artesania',
      kindLabel: 'Artesanía',
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.shortDescription,
      href: `/artesania`,
      image: c.image,
      hasCoordinates: false,
    })
  )

  experiences.forEach((e: Experience) =>
    results.push({
      kind: 'experiencia',
      kindLabel: e.kind || 'Experiencia',
      id: e.id,
      slug: e.slug,
      name: e.name,
      description: e.shortDescription,
      href: `/artesania`,
      image: e.image,
      hasCoordinates: false,
    })
  )

  return results
}

export const searchIndex: SearchResult[] = buildIndex()

/** Buscador unificado: lugares, alojamientos, restaurantes, artesanías y experiencias. */
export const searchAll = (query: string, kindFilter?: SearchKind | 'todos'): SearchResult[] => {
  const q = normalize(query.trim())
  return searchIndex.filter((item) => {
    const matchesKind = !kindFilter || kindFilter === 'todos' || item.kind === kindFilter
    if (!matchesKind) return false
    if (!q) return true
    return normalize(`${item.name} ${item.description} ${item.kindLabel}`).includes(q)
  })
}

export const KIND_LABELS: Record<SearchKind, string> = {
  lugar: 'Lugares',
  alojamiento: 'Alojamientos',
  restaurante: 'Gastronomía',
  artesania: 'Artesanías',
  experiencia: 'Experiencias',
}
