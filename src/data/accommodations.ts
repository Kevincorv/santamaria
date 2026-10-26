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
]

export const accommodationFromSlug = (slug: string): Accommodation | undefined =>
  accommodations.find((a) => a.slug === slug || a.id === slug)