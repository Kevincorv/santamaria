/**
 * Registro de imágenes del portal.
 *
 * Regla editorial: solo se publican fotografías cuyo sujeto pudo verificarse.
 *  - isAuthentic: true  -> fotografía del propio distrito o de su gente/patrimonio.
 *  - isAuthentic: false -> imagen ilustrativa; NUNCA se presenta como foto del lugar.
 * Las imágenes sin verificar quedan en /archivos-no-publicados y no se sirven.
 */

export interface ImageAsset {
  id: string
  url: string
  alt: string
  /** Crédito visible (autor o institución). */
  credit: string
  license: string
  /** Página de origen / descripción, cuando existe. */
  sourceUrl?: string
  placeIds?: string[]
  isAuthentic: boolean
}

const COMMONS = 'https://commons.wikimedia.org/wiki/File:'
const CC = 'CC BY-SA 4.0'
const LOCAL = 'Archivo local (procedencia sin verificar)'

export const imageRegistry: Record<string, ImageAsset> = {
  // ---------- Fotografías verificadas de Wikimedia Commons (2023) ----------
  plazaIglesia: {
    id: 'plaza-iglesia-01',
    url: '/images/commons/plaza-iglesia-01.jpg',
    alt: 'Plaza central arbolada y iglesia blanca de Santa María de Fe vista entre árboles',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Main_square_and_church_in_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['plaza-mariscal-estigarribia', 'iglesia-santa-maria'],
    isAuthentic: true,
  },
  plazaCentral: {
    id: 'plaza-central-01',
    url: '/images/commons/plaza-central-01.jpg',
    alt: 'Vista general de la Plaza Central de Santa María de Fe con su arboleda',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Central_square_of_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['plaza-mariscal-estigarribia'],
    isAuthentic: true,
  },
  plazaMariscal: {
    id: 'plaza-mariscal-estigarribia',
    url: '/images/commons/plaza-mariscal-estigarribia.jpg',
    alt: 'Plaza Pública Mariscal Estigarribia, espacio público arbolado en el centro de Santa María de Fe',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Plaza_Publica_Mariscal_Estigarribia_in_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['plaza-mariscal-estigarribia'],
    isAuthentic: true,
  },
  museoCasaIndios: {
    id: 'museo-casa-indios',
    url: '/images/commons/museo-casa-indios.jpg',
    alt: 'Antigua Casa de Indios que hoy alberga el museo de arte jesuítico guaraní de Santa María de Fe',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Former_indigenous_house_housing_the_Jesuit_Guarani_art_museum,_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  museoEsculturasGrupo: {
    id: 'museo-esculturas-grupo',
    url: '/images/commons/museo-esculturas-grupo.jpg',
    alt: 'Grupo de esculturas religiosas policromadas en el museo de arte jesuítico guaraní',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Group_of_polychrome_religious_sculptures_in_the_Jesuit_Guarani_art_museum,_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  museoEsculturaIndividual: {
    id: 'museo-escultura-individual',
    url: '/images/commons/museo-escultura-individual.jpg',
    alt: 'Escultura religiosa policromada de madera tallada por artesanos guaraníes',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Polychrome_religious_sculpture_in_the_Jesuit_Guarani_art_museum,_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  museoSantos: {
    id: 'museo-santos',
    url: '/images/commons/museo-santos.jpg',
    alt: 'Tallas de santos jesuíticos en madera policromada en las salas del museo',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Saint_sculptures_in_the_Jesuit_Guarani_art_museum,_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  museoReligiosas: {
    id: 'museo-religiosas',
    url: '/images/commons/museo-religiosas.jpg',
    alt: 'Conjunto de imágenes religiosas del acervo jesuítico guaraní de Santa María de Fe',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Religious_sculptures_in_the_Jesuit_Guarani_art_museum,_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  iglesiaFachada: {
    id: 'iglesia-fachada',
    url: '/images/commons/iglesia-fachada.jpg',
    alt: 'Iglesia de Santa María de Fe, templo parroquial blanco con campanario',
    credit: 'Cmasi',
    license: CC,
    sourceUrl: `${COMMONS}Iglesia_de_Santa_Maria_de_Fe.jpg`,
    placeIds: ['iglesia-santa-maria'],
    isAuthentic: true,
  },
  monoCarayaCommons: {
    id: 'mono-caraya-01',
    url: '/images/commons/mono-caraya-01.jpg',
    alt: 'Mono carayá (aullador negro) en las copas de los árboles de la plaza de Santa María de Fe',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Black_howler_monkey_in_the_main_square_of_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['plaza-mariscal-estigarribia'],
    isAuthentic: true,
  },
  monoCarayaGrupo: {
    id: 'mono-caraya-02',
    url: '/images/commons/mono-caraya-02.jpg',
    alt: 'Grupo de monos carayás en los árboles de la Plaza Central de Santa María de Fe',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Black_howler_monkeys_in_the_main_square_of_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['plaza-mariscal-estigarribia'],
    isAuthentic: true,
  },
  accesoRuta: {
    id: 'acceso-ruta',
    url: '/images/commons/acceso-ruta.jpg',
    alt: 'Ruta de acceso a Santa María de Fe entre campos y bosques misioneros',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Entrance_road_to_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['como-llegar'],
    isAuthentic: true,
  },
  calleCommons: {
    id: 'calle-01',
    url: '/images/commons/calle-01.jpg',
    alt: 'Calle del centro de Santa María de Fe con casas bajas y arbolado',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Street_in_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['plaza-mariscal-estigarribia'],
    isAuthentic: true,
  },
  casaIndiosHotel: {
    id: 'casa-indios-hotel',
    url: '/images/commons/casa-indios-hotel.jpg',
    alt: 'Antigua Casa de Indios de Santa María de Fe hoy utilizada como alojamiento',
    credit: 'Josep M. Gracia',
    license: CC,
    sourceUrl: `${COMMONS}SFE_-_Former_indigenous_house_now_used_as_a_hotel,_Santa_Maria_de_Fe,_Paraguay,_2023.jpg`,
    placeIds: ['pueblo-hotel'],
    isAuthentic: true,
  },

  // ---------- Fotografías del archivo local con sujeto verificado ----------
  iglesiaLocal: {
    id: 'iglesia-san-rafael',
    url: '/images/iglesia-san-rafael.jpg',
    alt: 'Fachada blanca de la iglesia de Santa María de Fe con su campanario y base de piedra',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['iglesia-santa-maria'],
    isAuthentic: true,
  },
  museoLocal: {
    id: 'museo-historico',
    url: '/images/museo-historico.jpg',
    alt: 'Casa de Indios de Santa María de Fe, casona colonial de tejas que hoy es museo',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  museoInteriorLocal: {
    id: 'museo-interior',
    url: '/images/museo-interior.jpg',
    alt: 'Interior del museo con esculturas jesuítico guaraníes iluminadas en vitrinas',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  pesebreLocal: {
    id: 'esculturas-barrocas',
    url: '/images/esculturas-barrocas.jpg',
    alt: 'Escenas talladas del pesebre o Natividad del acervo jesuítico guaraní',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  santosLocal: {
    id: 'santos-museo',
    url: '/images/santos-museo.jpg',
    alt: 'Tres tallas de santos jesuíticos en madera con fondos dorados',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['museo-diocesano'],
    isAuthentic: true,
  },
  plazaLocal: {
    id: 'plaza-central',
    url: '/images/plaza-central.jpg',
    alt: 'Plaza de Santa María de Fe con banderas, bancos y arbolado frondoso',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['plaza-mariscal-estigarribia'],
    isAuthentic: true,
  },
  monoCarayaLocal: {
    id: 'mono-caraya',
    url: '/images/mono-caraya.jpg',
    alt: 'Mono carayá, especie que habita en libertad en la plaza de Santa María de Fe',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['plaza-mariscal-estigarribia'],
    isAuthentic: true,
  },
  calleLocal: {
    id: 'calle-colonial',
    url: '/images/calle-colonial.jpg',
    alt: 'Calle de acceso al centro de Santa María de Fe señalizada a 200 metros',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['plaza-mariscal-estigarribia'],
    isAuthentic: true,
  },
  caminoLocal: {
    id: 'camino-entrada',
    url: '/images/camino-entrada.jpg',
    alt: 'Camino de entrada a Santa María de Fe por la ruta departamental',
    credit: LOCAL,
    license: 'Sin datos de licencia',
    placeIds: ['como-llegar'],
    isAuthentic: true,
  },
  banderaDistrito: {
    id: 'bandera',
    url: '/images/bandera.png',
    alt: 'Bandera del distrito de Santa María de Fe',
    credit: 'Wikimedia Commons',
    license: CC,
    sourceUrl: `${COMMONS}Bandera_de_Santa_Maria,_Misiones.png`,
    isAuthentic: true,
  },
}

export const imagesForPlace = (placeId: string): ImageAsset[] =>
  Object.values(imageRegistry).filter((img) => img.placeIds?.includes(placeId))

/** URL de la foto principal de un lugar (si existe). */
export const primaryImageFor = (placeId: string, fallbacks: string[] = []): string | null => {
  const first = imagesForPlace(placeId)[0]
  if (first) return first.url
  return fallbacks[0] ?? null
}

export const findImage = (url: string): ImageAsset | undefined =>
  Object.values(imageRegistry).find((img) => img.url === url)
