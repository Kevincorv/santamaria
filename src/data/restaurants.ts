import { Restaurant } from '../types/places'
import { DATA_REVIEW_DATE, CONSULTAR_PREVIAMENTE } from './site'

/**
 * Locales gastronómicos de Santa María de Fe con presencia pública verificable.
 * No se inventan menús ni precios: solo lo publicado por prensa, guías o mapas
 * abiertos. Los negocios de otros distritos se listan aparte como alternativas
 * cercanas, claramente identificados como fuera del distrito.
 */

export const restaurants: Restaurant[] = [
  {
    id: 'delicias-tati',
    slug: 'delicias-tati',
    name: 'Delicias Tati',
    kind: 'Heladería · Pizzería · Pastelería',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía local',
    shortDescription:
      'Referencia gastronómica de Misiones: helados artesanales, pizzas, picadas y pastelería sobre el Paseo Jesuítico, a una cuadra de la plaza.',
    description:
      'Delicias Tati nació, según sus dueños, "ante una necesidad familiar" y se convirtió en una referencia gastronómica de Misiones. En una entrevista publicada por La Nación explican: "Vendemos helados artesanales, pizzas, picadas y tenemos nuestra pastelería". Está ubicada sobre el Paseo Jesuítico, a una cuadra de la plaza central. Es una empresa familiar de Edith Luisa Enciso García y José Domingo Valenzuela Maidana, y abre de lunes a lunes.',
    images: ['/images/commons/calle-01.jpg'],
    coordinates: { latitude: -26.7815143, longitude: -56.9424025 },
    coordinatesSource: 'Nodo "Delicias Tati" (amenity=fast_food) en OpenStreetMap.',
    address: {
      street: 'Paseo Jesuítico, a una cuadra de la plaza central',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'La Nación (2024) y OpenStreetMap',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'La Nación — "Delicias Tati: nació ante una necesidad familiar y hoy es referencia gastronómica de Misiones"', url: 'https://www.lanacion.com.py/pais/2024/06/15/delicias-tati-nacio-ante-una-necesidad-familiar-y-hoy-es-referencia-gastronomica-de-misiones/' },
      { title: 'OpenStreetMap — Delicias Tati', url: 'https://www.openstreetmap.org/search?query=Delicias%20Tati%20Santa%20Mar%C3%ADa%20de%20Fe' },
    ],
    openingHours: 'Abierto de lunes a lunes (según entrevista en La Nación, 2024).',
    openingHoursNote: 'Los horarios exactos no fueron publicados; confirmá antes de ir.',
    services: ['Helados artesanales', 'Pizza', 'Picadas', 'Pastelería'],
    access: 'A una cuadra de la Plaza Mariscal Estigarribia, por el Paseo Jesuítico.',
    recommendations: [
      'Es una de las paradas gastronómicas más recomendadas por la prensa nacional.',
      'Ideal para helado artesanal después de recorrer la plaza y el museo.',
    ],
    priceInfo: CONSULTAR_PREVIAMENTE,
    priceNote: 'No se publicaron precios; consultar en el local.',
  },
  {
    id: 'la-familia-resto-bar',
    slug: 'la-familia-resto-bar',
    name: 'La Familia Resto Bar',
    kind: 'Resto bar',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía local',
    shortDescription:
      'Resto bar del centro, sobre la calle Héroes del Chaco, registrado en guías turísticas de la zona.',
    description:
      'La Familia Resto Bar figura en la guía turística de San Ignacio y Santa María de Fe como resto bar ubicado sobre la calle Héroes del Chaco. No se encontraron publicados menú, horarios, teléfono ni redes sociales oficiales del local: todos los datos de contacto se confirman en el lugar.',
    images: ['/images/commons/calle-01.jpg'],
    coordinates: { latitude: -26.78404, longitude: -56.95092 },
    coordinatesSource:
      'Guía Ahendu / directorio turístico (coordenada aproximada); no verificada en OpenStreetMap.',
    address: {
      street: 'Héroes del Chaco',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Guía Ahendu de turismo (2026)',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Ahendu — guía de San Ignacio y Santa María de Fe', url: 'https://ahendu.com.py/turismo/guia-de-san-ignacio-santa-maria/' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE,
    openingHoursNote: 'Sin horarios publicados en fuentes consultadas.',
    services: [CONSULTAR_PREVIAMENTE],
    access: 'Calle Héroes del Chaco, Santa María de Fe.',
    recommendations: ['Confirmá horarios y disponibilidad en el local.'],
    priceInfo: CONSULTAR_PREVIAMENTE,
    priceNote: 'Sin menú ni precios publicados en fuentes consultadas.',
  },
  {
    id: 'dolce-aroma',
    slug: 'dolce-aroma',
    name: 'Dolce Aroma',
    kind: 'Restaurante',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía local',
    shortDescription:
      'Restaurante del centro registrado en OpenStreetMap y en directorios turísticos, en Independencia Nacional y 8 de Septiembre.',
    description:
      'Dolce Aroma figura en OpenStreetMap como restaurante con cocina de hamburguesas y sándwiches, y en el directorio Ahendu en Independencia Nacional y 8 de Septiembre. No se encontraron publicados menú oficial, precios ni teléfono.',
    images: ['/images/commons/calle-01.jpg'],
    coordinates: { latitude: -26.7852101, longitude: -56.9429876 },
    coordinatesSource: 'Nodo "Dolce Aroma Bar Gorumet" (amenity=restaurant) en OpenStreetMap.',
    address: {
      street: 'Independencia Nacional y 8 de Septiembre',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'OpenStreetMap y guía Ahendu',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'OpenStreetMap — Dolce Aroma Bar Gorumet', url: 'https://www.openstreetmap.org/search?query=Dolce%20Aroma%20Santa%20Mar%C3%ADa%20de%20Fe' },
      { title: 'Ahendu — guía de San Ignacio y Santa María de Fe', url: 'https://ahendu.com.py/turismo/guia-de-san-ignacio-santa-maria/' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE,
    services: ['Restaurante (cocina informada: hamburguesas y sándwiches)'],
    access: 'Esquina de Independencia Nacional y 8 de Septiembre.',
    recommendations: ['No confundir con cadenas homónimas de otras ciudades.'],
    priceInfo: CONSULTAR_PREVIAMENTE,
  },
  {
    id: 'heladeria-sandy',
    slug: 'heladeria-sandy',
    name: 'Heladería Sandy',
    kind: 'Heladería',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía local',
    shortDescription: 'Heladería junto a la plaza principal, registrada en OpenStreetMap y guías locales.',
    description:
      'La heladería Sandy está registrada en OpenStreetMap como comercio de helados junto a la plaza principal de Santa María de Fe, y aparece en la guía turística local como "heladería junto a la plaza". No se encontraron publicados horarios, teléfono ni menú.',
    images: ['/images/commons/plaza-central-01.jpg'],
    coordinates: { latitude: -26.7825289, longitude: -56.9437597 },
    coordinatesSource: 'Nodo "Sandy" (amenity=ice_cream) en OpenStreetMap.',
    address: {
      street: 'Junto a la Plaza Mariscal Estigarribia',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'OpenStreetMap y guía Ahendu',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'OpenStreetMap — Sandy (heladería)', url: 'https://www.openstreetmap.org/search?query=Sandy%20Santa%20Mar%C3%ADa%20de%20Fe' },
      { title: 'Ahendu — guía de San Ignacio y Santa María de Fe', url: 'https://ahendu.com.py/turismo/guia-de-san-ignacio-santa-maria/' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE,
    services: ['Helados'],
    access: 'Junto a la plaza central.',
    recommendations: ['Buena parada después de visitar la iglesia y el museo.'],
    priceInfo: CONSULTAR_PREVIAMENTE,
  },
  {
    id: 'comidas-santa-maria-hotel',
    slug: 'comidas-santa-maria-hotel',
    name: 'Comidas caseras del Santa María Hotel',
    kind: 'Comida casera por reserva',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía local',
    shortDescription:
      'Cocina casera misionera servida a huéspedes y visitantes por reserva, en el hotel de turismo solidario del pueblo.',
    description:
      'El Santa María Hotel informa que ofrece comidas caseras preparadas por reserva, con el desayuno incluido en la estadía. En su sitio oficial aclara: "No tenemos restaurante ni carta fija": la cocina se organiza según lo coordinado con anticipación, con platos de la cocina paraguaya y misionera.',
    images: ['/images/commons/casa-indios-hotel.jpg'],
    address: {
      street: 'Dr. Gaspar R. de Francia y Ciudad de Hays',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Sitio oficial del Santa María Hotel',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Santa María Hotel — instalaciones', url: 'https://santamariahotel.org/facilities/rooms/' },
    ],
    openingHours: 'Solo por reserva (no hay servicio de restaurante abierto).',
    services: ['Comidas caseras por reserva', 'Desayuno para huéspedes'],
    contact: {
      phone: '+595 781 283 311',
      whatsapp: '+595 981 861 553',
      email: 'info@santamariahotel.org',
    },
    access: 'En el centro urbano.',
    recommendations: ['Coordiná la comida con anticipación junto con tu reserva de alojamiento.'],
    priceInfo: CONSULTAR_PREVIAMENTE,
  },
  {
    id: 'son-delicias',
    slug: 'son-delicias',
    name: 'Son Delicias (tortillas)',
    kind: 'Emprendimiento del Pueblo Hotel',
    category: 'gastronomia',
    categoryLabel: 'Gastronomía local',
    shortDescription:
      'Emprendimiento gastronómico comunitario integrado al proyecto Pueblo Hotel, especializado en tortillas.',
    description:
      'Son Delicias es un emprendimiento gastronómico de la comunidad integrado a la red del proyecto Santa María Pueblo Hotel, reconocido por sus tortillas. Forma parte de la oferta de comidas que el proyecto ofrece a sus huéspedes a través de su sitio oficial.',
    images: ['/images/commons/plaza-central-01.jpg'],
    address: {
      street: CONSULTAR_PREVIAMENTE,
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Sitio oficial hoteldepueblo.com.py',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Pueblo Hotel — experiencias gastronómicas', url: 'https://hoteldepueblo.com.py/experiencias/dinning' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE,
    services: ['Tortillas y comida casera'],
    contact: { whatsapp: '+595 981 861553', website: 'https://hoteldepueblo.com.py/' },
    access: 'Consultar por el canal del proyecto Pueblo Hotel.',
    recommendations: ['Coordiná por el WhatsApp del proyecto Pueblo Hotel.'],
    priceInfo: CONSULTAR_PREVIAMENTE,
  },
]

/** Alternativas gastronómicas FUERA del distrito, en localidades vecinas. */
export const nearbyGastronomy = [
  { name: 'San Ignacio Guazú', detail: 'La Arcadia, La Martina, Don Bigote, Pizzería Doña Luisa y el Parador Piringo (km 225), a 15 km de Santa María de Fe.' },
  { name: 'Santa Rosa', detail: 'Las Delicias y Ka\'aguy Piro\'y.' },
  { name: 'Santiago', detail: 'La Casona Resto y Apóstol Resto Bar.' },
]

export const restaurantFromSlug = (slug: string): Restaurant | undefined =>
  restaurants.find((r) => r.slug === slug || r.id === slug)
