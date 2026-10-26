import { Craft, Experience } from '../types/places'
import { DATA_REVIEW_DATE, CONSULTAR_PREVIAMENTE } from './site'

/**
 * Artesanías, productos regionales y experiencias documentadas.
 * Solo se incluyen contactos que existan públicamente.
 */

export const crafts: Craft[] = [
  {
    id: 'taller-hermandad',
    slug: 'taller-hermandad',
    name: 'Taller de Hermandad — bordados y apliqué',
    shortDescription:
      'Cooperativa de entre 25 y 30 costureras que borda a mano escenas de la vida campesina; dos de sus diseños fueron sellos navideños nacionales en 2004.',
    description:
      'El Taller de Hermandad ("Workshop of Sisterhood") es una cooperativa de costureras de Santa María de Fe fundada hace más de veinticinco años con el acompañamiento de las Hermanas de la Compañía de María. Trabajan el apliqué y el bordado a mano con motivos de la vida campesina: colgantes de la serie de Ligas Agrarias Cristianas, estolas, bolsos, ropa y tarjetas de Navidad. Las ganancias se reparten entre las artesanas tras cubrir los materiales.',
    products: ['Apliqué y bordado a mano', 'Colgantes y estolas', 'Bolsos y ropa', 'Tarjetas de Navidad'],
    image: '/images/commons/calle-01.jpg',
    contact: {
      email: 'info@santamariadefe.com',
      instagram: 'https://www.instagram.com/tallerhermandadsantamaria',
    },
    address: { city: 'Santa María de Fe', region: 'Misiones', country: 'Paraguay' },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'santamariadefe.org y ABC Color (2021)',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Santa Maria Education Fund — Visit us', url: 'https://santamariadefe.org/get-in-touch/visit-us/' },
      { title: 'santamariadefe.com — Christmas work', url: 'https://www.santamariadefe.com/christmaswork.html' },
      { title: 'ABC Color — bordados y apliques de artesanas (2021)', url: 'https://www.abc.com.py/nacionales/2021/12/05/paisajes-de-santa-maria-de-fe-se-destacan-en-bordados-y-apliques-de-artesanas/' },
    ],
  },
  {
    id: 'tapices-santa-maria',
    slug: 'tapices-santa-maria',
    name: 'Tapices de Santa María',
    shortDescription:
      'Tapices y apliqué cosidos a mano, considerados por el Instituto Paraguayo de Artesanía la producción más representativa del taller junto al Santa María Hotel.',
    description:
      'El taller de tapices de Santa María de Fe elabora piezas cosidas a mano con la técnica del apliqué, con motivos de la vida misionera. El Instituto Paraguayo de Artesanía (IPA) señala que "sus trabajos más representativos son los tapices". El taller está vinculado al proyecto de turismo solidario impulsado por Margaret Hebblethwaite y funciona junto al Santa María Hotel; recibe pedidos del exterior por correo electrónico.',
    products: ['Tapices cosidos a mano', 'Apliqué con motivos misioneros', 'Piezas por encargo'],
    image: '/images/commons/calle-01.jpg',
    contact: { email: 'info@santamariadefe.com' },
    address: { city: 'Santa María de Fe', region: 'Misiones', country: 'Paraguay' },
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'santamariadefe.com y publicación del IPA',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'santamariadefe.com', url: 'https://santamariadefe.com/' },
      { title: 'Instituto Paraguayo de Artesanía (publicación)', url: 'https://www.facebook.com/InstitutoParaguayoArtesania/' },
    ],
  },
  {
    id: 'taller-monasterio',
    slug: 'taller-monasterio',
    name: 'Taller del Monasterio — dulces y mermeladas a leña',
    shortDescription:
      'Mermeladas, dulces, licores, condimentos y artículos religiosos elaborados a leña y sin conservantes por la comunidad monástica de Santa María de Fe.',
    description:
      'El Taller del Monasterio es el emprendimiento de la comunidad monástica de Santa María de Fe (comunidad contemplativa masculina de espiritualidad ignaciana). Elaboran mermeladas, dulces, licores, condimentos y artículos religiosos cocinados a leña, sin conservantes. Los pedidos se realizan por teléfono o Instagram.',
    products: ['Mermeladas', 'Dulces', 'Licores', 'Condimentos', 'Artículos religiosos a leña'],
    image: '/images/calle-colonial.jpg',
    contact: {
      phone: '+595 983 889 978',
      instagram: 'https://www.instagram.com/monjesdesanjose2024/',
    },
    address: { city: 'Santa María de Fe', region: 'Misiones', country: 'Paraguay' },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Infonegocios (2024) e Instagram oficial',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Infonegocios — "Taller del Monasterio, un emprendimiento de monjes"', url: 'https://infonegocios.com.py/default/desde-santa-maria-de-fe-taller-del-monasterio-un-emprendimiento-de-monjes-que-fabrican-productos-artesanales' },
      { title: 'Instagram @monjesdesanjose2024', url: 'https://www.instagram.com/monjesdesanjose2024/' },
    ],
  },
  {
    id: 'azuca-hibernia',
    slug: 'azuca-hibernia',
    name: 'Azúcar orgánica Hibernia',
    shortDescription:
      'Azúcar orgánica certificada (claras y oscuras) y melaza producidas en el ingenio misionero que exporta a Estados Unidos, Europa, China y Corea.',
    description:
      'El ingenio Hibernia elabora azúcar orgánica certificada y melaza, con una producción cercana a las 6.000 toneladas anuales, procesando caña de plantación propia (alrededor de 1.000 hectáreas) y caña comprada a productores de Misiones y Guairá. Cuenta con alrededor de 25 certificaciones internacionales, entre ellas Fair for Life. En abril de 2025 exportó por primera vez azúcar orgánica con sello nacional paraguayo a Taiwán. Es el producto regional de mayor proyección exportadora del distrito.',
    products: ['Azúcar orgánica clara', 'Azúcar orgánica oscura', 'Melaza'],
    image: '/images/camino-entrada.jpg',
    address: { city: 'Santa María de Fe', region: 'Misiones', country: 'Paraguay' },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Infonegocios/Infoagro (2025) y AFD Paraguay',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Infonegocios — azúcar orgánica paraguaya a Taiwán', url: 'https://infonegocios.com.py/infoagro/azucar-paraguaya-con-sello-organico-nacional-llega-por-primera-vez-al-mercado-de-taiwan' },
      { title: 'AFD Paraguay — Hibernia Misiones', url: 'https://www.afd.gov.py/noticias/hibernia-misiones-194' },
    ],
  },
]

export const experiences: Experience[] = [
  {
    id: 'visita-museo-jesuitico',
    slug: 'visita-museo-jesuitico',
    name: 'Visita al museo de arte jesuítico guaraní',
    shortDescription:
      'Recorrido por las seis salas del museo de la Casa de Indios, con el único pesebre completo de las treinta reducciones.',
    description:
      'El museo guarda alrededor de 56 imágenes barrocas talladas por artesanos guaraníes. Las guías se ofrecen en español, guaraní e inglés. Es la puerta de entrada ideal para comprender el patrimonio de la reducción antes de recorrer el resto del casco histórico.',
    kind: 'Patrimonio',
    image: '/images/commons/museo-esculturas-grupo.jpg',
    contact: { phone: '+595 975 618461' },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Visit Paraguay, VíaParaguay y Portal Guaraní',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Visit Paraguay — Museo Diocesano de Arte Jesuítico', url: 'https://visitparaguay.travel/places/museo-diocesano-de-arte-jesuitico-santa-maria-de-fe' },
    ],
    note: 'Los horarios difieren entre fuentes: consultá el vigente antes de ir.',
  },
  {
    id: 'peregrinacion-kurusu',
    slug: 'peregrinacion-kurusu',
    name: 'Ascenso al Kurusu Cerro',
    shortDescription:
      'Sendero de unos 2 km con estaciones del calvario hasta la capilla y la cruz de la cima; meta de la peregrinación del Viernes Santo.',
    description:
      'El ascenso al Kurusu Cerro es la experiencia espiritual y natural más importante del distrito. El acceso está a unos 9 km del casco urbano, el sendero ronda los 2 kilómetros y en la base hay artesanos y estacionamientos. El ingreso es gratuito.',
    kind: 'Naturaleza y espiritualidad',
    image: '/images/commons/acceso-ruta.jpg',
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'La Nación (2017 y 2024)',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'La Nación — peregrinación al cerro Santa María (2024)', url: 'https://www.lanacion.com.py/pais/2024/03/29/subir-al-cerro-santa-maria-una-tradicional-y-atractiva-peregrinacion-de-viernes-santo-en-misiones/' },
    ],
    note: 'Llevá agua y calzado adecuado. Ascenso recomendado a primera hora.',
  },
  {
    id: 'talleres-artesanales',
    slug: 'talleres-artesanales',
    name: 'Talleres artesanales de la comunidad',
    shortDescription:
      'Visita a los talleres de bordados, tapices y dulces del Monasterio, coordinada directamente con cada taller.',
    description:
      'La comunidad ofrece visitas a sus talleres: el Taller de Hermandad, el taller de tapices junto al Santa María Hotel y el Taller del Monasterio. Algunas visitas están incluidas en la experiencia del proyecto Pueblo Hotel. La coordinación previa es necesaria en todos los casos.',
    kind: 'Artesanía comunitaria',
    image: '/images/commons/calle-01.jpg',
    contact: {
      email: 'info@santamariadefe.com',
      whatsapp: '+595 981 861553',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'santamariadefe.org, Infonegocios y hoteldepueblo.com.py',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Santa Maria Education Fund — visitas', url: 'https://santamariadefe.org/get-in-touch/visit-us/' },
      { title: 'Pueblo Hotel — sitio oficial', url: 'https://hoteldepueblo.com.py/' },
    ],
    note: 'Coordiná la visita con anticipación por los canales de contacto de cada taller.',
  },
  {
    id: 'monos-caraya',
    slug: 'monos-caraya',
    name: 'Monos carayás de la plaza',
    shortDescription:
      'Familias de monos carayás (aulladores negros) que viven en libertad en los árboles de la Plaza Mariscal Estigarribia, cuidados por la comunidad.',
    description:
      'Los monos carayás de la plaza son el atractivo más querido de Santa María de Fe. Habitan en las copas de los árboles de la Plaza Mariscal Estigarribia y son observados con cariño por vecinos y visitantes. Wikipedia registra que la comunidad los cuida y alimenta.',
    kind: 'Naturaleza urbana',
    image: '/images/commons/mono-caraya-01.jpg',
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Wikipedia ES y fotografías de Wikimedia Commons (2023)',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Wikipedia ES — Santa María de Fe', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
      { title: 'Wikimedia Commons — monos en la plaza', url: 'https://commons.wikimedia.org/wiki/Category:Santa_Mar%C3%ADa_de_Fe' },
    ],
    note: 'Observá desde la distancia y sin ofrecer comida no autorizada.',
  },
]

export const craftFromSlug = (slug: string): Craft | undefined =>
  crafts.find((c) => c.slug === slug || c.id === slug)

export const experienceFromSlug = (slug: string): Experience | undefined =>
  experiences.find((e) => e.slug === slug || e.id === slug)

/** Productos gastronómicos regionales documentados (información general). */
export const regionalProducts = [
  {
    name: 'Azúcar orgánica y melaza',
    detail: 'Producción certificada del ingenio Hibernia, con exportación a cuatro continentes.',
    source: 'Infonegocios/Infoagro (2025)',
  },
  {
    name: 'Mermeladas y dulces a leña',
    detail: 'Elaborados sin conservantes por el Taller del Monasterio.',
    source: 'Infonegocios (2024)',
  },
  {
    name: 'Tortillas y comida casera',
    detail: 'Emprendimientos comunitarios integrados al proyecto Pueblo Hotel.',
    source: 'hoteldepueblo.com.py',
  },
  {
    name: 'Helados artesanales',
    detail: 'Producción de Delicias Tati y otras heladerías del centro.',
    source: 'La Nación (2024)',
  },
  {
    name: 'Dulces, licores y hierbas',
    detail: 'Tradición ligada a Aimé Bonpland, quien enseñó técnicas de dulces y licores y estudió hierbas medicinales durante su confinamiento (1821–1831).',
    source: 'RFI (2023)',
  },
]

export const CONTACT_NOTE = CONSULTAR_PREVIAMENTE
