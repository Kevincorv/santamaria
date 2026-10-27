import { Place, Category } from '../types/places'
import { DATA_REVIEW_DATE, CONSULTAR_PREVIAMENTE as CONSULTAR_PREVIAMENTE_TEXT } from './site'

const OSM = 'OpenStreetMap (datos georreferenciados)'

export const places: Place[] = [
  {
    id: 'plaza-mariscal-estigarribia',
    slug: 'plaza-mariscal-estigarribia',
    name: 'Plaza Mariscal Estigarribia y casco histórico',
    category: 'patrimonio-historico',
    categoryLabel: 'Espacio público / Patrimonio',
    shortDescription:
      'Plaza arbolada del centro, corazón de la vida mariense y hogar de los monos carayás que la comunidad cuida y alienta.',
    description:
      'La Plaza Pública Mariscal Estigarribia es el corazón del pueblo. Bajo su frondosa arboleda conviven bancos, banderas y las familias que se reúnen cada tarde. En sus copas habitan monos carayás (aulladores negros) que se volvieron la mascota del pueblo: la comunidad los alimenta y cuida, y hoy son uno de los atractivos más queridos por los visitantes, especialmente en Semana Santa. Frente a la plaza se alzan la iglesia parroquial y el museo de arte jesuítico guaraní.',
    history:
      'La plaza sigue el trazado tradicional de las reducciones jesuítico-guaraníes, organizado en torno a un espacio abierto público que funcionaba como plaza mayor. Ese orden urbano, heredado del siglo XVII, es el que todavía hoy define el casco histórico de Santa María de Fe.',
    images: [
      '/images/commons/plaza-mariscal-estigarribia.jpg',
      '/images/commons/plaza-iglesia-01.jpg',
      '/images/commons/plaza-central-01.jpg',
      '/images/plaza-central.jpg',
      '/images/commons/mono-caraya-01.jpg',
      '/images/commons/mono-caraya-02.jpg',
      '/images/mono-caraya.jpg',
    ],
    coordinates: { latitude: -26.7830965, longitude: -56.9440809 },
    coordinatesSource: 'Nodo "Plaza Mariscal Estigarribia" de OpenStreetMap (código postal 4950).',
    address: {
      street: 'Centro urbano de Santa María de Fe',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'OpenStreetMap, Wikipedia (monos carayás) y fotografías de Wikimedia Commons',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'OpenStreetMap — Plaza Mariscal Estigarribia', url: 'https://www.openstreetmap.org/node/0' },
      { title: 'Wikipedia ES — Santa María de Fe (monos carayás en la Plaza Central)', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
      { title: 'Wikimedia Commons — Categoría Santa María de Fe', url: 'https://commons.wikimedia.org/wiki/Category:Santa_Mar%C3%ADa_de_Fe' },
    ],
    access: 'A pie, en el centro urbano.',
    recommendations: [
      'Observá los monos carayás sin alimentarlos ni acercarles comida no autorizada.',
      'Ideal para recorrer al atardecer, cuando la plaza está concurrida por familias.',
      'Desde acá salen las procesiones y la salida de la peregrinación del Viernes Santo.',
    ],
    services: ['Sombra natural', 'Bancos', 'Espacio peatonal'],
  },
  {
    id: 'iglesia-santa-maria',
    slug: 'iglesia-santa-maria',
    name: 'Iglesia de Santa María de Fe',
    category: 'iglesia',
    categoryLabel: 'Patrimonio religioso',
    shortDescription:
      'Templo parroquial de la ciudad, heredero del templo de la reducción y custodio de imágenes sacras rescatadas del incendio de 1889.',
    description:
      'La iglesia parroquial de Santa María de Fe es el edificio más querido del pueblo. Sobre el terreno del antiguo templo de la reducción se levantó el templo actual, que conserva imágenes talladas por artesanos guaraníes en los siglos XVII y XVIII. Junto con el museo contiguo, forma el conjunto monumental que define el casco histórico de la ciudad.',
    history:
      'La iglesia original de la reducción fue destruida por un incendio en 1889. La tradición local recuerda que numerosas imágenes talladas en madera por los nativos guaraníes pudieron ser rescatadas del fuego por los vecinos, y hoy presiden el altar del templo actual y las salas del museo. Conviene señalar que existe una discusión historiográfica sobre si el incendio fue el único causante de la destrucción del templo original, cuestión documentada en la propia Wikipedia hispanohablante a partir de una nota de ABC Color de 2009.',
    images: [
      '/images/commons/iglesia-fachada.jpg',
      '/images/iglesia-san-rafael.jpg',
      '/images/commons/plaza-iglesia-01.jpg',
    ],
    coordinates: { latitude: -26.7825265, longitude: -56.9450719 },
    coordinatesSource:
      'Nodo de OpenStreetMap "Santa Maria" (place_of_worship, católico) en el casco urbano.',
    address: {
      street: 'Frente a la Plaza Mariscal Estigarribia, centro urbano',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'OpenStreetMap, Wikipedia ES y prensa nacional (ABC Color)',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Wikipedia ES — Santa María de Fe (incendio de 1889)', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
      { title: 'ABC Color — "Obras barrocas en Santa María de Fe" (2009)', url: 'http://archivo.abc.com.py/2009-06-21/articulos/532655/obras-barrocas-en-santa-maria-de-fe' },
      { title: 'ABC Color — Santa María de Fe celebrará a su patrona (2026)', url: 'https://www.abc.com.py/viajes/2026/09/07/santa-maria-de-fe-celebrara-a-su-patrona-entre-historia-y-tradicion/' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE_TEXT,
    openingHoursNote:
      'No se encontró un horario oficial publicado. Consultá con la parroquia o en la oficina de turismo antes de visitarla.',
    access: 'A pie, frente a la plaza principal.',
    recommendations: [
      'Durante la Semana Santa y la fiesta del 8 de septiembre la iglesia recibe gran cantidad de peregrinos.',
      'Si hay culto en curso, respetá el momento de la celebración.',
    ],
    services: ['Culto católico', 'Patrimonio religioso'],
  },
  {
    id: 'museo-diocesano',
    slug: 'museo-diocesano',
    name: 'Museo Diocesano de Arte Jesuítico Guarani',
    category: 'museos',
    categoryLabel: 'Museo / Arte sacro',
    shortDescription:
      'Casa de Indios convertida en museo: unas 56 imágenes barrocas guaraníes y el único pesebre completo de las 30 reducciones.',
    description:
      'El Museo Diocesano de Arte Jesuítico Guarani funciona en una de las antiguas "Casas de Indios" de la reducción, una casona colonial de adobe y tejas. Sus salas conservan alrededor de 56 imágenes talladas y policromadas por artesanos guaraníes entre los siglos XVII y XVIII, organizadas en seis salas: restos de la iglesia, santos jesuitas, santos de la Iglesia, ángeles y arcángeles, la Natividad y la Pasión. El grupo de la Natividad es considerado el único pesebre completo que se conserva de las treinta reducciones jesuítico-guaraníes.',
    images: [
      '/images/commons/museo-casa-indios.jpg',
      '/images/museo-historico.jpg',
      '/images/museo-interior.jpg',
      '/images/esculturas-barrocas.jpg',
      '/images/santos-museo.jpg',
      '/images/commons/museo-esculturas-grupo.jpg',
      '/images/commons/museo-escultura-individual.jpg',
      '/images/commons/museo-santos.jpg',
    ],
    coordinates: { latitude: -26.7822344, longitude: -56.9442858 },
    coordinatesSource: 'Nodo "Museo Santa Maria de Fe" de OpenStreetMap.',
    address: {
      street: 'Mcal. López y Ciudad de Hays',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'SENATUR / Visit Paraguay, VíaParaguay, Portal Guaraní y OpenStreetMap',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Visit Paraguay — Museo Diocesano de Arte Jesuítico', url: 'https://visitparaguay.travel/places/museo-diocesano-de-arte-jesuitico-santa-maria-de-fe' },
      { title: 'VíaParaguay — Museo Jesuítico de Santa María de Fe', url: 'https://viaparaguay.com/en/directorio/cultura/ficha/museo-jesuitico-santa-maria-de-fe' },
      { title: 'Portal Guaraní — Museos y exposiciones', url: 'https://www.portalguarani.com/detalles_museos_exposiciones.php' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE_TEXT,
    openingHoursNote:
      'Las fuentes difieren: una referencia indica martes a domingo de 8:30 a 11:30 y de 13:30 a 17:00; otras publican de 8:30 a 17:00 o 17:30 todos los días. Confirmá el horario vigente antes de ir.',
    priceInfo: 'Tarifa de referencia publicada por SENATUR: Gs. 20.000.',
    priceNote:
      'Tarifa informada por el directorio turístico oficial; puede variar. Confirmá al momento de la visita.',
    contact: { phone: '+595 975 618461' },
    access: 'A pie, a una cuadra de la plaza principal.',
    recommendations: [
      'Reservá al menos una hora para recorrer las seis salas con calma.',
      'Preguntá por la sala de la Natividad: conserva el pesebre completo único de las reducciones.',
      'Las guías se ofrecen en español, guaraní e inglés.',
    ],
    services: ['Visita guiada en español, guaraní e inglés', 'Seis salas temáticas'],
  },
  {
    id: 'ykua-teja',
    slug: 'ykua-teja',
    name: 'Ykua Teja',
    category: 'patrimonio-historico',
    categoryLabel: 'Patrimonio jesuítico / Manantial',
    shortDescription:
      'Manantial de origen jesuítico cubierto de tejas: primera fuente de la misión, después lavandería comunitaria y todavía en uso.',
    description:
      'Ykua Teja es un manantial de agua de origen jesuítico. El nombre combina ykua (naciente o agua que brota) y teja (la cubierta de tejas que protegía la fuente). Fue la primera fuente de la antigua reducción y, con el tiempo, funcionó como lavandería comunitaria. El agua sigue brotando: ante los cortes del servicio, los vecinos acuden todavía al ykua. En julio de 2021 la Municipalidad realizó obras de restauración del sitio, que hoy funciona como plaza con áreas verdes.',
    history:
      'La fuente formaba parte del sistema hidráulico de la reducción jesuítico-guaraní, junto con el acopio y distribución de agua entre los pobladores. Su uso comunitario se mantuvo durante generaciones, lo que la convierte en un testimonio vivo de la vida cotidiana de la misión.',
    images: ['/images/calle-colonial.jpg', '/images/calle-01.jpg'],
    coordinates: { latitude: -26.784281, longitude: -56.935333 },
    coordinatesSource: 'Google Maps (coordenadas aportadas por la Municipalidad de Santa María de Fe).',
    address: {
      street: 'Centro urbano de Santa María de Fe',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'ABC Color (2021 y 2026) y Wikipedia ES; coordenadas verificadas via Google Maps',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'ABC Color — "Restauran el histórico Ykua Teja de Santa María de Fe" (2021)', url: 'https://www.abc.com.py/nacionales/2021/07/18/restauran-el-historico-ykua-teja-de-santa-maria-de-fe/' },
      { title: 'Wikipedia ES — Santa María de Fe (Cultura)', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
    ],
    access: 'A pie desde el centro urbano. La ubicación exacta se confirma en el lugar.',
    recommendations: [
      'Ubicá el sitio preguntando a los vecinos por el "Ykua Teja"; no figura en todos los mapas.',
      'Es un espacio público de contemplación y descanso.',
    ],
    services: ['Plaza con áreas verdes', 'Patrimonio hidráulico jesuítico'],
  },
  {
    id: 'kurusu-cerro',
    slug: 'kurusu-cerro',
    name: 'Kurusu Cerro (Cerro de Santa María)',
    category: 'naturaleza',
    categoryLabel: 'Naturaleza / Peregrinación',
    shortDescription:
      'Cerro con capilla y cruz en la cima, meta de la peregrinación del Viernes Santo que reúne a miles de personas.',
    description:
      'El Kurusu Cerro es el mirador natural y el sitio de peregrinación más importante de Santa María de Fe. En la cima hay una capilla y una cruz, encontradas en la época de las reducciones según la tradición local. El acceso principal está a unos 9 kilómetros del casco urbano; el sendero de ascenso ronda los 2 kilómetros y presenta las estaciones del calvario. En la base del cerro hay artesanos y estacionamientos, y el ingreso es gratuito.',
    history:
      'La tradición de ascender al cerro se remonta a la época jesuítico-guaraní. Desde entonces, cada Viernes Santo miles de peregrinos suben desde muy temprano a pagar promesas: se estima que en 2024 concurrieron unas 15.000 personas entre el Jueves y el Viernes Santo.',
    images: ['/images/commons/acceso-ruta.jpg', '/images/camino-entrada.jpg'],
    coordinates: { latitude: -26.790877, longitude: -56.880393 },
    coordinatesSource: 'Acceso al cerro — Google Maps (coordenadas aportadas por la Municipalidad de Santa María de Fe).',
    address: {
      street: 'Cerro de Santa María, a unos 9 km del casco urbano',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
      note: 'La ruta exacta de acceso se confirma en la oficina de turismo o con los vecinos.',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'La Nación (2024); coordenadas verificadas via GPS',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'La Nación — "Subir al cerro Santa María, una tradicional peregrinación de Viernes Santo" (2024)', url: 'https://www.lanacion.com.py/pais/2024/03/29/subir-al-cerro-santa-maria-una-tradicional-y-atractiva-peregrinacion-de-viernes-santo-en-misiones/' },
      { title: 'La Nación — "Subir hasta el Kurusu Cerro en Santa María de Fe" (2017)', url: 'https://www.lanacion.com.py/pais/2017/04/14/subir-hasta-el-kurusu-cerro-en-santa-maria-de-fe-tradicion-del-viernes-santo/' },
      { title: 'Wikipedia ES — Santa María de Fe', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
    ],
    openingHours: 'Acceso diurno recomendado.',
    openingHoursNote:
      'No hay horario oficial publicado. En época de peregrinación el ascenso se realiza de madrugada.',
    priceInfo: 'Acceso gratuito (según La Nación, 2024).',
    access: 'A unos 9 km del casco urbano; el ascenso es a pie por sendero de aproximadamente 2 km.',
    recommendations: [
      'Llevá agua y calzado adecuado: el sendero es de subida constante.',
      'Salí temprano; el sol de Misiones es fuerte.',
      'En Semana Santa el cerro se llena: planificá con anticipación el transporte.',
      'Evitá ascender con tormentas anunciadas.',
    ],
    services: ['Mirador natural', 'Capilla en la cima', 'Sendero con estaciones del calvario', 'Artesanos en la base'],
  },
  {
    id: 'monasterio-san-jose',
    slug: 'monasterio-san-jose',
    name: 'Monasterio San José (comunidad monástica de Santa María de Fe)',
    category: 'patrimonio-historico',
    categoryLabel: 'Espiritualidad / Emprendimiento local',
    shortDescription:
      'Comunidad contemplativa masculina de espiritualidad ignaciana que sostiene un taller artesanal de dulces y mermeladas a leña.',
    description:
      'La comunidad monástica de Santa María de Fe (comunidad monástica San José) es una comunidad contemplativa masculina de espiritualidad ignaciana, nacida en Asunción con acompañamiento de la Compañía de Jesús y radicada en el centro de Santa María de Fe. Además de la vida de oración, sostiene el "Taller del Monasterio", una producción artesanal de mermeladas, dulces, licores, condimentos y artículos religiosos elaborados a leña y sin conservantes.',
    images: ['/images/calle-colonial.jpg'],
    coordinates: { latitude: -26.782243, longitude: -56.946188 },
    coordinatesSource: 'Google Maps (enlace: https://www.google.com/maps/place/Monasterio+Santa+Mar%C3%ADa+de+Fe)',
    address: {
      street: 'Centro de Santa María de Fe',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
      note: 'La dirección exacta se confirma por el canal de contacto.',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Infonegocios (2024) y Google Maps; coordenadas verificadas',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Infonegocios — "Taller del Monasterio, un emprendimiento de monjes" (2024)', url: 'https://infonegocios.com.py/default/desde-santa-maria-de-fe-taller-del-monasterio-un-emprendimiento-de-monjes-que-fabrican-productos-artesanales' },
      { title: 'Google Maps — Monasterio Santa María de Fe', url: 'https://www.google.com/maps/place/Monasterio+Santa+Mar%C3%ADa+de+Fe' },
    ],
    contact: { phone: '+595 983 889 978', instagram: 'https://www.instagram.com/monjesdesanjose2024/' },
    access: 'A pie, en el centro de la ciudad.',
    recommendations: [
      'Los productos se piden por el canal de contacto del monasterio; consultá disponibilidad con anticipación.',
    ],
    services: ['Productos artesanales a leña', 'Mermeladas, dulces, licores y condimentos'],
  },
  {
    id: 'taller-hermandad',
    slug: 'taller-hermandad',
    name: 'Taller de Hermandad (artesanías y bordados)',
    category: 'artesanias',
    categoryLabel: 'Artesanía / Cooperativa de mujeres',
    shortDescription:
      'Cooperativa de costureras que borda y aplica a mano escenas de la vida campesina; dos de sus diseños fueron sellos navideños nacionales.',
    description:
      'El Taller de Hermandad ("Workshop of Sisterhood") es una cooperativa de entre 25 y 30 costureras de Santa María de Fe, fundada hace más de veinticinco años con el acompañamiento de las Hermanas de la Compañía de María. Trabajan el apliqué y el bordado a mano con motivos de la vida campesina: colgantes de la serie de Ligas Agrarias Cristianas, estolas, bolsos, ropa y tarjetas de Navidad. Las ganancias se reparten entre las artesanas tras cubrir los materiales. En 2004, dos de sus diseños fueron elegidos como sellos navideños nacionales.',
    images: ['/images/commons/calle-01.jpg'],
    address: {
      street: 'Santa María de Fe',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
      note: 'El taller atiende por correo e Instagram; la dirección se confirma al contactar.',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'santamariadefe.org y ABC Color (2021)',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Santa Maria Education Fund — Visit us (Taller de Hermandad)', url: 'https://santamariadefe.org/get-in-touch/visit-us/' },
      { title: 'santamariadefe.com — Christmas work', url: 'https://www.santamariadefe.com/christmaswork.html' },
      { title: 'ABC Color — "Paisajes de Santa María de Fe se destacan en bordados y apliques" (2021)', url: 'https://www.abc.com.py/nacionales/2021/12/05/paisajes-de-santa-maria-de-fe-se-destacan-en-bordados-y-apliques-de-artesanas/' },
    ],
    contact: { email: 'info@santamariadefe.com', instagram: 'https://www.instagram.com/tallerhermandadsantamaria' },
    access: 'Contactar antes de la visita.',
    recommendations: [
      'Ideal para regalos y souvenirs auténticos, producidos por artesanas locales.',
      'Para compras desde el exterior, escribí por correo al taller.',
    ],
    services: ['Bordado y apliqué a mano', 'Venta directa por contacto'],
  },
  {
    id: 'taller-tapices',
    slug: 'taller-tapices',
    name: 'Taller de tapices y apliqué de Santa María',
    category: 'artesanias',
    categoryLabel: 'Artesanía / Tapices',
    shortDescription:
      'Taller de tapices cosidos a mano impulsado por Margaret Hebblethwaite, junto al Santa María Hotel.',
    description:
      'El taller de tapices de Santa María de Fe elabora piezas cosidas a mano con la técnica del apliqué, con motivos de la vida misionera. El Instituto Paraguayo de Artesanía (IPA) señala que los tapices son la producción más representativa del taller. Está vinculado al proyecto de turismo solidario impulsado por la escritora Margaret Hebblethwaite, radicada en el pueblo desde 2000, y funciona junto al Santa María Hotel. El taller recibe pedidos del exterior por correo electrónico.',
    images: ['/images/commons/calle-01.jpg'],
    address: {
      street: 'Junto al Santa María Hotel, Santa María de Fe',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'santamariadefe.com y publicación del IPA; datos de horarios sin confirmar',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'santamariadefe.com', url: 'https://santamariadefe.com/' },
      { title: 'Instituto Paraguayo de Artesanía (publicación sobre tapices de Santa María)', url: 'https://www.facebook.com/InstitutoParaguayoArtesania/' },
    ],
    contact: { email: 'info@santamariadefe.com' },
    access: 'Consultar previamente la visita al taller.',
    recommendations: [
      'Las piezas son producciones lentas y a medida; consultá plazos antes de encargar.',
    ],
    services: ['Tapices y apliqué a mano', 'Pedidos por correo'],
  },
  {
    id: 'casa-museo-bonpland',
    slug: 'casa-museo-bonpland',
    name: 'Casa-museo Aimé Bonpland',
    category: 'patrimonio-historico',
    categoryLabel: 'Patrimonio histórico / Museo',
    shortDescription:
      'Casa donde vivió el naturalista francés Aimé Bonpland durante su confinamiento en Santa María de Fe (1821-1831), con huerta medicinal.',
    description:
      'Aimé Bonpland, célebre naturalista francés compañero de expedición de Alexander von Humboldt, vivió confinado en Santa María de Fe entre 1821 y 1831. La comunidad lo llamaba karai arandu, "señor sabio". Allí investigó las plantas y hierbas medicinales de la región, enseñó técnicas para elaborar dulces y licores, y aprendió de los pobladores las propiedades curativas de diversas plantas. Formó su hogar con María, hija de un cacique, con quien tuvo dos hijos. Su liberación fue apoyada por próceres americanos y científicos europeos, entre ellos Bolívar, Humboldt y San Martín; fue expulsado del país en 1831, sin autorización para llevar a su familia.',
    images: ['/images/calle-colonial.jpg'],
    address: {
      street: 'Santa María de Fe',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
      note: 'La dirección y las condiciones de visita se confirman con la casa-museo.',
    },
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'RFI y Australian National Botanic Gardens; datos de visita sin confirmar',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'RFI — "Paraguay rinde homenaje al prolífico botánico francés Aimé Bonpland" (2023)', url: 'https://www.rfi.fr/es/programas/cr%C3%B3nica-cultural/20230623-paraguay-rinde-homenaje-al-prol%C3%ADfico-bot%C3%A1nico-franc%C3%A9s-aim%C3%A9-bonpland' },
      { title: 'Australian National Botanic Gardens — Bonpland, Aimé Jacques Alexandre', url: 'https://www.anbg.gov.au/biography/bonpland-aime-jacques.html' },
      { title: 'Wikipedia ES — Santa María de Fe', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE_TEXT,
    openingHoursNote:
      'No se encontró horario oficial publicado. La casa-museo es dirigida por Erma del Puerto; consultá antes de visitar.',
    access: 'En el distrito; la ubicación exacta se confirma al contactar.',
    recommendations: [
      'Encontrá también la huerta medicinal asociada a la memoria de Bonpland.',
      'Los dulces de frutas de la tradición local se vinculan con lo que se cuenta que enseñó Bonpland.',
    ],
    services: ['Casa-museo', 'Huerta medicinal'],
  },
  {
    id: 'granja-5-de-mayo',
    slug: 'granja-5-de-mayo',
    name: 'Granja 5 de Mayo (cascada El Chorro y arroyo Paso Joha)',
    category: 'naturaleza',
    categoryLabel: 'Agroturismo / Naturaleza',
    shortDescription:
      'Granja de la familia Espinoza en la compañía Tava, con la cascada El Chorro y el arroyo antiguo Paso Joha a unos 5 km del pueblo.',
    description:
      'La Granja 5 de Mayo es una granja de la familia Espinoza ubicada en la compañía Tava, a unos 5 kilómetros aproximados del centro urbano de Santa María de Fe. Allí se encuentran la cascada de agua conocida como El Chorro y el arroyo antiguo Paso Joha, un destino habitual de paseo y descanso para las familias marienses.',
    images: ['/images/camino-entrada.jpg'],
    address: {
      street: 'Compañía Tava',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
      note: 'El acceso exacto y las condiciones de visita no están documentados en fuentes públicas.',
    },
    verificationStatus: {
      status: 'pending',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Wikipedia ES (única fuente encontrada); requiere verificación in situ',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Wikipedia ES — Santa María de Fe (Granja 5 de Mayo)', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE_TEXT,
    openingHoursNote:
      'Sin horarios, tarifas ni condiciones de acceso publicadas en fuentes consultadas. Verificá in situ o con la oficina de turismo.',
    access: 'A unos 5 km del centro urbano, en la compañía Tava.',
    recommendations: [
      'Consultá el estado del camino y del caudal antes de salir, especialmente en época seca.',
      'Es un paseo familiar; confirmá si la granja recibe visitas ese día.',
    ],
    services: ['Cascada El Chorro', 'Arroyo Paso Joha'],
  },
  {
    id: 'ingenio-hibernia',
    slug: 'ingenio-hibernia',
    name: 'Ingenio Hibernia (azúcar orgánica)',
    category: 'agroindustria',
    categoryLabel: 'Agroindustria / Economía local',
    shortDescription:
      'Ingenio misionero que produce azúcar orgánica certificada y exporta a Estados Unidos, Europa, China y Corea.',
    description:
      'El ingenio Hibernia, a la entrada de Santa María de Fe, es la principal empresa agroindustrial del distrito. Fundado en 1988 como destilería de alcohol, hoy elabora azúcar orgánica certificada —claras y oscuras— y melaza, con una producción cercana a las 6.000 toneladas anuales. Procesa caña de plantación propia de alrededor de 1.000 hectáreas y compra caña a productores de Misiones y Guairá. Exporta a Estados Unidos, Europa, China y Corea del Sur; en abril de 2025 realizó su primera exportación de azúcar orgánica con sello nacional paraguayo a Taiwán. Cuenta con alrededor de 25 certificaciones internacionales, entre ellas Fair for Life, y sostiene acciones de impacto social como farmacia y enfermería comunitarias.',
    images: ['/images/camino-entrada.jpg'],
    coordinates: { latitude: -26.806789, longitude: -56.948867 },
    coordinatesSource: 'Google Maps (coordenadas aportadas por la Municipalidad de Santa María de Fe).',
    address: {
      street: 'A la entrada de Santa María de Fe',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Infonegocios/Infoagro y AFD Paraguay',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Infonegocios — "Azúcar paraguaya con sello orgánico nacional llega por primera vez a Taiwán" (2025)', url: 'https://infonegocios.com.py/infoagro/azucar-paraguaya-con-sello-organico-nacional-llega-por-primera-vez-al-mercado-de-taiwan' },
      { title: 'AFD Paraguay — "Hibernia Misiones"', url: 'https://www.afd.gov.py/noticias/hibernia-misiones-194' },
      { title: 'Wikipedia ES — Santa María de Fe (Economía)', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
    ],
    openingHours: CONSULTAR_PREVIAMENTE_TEXT,
    openingHoursNote:
      'No se encontró un régimen de visitas publicado. Las visitas técnicas, si están disponibles, se coordinan previamente.',
    access: 'Sobre la ruta de acceso a la ciudad.',
    recommendations: [
      'El azúcar y la melaza orgánica de Hibernia son productos regionales para llevar.',
      'Si te interesa la visita industrial, coordiná con la empresa con mucha anticipación.',
    ],
    services: ['Producción de azúcar orgánica', 'Melaza', 'Compras a productores locales'],
  },
  {
    id: 'polideportivo-municipal-santa-maria',
    slug: 'polideportivo-municipal-santa-maria',
    name: 'Polideportivo Municipal de Santa María',
    category: 'naturaleza',
    categoryLabel: 'Deporte / Espacio público',
    shortDescription:
      'Polideportivo Municipal de Santa María: espacio deportivo cubierto y al aire libre que alberga partidos de fútbol, atletismo y eventos comunitarios.',
    description:
      'El Polideportivo Municipal es el espacio principal para la práctica deportiva en Santa María de Fe. Cuenta con canchas de fútbol sintéticas, pista de atletismo y áreas para eventos comunitarios. Es el escenario de entrenamientos y competiciones locales, y durante la Semana Santa recibe gran afluencia de público.',
    images: ['/images/commons/acceso-ruta.jpg'],
    coordinates: { latitude: -26.784998, longitude: -56.951046 },
    coordinatesSource: 'Google Maps (enlace: https://www.google.com/maps/place/Polideportivo+Municipal+de+Santa+Maria)',
    address: {
      street: 'Centro urbano, a pocas cuadras de la plaza principal',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: '2026-10-26',
      source: 'Google Maps',
    },
    lastUpdated: '2026-10-26',
    sources: [
      { title: 'Google Maps — Polideportivo Municipal de Santa María', url: 'https://www.google.com/maps/place/Polideportivo+Municipal+de+Santa+Maria' },
    ],
    access: 'En el centro urbano, a pocas cuadras de la plaza principal.',
    recommendations: [
      'Ideal para practicar deportes y actividades recreativas.',
      'Durante la Semana Santa el complejo recibe gran afluencia de público.',
    ],
    services: ['Canchas de fútbol sintéticas', 'Pista de atletismo', 'Áreas de estacionamiento'],
    openingHours: 'Horario amplio; consultar en la municipalidad.',
    openingHoursNote: CONSULTAR_PREVIAMENTE_TEXT,
  },
  {
    id: 'balneario-taperã',
    slug: 'balneario-taperã',
    name: 'Balneario Taperã',
    category: 'naturaleza',
    categoryLabel: 'Naturaleza / Baño',
    shortDescription:
      'Balneario Taperã: espacio de baño y recreación sobre el arroyo homónimo, frecuentado por familias y visitantes en verano.',
    description:
      'El Balneario Taperã es un espacio de baño y recreación sobre el arroyo Taperã, localizado a las afueras del casco urbano. Es un lugar habitual de paseo y descanso para las familias marienses, especialmente en épocas de calor. El acceso es gratuito y cuenta con áreas de sombra y sectores de picnic.',
    images: ['/images/commons/calle-01.jpg'],
    coordinates: { latitude: -26.791151, longitude: -56.936283 },
    coordinatesSource: 'Google Maps (enlace: https://www.google.com/maps/place/Balneio+taper%C3%A3)',
    address: {
      street: 'A las afueras del casco urbano',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: '2026-10-26',
      source: 'Google Maps',
    },
    lastUpdated: '2026-10-26',
    sources: [
      { title: 'Google Maps — Balneario Taperã', url: 'https://www.google.com/maps/place/Balneio+taper%C3%A3' },
    ],
    access: 'A las afueras del casco urbano; señalizado desde la ruta de acceso.',
    recommendations: [
      'Verificar el estado del agua y las condiciones antes de bañarse.',
      'Es un espacio de uso familiar; mantener la limpieza del lugar.',
    ],
    services: ['Áreas de sombra', 'Sector de picnic', 'Acceso gratuito'],
    openingHours: CONSULTAR_PREVIAMENTE_TEXT,
    openingHoursNote: 'No hay horario oficial publicado. Es de uso diurno.',
  },
  {
    id: 'frutas-del-paraguay',
    slug: 'frutas-del-paraguay',
    name: 'Frutas del Paraguay',
    category: 'servicios',
    categoryLabel: 'Frutería / Local',
    shortDescription:
      'Frutas del Paraguay: negocio local que comercializa frutas de la región frescas y de temporada.',
    description:
      'Frutas del Paraguay es un comercio local que comercializa frutas de la región frescas y de temporada. Ofrece una variedad de frutas nativas y cultivadas, y es un punto de encuentro para los vecinos que buscan productos frescos del campo.',
    images: ['/images/commons/calle-01.jpg'],
    coordinates: { latitude: -26.791929, longitude: -56.896901 },
    coordinatesSource: 'Google Maps (enlace: https://www.google.com/maps/place/Frutas+del+Paraguay)',
    address: {
      street: 'En el centro urbano',
      city: 'Santa María de Fe',
      region: 'Misiones',
      country: 'Paraguay',
    },
    verificationStatus: {
      status: 'verified',
      lastChecked: '2026-10-26',
      source: 'Google Maps',
    },
    lastUpdated: '2026-10-26',
    sources: [
      { title: 'Google Maps — Frutas del Paraguay', url: 'https://www.google.com/maps/place/Frutas+del+Paraguay' },
    ],
    access: 'En el centro urbano de Santa María de Fe.',
    recommendations: [
      'Ideal para comprar frutas frescas de temporada.',
      'Consultar disponibilidad con el comerciante local.',
    ],
    services: ['Venta de frutas frescas', 'Productos de temporada'],
    openingHours: CONSULTAR_PREVIAMENTE_TEXT,
    openingHoursNote: 'No hay horario oficial publicado. Consultá al comerciante antes de visitar.',
  },
]

export const placeFromSlug = (slug: string): Place | undefined =>
  places.find((p) => p.slug === slug || p.id === slug)

export const categoriesOptions: { key: Category; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'patrimonio-historico', label: 'Patrimonio histórico' },
  { key: 'iglesia', label: 'Iglesia' },
  { key: 'museos', label: 'Museos' },
  { key: 'naturaleza', label: 'Naturaleza' },
  { key: 'artesanias', label: 'Artesanías' },
  { key: 'agroindustria', label: 'Agroindustria' },
]

export const featuredPlaces: Place[] = places.filter((p) =>
  [
    'plaza-mariscal-estigarribia',
    'iglesia-santa-maria',
    'museo-diocesano',
    'kurusu-cerro',
    'ykua-teja',
    'ingenio-hibernia',
    'polideportivo-municipal-santa-maria',
    'balneario-taperã',
    'frutas-del-paraguay',
  ].includes(p.id)
)