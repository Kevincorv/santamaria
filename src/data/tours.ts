import { TourRoute } from '../types/places'
import { DATA_REVIEW_DATE } from './site'

/**
 * Recorridos autoguiados basados en los lugares reales del catálogo.
 * Las duraciones son estimaciones de caminata, no servicios contratados.
 */

export const tours: TourRoute[] = [
  {
    id: 'circuito-historico-jesuitico',
    title: 'Circuito histórico y jesuítico',
    description:
      'Caminata por el casco fundacional: la Plaza Mariscal Estigarribia con sus monos, la iglesia parroquial y el museo de arte jesuítico guaraní en la antigua Casa de Indios. Termina en el Ykua Teja, el manantial que abasteció a la reducción.',
    stopSlugs: ['plaza-mariscal-estigarribia', 'iglesia-santa-maria', 'museo-diocesano', 'ykua-teja'],
    estimatedDuration: '2 a 3 horas (caminata tranquila)',
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Lugares verificados del catálogo con coordenadas OpenStreetMap',
    },
    lastUpdated: DATA_REVIEW_DATE,
    image: '/images/commons/plaza-iglesia-01.jpg',
    note: 'Todo el circuito es a pie y en el centro urbano.',
  },
  {
    id: 'circuito-espiritualidad-artesania',
    title: 'Espiritualidad y artesanía viva',
    description:
      'Recorrido por la memoria religiosa y el trabajo de la comunidad: iglesia parroquial, Taller de Hermandad, taller de tapices junto al Santa María Hotel y la comunidad monástica con su taller de dulces a leña.',
    stopSlugs: ['iglesia-santa-maria', 'taller-hermandad', 'taller-tapices', 'monasterio-san-jose'],
    estimatedDuration: 'Medio día (coordinando visitas)',
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Requiere coordinación previa con cada taller',
    },
    lastUpdated: DATA_REVIEW_DATE,
    image: '/images/commons/calle-01.jpg',
    note: 'Las visitas a talleres y monasterio deben coordinarse con anticipación por sus canales de contacto.',
  },
  {
    id: 'circuito-naturaleza',
    title: 'Naturaleza y Kurusu Cerro',
    description:
      'Salida hacia el Kurusu Cerro: 9 km en vehículo hasta la base, sendero de unos 2 km con estaciones del calvario y capilla en la cima. Opcional: granja y cascada El Chorro en la compañía Tava, a unos 5 km del pueblo.',
    stopSlugs: ['kurusu-cerro', 'granja-5-de-mayo'],
    estimatedDuration: 'Medio día a un día completo',
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'La Nación (peregrinación) y Wikipedia (granja); verificar acceso in situ',
    },
    lastUpdated: DATA_REVIEW_DATE,
    image: '/images/commons/acceso-ruta.jpg',
    note: 'Llevá agua, protector solar y calzado de senderismo. El acceso al cerro está sujeto a condiciones del camino.',
  },
  {
    id: 'circuito-bonpland',
    title: 'Ruta de Bonpland',
    description:
      'Recorrido por la memoria del naturalista Aimé Bonpland en Santa María de Fe: la casa-museo con su huerta medicinal y el contexto histórico de su confinamiento (1821–1831), con degustación de dulces y licores de la tradición local.',
    stopSlugs: ['casa-museo-bonpland', 'plaza-mariscal-estigarribia'],
    estimatedDuration: '2 horas',
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'RFI (2023); condiciones de visita de la casa-museo sin publicar',
    },
    lastUpdated: DATA_REVIEW_DATE,
    image: '/images/calle-colonial.jpg',
    note: 'Consultá previamente las condiciones de visita de la casa-museo.',
  },
]

export const tourFromSlug = (id: string): TourRoute | undefined =>
  tours.find((t) => t.id === id)
