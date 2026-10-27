export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Address {
  street?: string
  number?: string
  city?: string
  region?: string
  country?: string
  note?: string
}

export interface Contact {
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  instagram?: string
  facebook?: string
}

export type VerificationState = 'verified' | 'pending' | 'needs_update'

export interface VerificationStatus {
  status: VerificationState
  lastChecked?: string
  source?: string
}

/** Fuente bibliográfica con URL cuando existe. */
export interface SourceRef {
  title: string
  url?: string
  date?: string
}

export interface PlaceBase {
  id: string
  slug: string
  name: string
  category: string
  categoryLabel?: string
  shortDescription: string
  description: string
  history?: string
  images: string[]
  /** Solo coordenadas verificadas (OpenStreetMap, EXIF de fotografía u otra fuente georreferenciada). */
  coordinates?: Coordinates
  /** Descripción de cómo se verificaron las coordenadas. */
  coordinatesSource?: string
  address: Address
  verificationStatus: VerificationStatus
  lastUpdated: string
  sources: SourceRef[]
  openingHours?: string
  /** Nota o advertencia sobre horarios (p. ej. fuentes en conflicto). */
  openingHoursNote?: string
  services?: string[]
  contact?: Contact
  access?: string
  recommendations?: string[]
  priceInfo?: string
  priceNote?: string
}

export interface Place extends PlaceBase {
  nearbyPlaces?: string[]
}

export interface Accommodation extends PlaceBase {
  /** Tipo de alojamiento: hotel, posada, hospedaje, iniciativa. */
  kind: 'hotel' | 'posada' | 'hospedaje' | 'iniciativa'
  services: string[]
  /** Enlaces de reserva solo cuando existen oficialmente. */
  bookingUrl?: string
}

export interface Restaurant extends PlaceBase {
  kind: string
}

export interface Celebration {
  id: string
  title: string
  description: string
  category: 'religiosa' | 'cultural' | 'deportiva' | 'gastronomica'
  /** Fecha o periodo tradicional; nunca fechas futuras inventadas. */
  when: string
  /** Horarios publicados o pauta tradicional, sin inventar horas. */
  schedule?: string
  venue?: string
  image?: string
  coordinates?: Coordinates
  verificationStatus: VerificationStatus
  lastUpdated: string
  sources: SourceRef[]
  note?: string
}

export interface Craft {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  products: string[]
  image?: string
  contact?: Contact
  address?: Address
  verificationStatus: VerificationStatus
  lastUpdated: string
  sources: SourceRef[]
}

export interface Experience {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  kind: string
  image?: string
  contact?: Contact
  verificationStatus: VerificationStatus
  lastUpdated: string
  sources: SourceRef[]
  note?: string
}

export interface TourRoute {
  id: string
  title: string
  description: string
  stopSlugs: string[]
  estimatedDuration?: string
  verificationStatus: VerificationStatus
  lastUpdated: string
  image?: string
  note?: string
}

export type Category =
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
