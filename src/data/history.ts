import { SourceRef } from '../types/places'

/**
 * Cronología y figuras históricas de Santa María de Fe.
 * Cuando las fuentes difieren, se indica explícitamente en lugar de
 * presentar una única versión como definitiva.
 */

export interface TimelineEvent {
  year: string
  title: string
  description: string
  highlight?: boolean
  /** Marcador de discrepancia entre fuentes, cuando corresponde. */
  conflict?: string
  sources: SourceRef[]
}

export interface HistoricalFigure {
  name: string
  role: string
  period: string
  bio: string
  legacy: string
  conflict?: string
  sources: SourceRef[]
}

const WIKI_SMF: SourceRef = {
  title: 'Wikipedia ES — Santa María de Fe',
  url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe',
}

export const historyTimeline: TimelineEvent[] = [
  {
    year: '1647',
    title: 'Fundación como Nuestra Señora del Taré',
    description:
      'El 8 de septiembre de 1647 el padre jesuita francés Emmanuel Berthot funda la reducción en tierras del Caaguazú, bajo la advocación de Nuestra Señora del Taré (Fe). Ese día se celebra además la fiesta patronal del distrito.',
    highlight: true,
    sources: [WIKI_SMF],
  },
  {
    year: '1669',
    title: 'Éxodo y asentamiento definitivo',
    description:
      'Ante los ataques de los bandeirantes paulistas, que buscaban esclavizar a los nativos guaraníes, la comunidad emprende el éxodo hacia el sur y se asienta en la ubicación actual, en el departamento de Misiones.',
    highlight: true,
    sources: [WIKI_SMF],
  },
  {
    year: '1767',
    title: 'Expulsión de la Compañía de Jesús',
    description:
      'El rey Carlos III ordena la expulsión de los jesuitas de todos los dominios de la corona española. Las reducciones pasan a administración secular y la comunidad guaraní continúa sola al frente de su patrimonio.',
    sources: [WIKI_SMF],
  },
  {
    year: '1783 (o 1787)',
    title: 'Nace José Agustín Molas',
    description:
      'En Santa María de Fe nace José Agustín Molas, presbítero y uno de los próceres de la independencia paraguaya. El propio artículo de Wikipedia y Portal Guaraní registran tanto 1783 como 1787 como año de nacimiento o bautismo.',
    conflict:
      'Las fuentes difieren sobre el año de nacimiento: 27 de agosto de 1783 (bautismo) frente a 1787. Su fallecimiento también se documenta el 11 de enero de 1827 en Quyquyhó, frente a otras referencias que indican 1840.',
    sources: [
      { title: 'Wikipedia ES — José Agustín Molas', url: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Agust%C3%ADn_Molas' },
      { title: 'Portal Guaraní — José Agustín Molas', url: 'https://www.portalguarani.com/1979_jose_agustin_molas__.html' },
    ],
  },
  {
    year: '1811',
    title: 'La independencia y el papel de Molas',
    description:
      'José Agustín Molas participa del proceso de independencia del Paraguay como capellán del ejército paraguayo y opositor al intento de anexión al Río de la Plata.',
    sources: [
      { title: 'Wikipedia ES — José Agustín Molas', url: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Agust%C3%ADn_Molas' },
    ],
  },
  {
    year: '1821–1831',
    title: 'Aimé Bonpland, confinado en Santa María de Fe',
    description:
      'El naturalista francés Aimé Bonpland, célebre por sus expediciones con Alexander von Humboldt, cumple su confinamiento en Santa María de Fe. La comunidad lo llama karai arandu ("señor sabio"). Investiga plantas medicinales, enseña técnicas para dulces y licores y forma su hogar con una hija de un cacique local. Su liberación es pedida por Bolívar, Humboldt y San Martín; en 1831 es expulsado del país.',
    highlight: true,
    conflict:
      'La mayoría de las fuentes sitúa el confinamiento entre 1821 y 1831; la Wikipedia hispanohablante de Molas indica 1821–1829.',
    sources: [
      { title: 'RFI — "Paraguay rinde homenaje al prolífico botánico francés Aimé Bonpland"', url: 'https://www.rfi.fr/es/programas/cr%C3%B3nica-cultural/20230623-paraguay-rinde-homenaje-al-prol%C3%ADfico-bot%C3%A1nico-franc%C3%A9s-aim%C3%A9-bonpland' },
      { title: 'Australian National Botanic Gardens — Bonpland', url: 'https://www.anbg.gov.au/biography/bonpland-aime-jacques.html' },
      WIKI_SMF,
    ],
  },
  {
    year: '1889',
    title: 'Incendio del templo de la reducción',
    description:
      'Un incendio destruye la iglesia original de la reducción. Numerosas imágenes talladas por artesanos guaraníes son rescatadas por los vecinos y hoy presiden el altar y las salas del museo.',
    conflict:
      'Existe una discusión historiográfica sobre si el incendio fue la única causa de la destrucción del templo, documentada en una nota de ABC Color de 2009.',
    sources: [
      WIKI_SMF,
      { title: 'ABC Color — "Obras barrocas en Santa María de Fe" (2009)', url: 'http://archivo.abc.com.py/2009-06-21/articulos/532655/obras-barrocas-en-santa-maria-de-fe' },
    ],
  },
  {
    year: '1981',
    title: 'Inauguración del museo de arte jesuítico guaraní',
    description:
      'El 8 de septiembre de 1981 se inaugura el museo en la antigua Casa de Indios, con un patrimonio de alrededor de 56 imágenes barrocas guaraníes organizadas en seis salas, incluido el único pesebre completo que se conserva de las treinta reducciones.',
    highlight: true,
    sources: [
      { title: 'Visit Paraguay — Museo Diocesano de Arte Jesuítico', url: 'https://visitparaguay.travel/places/museo-diocesano-de-arte-jesuitico-santa-maria-de-fe' },
      { title: 'VíaParaguay — Museo Jesuítico de Santa María de Fe', url: 'https://viaparaguay.com/en/directorio/cultura/ficha/museo-jesuitico-santa-maria-de-fe' },
    ],
  },
  {
    year: '2000–2006',
    title: 'Llegada de Margaret Hebblethwaite y el Santa María Hotel',
    description:
      'La escritora y teóloga británica Margaret Hebblethwaite se radica en Santa María de Fe en el año 2000. En 2006 funda el Santa María Hotel, proyecto de turismo ético que financia becas universitarias a través del Santa Maria Education Fund, y impulsa los talleres de bordados y tapices de la comunidad.',
    sources: [
      { title: 'Santa María Hotel — sitio oficial', url: 'https://santamariahotel.org/?lang=es' },
      { title: 'Santa Maria Education Fund — becas', url: 'https://santamariadefe.org/what-we-do/scholarships/' },
    ],
  },
  {
    year: '2021',
    title: 'Restauración del Ykua Teja',
    description:
      'La Municipalidad de Santa María de Fe restaura el histórico Ykua Teja, el manantial de origen jesuítico que fuera la primera fuente de la misión y luego lavandería comunitaria.',
    sources: [
      { title: 'ABC Color — "Restauran el histórico Ykua Teja de Santa María de Fe"', url: 'https://www.abc.com.py/nacionales/2021/07/18/restauran-el-historico-ykua-teja-de-santa-maria-de-fe/' },
    ],
  },
  {
    year: '2025–2026',
    title: 'Pueblo Hotel y reconocimiento internacional',
    description:
      'El proyecto Santa María Pueblo Hotel, impulsado por SENATUR y la comunidad, convierte al distrito en un "hotel distribuido" y recibe un León de Plata y Bronces en los Cannes Lions 2026. En 2025 el ingenio Hibernia realiza su primera exportación de azúcar orgánica con sello nacional paraguayo.',
    highlight: true,
    sources: [
      { title: 'La Nación — "Santa María Pueblo Hotel pone a Paraguay en la élite mundial de la creatividad turística"', url: 'https://www.lanacion.com.py/negocios/2026/06/23/santa-maria-pueblo-hotel-pone-a-paraguay-en-la-elite-mundial-de-la-creatividad-turistica/' },
      { title: 'Infonegocios — azúcar orgánica paraguaya a Taiwán (2025)', url: 'https://infonegocios.com.py/infoagro/azucar-paraguaya-con-sello-organico-nacional-llega-por-primera-vez-al-mercado-de-taiwan' },
    ],
  },
]

export const historicalFigures: HistoricalFigure[] = [
  {
    name: 'José Agustín Molas',
    role: 'Presbítero y prócer de la independencia paraguaya',
    period: '1783 (o 1787) – 1827',
    bio:
      'Nacido en Santa María de Fe, fue sacerdote y capellán del ejército paraguayo. Se opuso al intento de anexión al Río de la Plata y acompañó el proceso independentista de 1811. Falleció en Quyquyhó.',
    legacy:
      'Es recordado como uno de los próceres nacionales con raíces marienses; su figura da nombre a calles e instituciones de la región.',
    conflict:
      'Las fuentes difieren: nacimiento 1783 o 1787; fallecimiento documentado el 11 de enero de 1827, frente a referencias que indican 1840.',
    sources: [
      { title: 'Wikipedia ES — José Agustín Molas', url: 'https://es.wikipedia.org/wiki/Jos%C3%A9_Agust%C3%ADn_Molas' },
      { title: 'Portal Guaraní — José Agustín Molas', url: 'https://www.portalguarani.com/1979_jose_agustin_molas__.html' },
    ],
  },
  {
    name: 'Aimé Bonpland',
    role: 'Naturalista francés, médico y botánico',
    period: 'Confinado en Santa María de Fe 1821–1831',
    bio:
      'Compañero de expedición de Alexander von Humboldt, llegó al Paraguay y fue confinado en Santa María de Fe por decisión del gobierno. Allí investigó plantas medicinales, enseñó técnicas para la elaboración de dulces y licores, y aprendió de los pobladores las propiedades curativas de las hierbas locales.',
    legacy:
      'La comunidad lo recuerda como karai arandu ("señor sabio"). Su casa-museo y la huerta medicinal mantienen viva su memoria; su liberación fue pedida por Bolívar, Humboldt y San Martín.',
    conflict: 'El confinamiento se documenta entre 1821 y 1831; una fuente indica 1821–1829.',
    sources: [
      { title: 'RFI — crónica cultural sobre Aimé Bonpland (2023)', url: 'https://www.rfi.fr/es/programas/cr%C3%B3nica-cultural/20230623-paraguay-rinde-homenaje-al-prol%C3%ADfico-bot%C3%A1nico-franc%C3%A9s-aim%C3%A9-bonpland' },
      { title: 'Australian National Botanic Gardens — Bonpland', url: 'https://www.anbg.gov.au/biography/bonpland-aime-jacques.html' },
    ],
  },
  {
    name: 'Padre Emmanuel Berthot',
    role: 'Misionero jesuita francés',
    period: 'Siglo XVII',
    bio:
      'Fundador de la reducción de Nuestra Señora del Taré el 8 de septiembre de 1647, origen histórico de la actual Santa María de Fe.',
    legacy: 'Su nombre encabeza la historia fundacional del distrito.',
    sources: [WIKI_SMF],
  },
  {
    name: 'Margaret Hebblethwaite',
    role: 'Escritora, teóloga y promotora del turismo solidario',
    period: 'Residente desde 2000',
    bio:
      'Radicalizada en Santa María de Fe desde el año 2000, fundó el Santa María Hotel (2006) y el Santa Maria Education Fund, que financia becas universitarias para la juventud del pueblo, además de impulsar talleres artesanales comunitarios.',
    legacy:
      'Su proyecto de turismo ético es referente nacional e internacional, y sostiene la formación universitaria de decenas de jóvenes marienses.',
    sources: [
      { title: 'Santa María Hotel — sitio oficial', url: 'https://santamariahotel.org/?lang=es' },
      { title: 'Santa Maria Education Fund', url: 'https://santamariadefe.org/what-we-do/scholarships/' },
    ],
  },
]

export const historySections = [
  {
    title: 'La reducción jesuítico-guaraní',
    body:
      'Santa María de Fe fue fundada como reducción de Nuestra Señora del Taré el 8 de septiembre de 1647. Tras el asedio de los bandeirantes, la comunidad se trasladó en 1669 al emplazamiento actual, en el corazón del departamento de Misiones. Allí desarrolló una vida organizada en torno a la fe, el trabajo y el arte: los talleres de madera policromada produjeron las imágenes que hoy custodia el museo.',
    sources: [WIKI_SMF],
  },
  {
    title: 'Un patrimonio sobreviviente',
    body:
      'El templo original se perdió en el incendio de 1889, pero las imágenes rescatadas por los vecinos siguen en uso litúrgico y expositivo. El museo, instalado en una antigua Casa de Indios, conserva unas 56 piezas en seis salas, incluido el único pesebre completo de las treinta reducciones. La tradición oral y el trabajo comunitario sostienen este patrimonio vivo.',
    sources: [
      { title: 'Visit Paraguay — museo', url: 'https://visitparaguay.travel/places/museo-diocesano-de-arte-jesuitico-santa-maria-de-fe' },
      { title: 'ABC Color — obras barrocas (2009)', url: 'http://archivo.abc.com.py/2009-06-21/articulos/532655/obras-barrocas-en-santa-maria-de-fe' },
    ],
  },
  {
    title: 'Gente linda y turismo solidario',
    body:
      'En las últimas décadas Santa María de Fe se convirtió en un caso de turismo comunitario reconocido internacionalmente. El Santa María Hotel, el Taller de Hermandad, los tapices y el proyecto Pueblo Hotel muestran cómo la comunidad transformó su patrimonio en trabajo digno, sin renunciar a su identidad.',
    sources: [
      { title: 'SENATUR — Hotel del Pueblo', url: 'https://senatur.gov.py/noticias/santa-maria-de-fe-avanza-hacia-la-concrecion-del-hotel-del-pueblo/' },
      { title: 'La Nación — Cannes Lions 2026', url: 'https://www.lanacion.com.py/negocios/2026/06/23/santa-maria-pueblo-hotel-pone-a-paraguay-en-la-elite-mundial-de-la-creatividad-turistica/' },
    ],
  },
]

/** Datos geográficos y demográficos con fuentes. */
export const districtFacts = [
  { label: 'Fundación', value: '8 de septiembre de 1647', source: WIKI_SMF.title },
  { label: 'Población (Censo 2022)', value: '7.481 habitantes', source: WIKI_SMF.title },
  { label: 'Superficie', value: '520 km²', source: WIKI_SMF.title },
  { label: 'Departamento', value: 'Misiones, Paraguay', source: WIKI_SMF.title },
  { label: 'Distancia desde Asunción', value: 'Unos 250 km por Ruta PY01', source: 'Touring y Automóvil Club Paraguayo / prensa (230–253 km según fuentes)' },
  { label: 'Distancia a San Ignacio', value: '15 km', source: WIKI_SMF.title },
  { label: 'Prefijo telefónico del distrito', value: '781', source: WIKI_SMF.title },
]
