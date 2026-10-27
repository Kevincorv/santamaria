import { Accommodation } from '../types/places'
import { DATA_REVIEW_DATE, CONSULTAR_PREVIAMENTE } from './site'

/**
 * Alojamientos de Santa María de Fe con información publicada en fuentes
 * verificables (sitio oficial del Santa María Hotel, SENATUR, prensa).
 *
 * No se muestran estrellas ni puntuaciones: los agregadores de mapas no son
 * una fuente fiable de categorías. Los precios solo aparecen cuando existe
 * tarifa oficial publicada, con su año de referencia.
 */

export const accommodations: Accommodation[] = [
  {
    id: 'santa-maria-hotel',
    slug: 'santa-maria-hotel',
    name: 'Santa María Hotel',
    kind: 'hotel',
    category: 'alojamiento',
    categoryLabel: 'Hotel · Turismo solidario',
    shortDescription:
      'Hotel de turismo solidario fundado en 2006 por Margaret Hebblethwaite: 9 habitaciones, desayuno incluido y becas universitarias para la juventud del pueblo.',
    description:
      'Santa María Hotel se describe así: "En la reducción más famosa por su calma y espiritualidad se encuentra Santa María Hotel, el lugar perfecto para visitar las antiguas Misiones Jesuíticas y disfrutar de la paz en un ambiente rodeado de naturaleza y hospitalidad." Fue fundado en 2006 por la escritora y teóloga británica Margaret Hebblethwaite, radicada en el pueblo desde el año 2000, como un proyecto de turismo ético: "to bring work to a place of massive unemployment and to pay people a just wage for it" (versión oficial en inglés). La gerencia está a cargo de Milciades Mancuello. Sus ganancias sostienen el Santa Maria Education Fund, que financia becas universitarias y clases gratuitas de inglés en la comunidad.',
    images: ['/images/commons/casa-indios-hotel.jpg', '/images/commons/calle-01.jpg'],
    address: {
      street: 'Dr. Gaspar R. de Francia y Ciudad de Hays',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
      note: 'Código postal 4950 según el sitio oficial.',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Sitio oficial santamariahotel.org y Santa Maria Education Fund',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Santa María Hotel — sitio oficial', url: 'https://santamariahotel.org/?lang=es' },
      { title: 'Santa María Hotel — habitaciones y tarifas', url: 'https://santamariahotel.org/facilities/rooms/' },
      { title: 'Santa María Hotel — contacto', url: 'https://santamariahotel.org/contact-us/' },
      { title: 'Santa Maria Education Fund — becas universitarias', url: 'https://santamariadefe.org/what-we-do/scholarships/' },
    ],
    openingHours: 'Check-in 14:00 · Check-out 11:00 (según el sitio oficial).',
    services: [
      '9 habitaciones con baño privado',
      'Desayuno incluido',
      'Comidas caseras por reserva (no tiene restaurante ni carta fija)',
      'Aire acondicionado, ducha eléctrica, wifi',
      'Frigobar en algunas habitaciones',
      'Estacionamiento privado',
      'Traslados y tours a otras misiones',
      'Lavandería',
      'Biblioteca y salón para eventos',
    ],
    contact: {
      phone: '+595 781 283 311',
      whatsapp: '+595 981 861 553',
      email: 'info@santamariahotel.org',
      website: 'https://santamariahotel.org/?lang=es',
      instagram: 'https://www.instagram.com/santamaria.hotel/',
    },
    bookingUrl: 'https://santamariahotel.org/?lang=es',
    access: 'En el centro urbano de Santa María de Fe, a 15 km de San Ignacio por Ruta PY01.',
    recommendations: [
      'Reservá por WhatsApp o correo: el hotel atiende directamente, sin intermediarios.',
      'Las comidas caseras se piden con anticipación (no hay restaurante abierto al público).',
      'Preguntá por las visitas al taller de tapices, que funciona junto al hotel.',
    ],
    priceInfo:
      'Tarifas 2026 publicadas oficialmente: individual Gs. 180.000 · doble/twin Gs. 250.000 · triple Gs. 330.000 · cuádruple Gs. 400.000 · quíntuple Gs. 440.000 (desayuno incluido).',
    priceNote:
      'Tarifas correspondientes al año 2026 según el sitio oficial; pueden variar. Confirmá al reservar.',
  },
  {
    id: 'hospedaje-aguara',
    slug: 'hospedaje-aguara',
    name: 'Hospedaje Aguará',
    kind: 'hospedaje',
    category: 'alojamiento',
    categoryLabel: 'Hospedaje',
    shortDescription:
      'Hospedaje del centro de Santa María de Fe con teléfono de contacto publicado en directorios turísticos.',
    description:
      'El Hospedaje Aguará figura en directorios turísticos paraguayos y en fichas de mapas como opción de alojamiento en el centro de Santa María de Fe. No se encontraron sitios web oficiales ni tarifas publicadas: la disponibilidad y los servicios se confirman por teléfono.',
    images: ['/images/commons/calle-01.jpg'],
    coordinates: { latitude: -26.7818, longitude: -56.9428 },
    coordinatesSource:
      'Directorio turístico Ahendu (coordenada aproximada del centro urbano); no verificada en OpenStreetMap.',
    address: {
      street: 'Centro de Santa María de Fe',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Directorio Ahendu y fichas públicas de mapas; sin sitio oficial',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Ahendu — guía de San Ignacio y Santa María de Fe', url: 'https://ahendu.com.py/turismo/guia-de-san-ignacio-santa-maria/' },
    ],
    services: [CONSULTAR_PREVIAMENTE],
    contact: { phone: '+595 984 780 304' },
    access: 'Centro urbano.',
    recommendations: ['Confirmá servicios, tarifas y horarios directamente por teléfono.'],
    priceInfo: CONSULTAR_PREVIAMENTE,
  },
  {
    id: 'posada-tio-lalo',
    slug: 'posada-tio-lalo',
    name: 'Posada Tío Lalo',
    kind: 'posada',
    category: 'alojamiento',
    categoryLabel: 'Posada · Datos en verificación',
    shortDescription:
      'Posada publicada por SENATUR, pero con las fuentes en conflicto sobre el distrito al que pertenece: verificar antes de viajar.',
    description:
      'La Posada Tío Lalo aparece en el listado oficial de posadas turísticas de la SENATUR (febrero 2024) con el teléfono (0992) 611268, pero figura bajo el distrito de Santa Rosa, distinto de Santa María de Fe. En fichas de mapas públicas, el mismo número aparece como "Hospedaje Tío Lalo" ubicado en el centro de Santa María de Fe. Debido a esa discrepancia entre fuentes, este alojamiento se publica con estado de verificación pendiente.',
    images: ['/images/commons/calle-01.jpg'],
    coordinates: { latitude: -26.7827, longitude: -56.943 },
    coordinatesSource:
      'Ficha pública de mapas (coordenada aproximada). Contradice la ubicación del listado SENATUR (Santa Rosa); confirmar en el lugar.',
    address: {
      street: 'Esquina de Mariscal López y Gral. Bernardino Caballero (según ficha de mapas)',
      city: 'Santa María de Fe (en conflicto: SENATUR lo lista en Santa Rosa)',
      region: 'Misiones',
      country: 'Paraguay',
      note: 'Las fuentes difieren sobre el distrito. Verificar antes de viajar.',
    },
    verificationStatus: {
      status: 'needs_update',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Listado SENATUR de posadas turísticas (2024) vs. fichas de mapas públicas',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'SENATUR — Listado de posadas turísticas (PDF, febrero 2024)', url: 'https://senatur.gov.py/wp-content/uploads/2024/03/listado-posadas-turisticas.pdf' },
    ],
    services: [CONSULTAR_PREVIAMENTE],
    contact: { phone: '+595 992 611 268' },
    access: CONSULTAR_PREVIAMENTE,
    recommendations: [
      'Llamá antes de ir: las fuentes difieren sobre si opera en Santa María de Fe o en Santa Rosa.',
    ],
    priceInfo: CONSULTAR_PREVIAMENTE,
  },
  {
    id: 'posada-nanderoga',
    slug: 'posada-nanderoga',
    name: 'Posada ÑandeRoga',
    kind: 'posada',
    category: 'alojamiento',
    categoryLabel: 'Posada · Datos parciales',
    shortDescription:
      'Posada mencionada en guías con desayuno y quincho con parrilla; sin datos de contacto publicados.',
    description:
      'La Posada ÑandeRoga aparece en guías turísticas locales con desayuno y quincho con parrilla, y en listados de alojamientos turísticos en línea. No se encontraron sitio web propio, teléfono ni reseñas verificables publicados, por lo que se incluye como opción a confirmar en el lugar.',
    images: ['/images/commons/calle-01.jpg'],
    address: {
      street: CONSULTAR_PREVIAMENTE,
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Guía Ahendu y listados de alojamientos en línea sin reseñas',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Ahendu — guía de San Ignacio y Santa María de Fe', url: 'https://ahendu.com.py/turismo/guia-de-san-ignacio-santa-maria/' },
    ],
    services: ['Desayuno (mencionado en guía)', 'Quincho con parrilla (mencionado en guía)'],
    access: CONSULTAR_PREVIAMENTE,
    recommendations: ['Confirmá existencia, dirección y disponibilidad en la oficina de turismo local.'],
    priceInfo: CONSULTAR_PREVIAMENTE,
  },
]

export const accommodationFromSlug = (slug: string): Accommodation | undefined =>
  accommodations.find((a) => a.slug === slug || a.id === slug)