import { Celebration } from '../types/places'
import { DATA_REVIEW_DATE } from './site'

/**
 * Celebraciones y tradiciones documentadas de Santa María de Fe.
 *
 * IMPORTANTE: no se publican eventos futuros con fechas inventadas. Se
 * documentan las tradiciones recurrentes con su periodo habitual, y siempre
 * se indica que el calendario vigente debe verificarse con la municipalidad,
 * la parroquia o la oficina de turismo.
 */

export const celebrations: Celebration[] = [
  {
    id: 'fiesta-patronal-8-septiembre',
    title: 'Fiesta patronal — Natividad de la Santísima Virgen (8 de septiembre)',
    description:
      'Santa María de Fe celebra cada 8 de septiembre la fiesta de su patrona, la Natividad de la Santísima Virgen, con procesión y misa mayor. En 2026 la celebración contó con una procesión a las 8:00 y una misa solemne a las 9:00 presidida por el obispo de la diócesis. La misma fecha conmemora además el aniversario de fundación de la reducción, que se remonta al 8 de septiembre de 1647.',
    category: 'religiosa',
    when: '8 de septiembre de cada año (fecha tradicional)',
    venue: 'Iglesia de Santa María de Fe y Plaza Mariscal Estigarribia',
    image: '/images/commons/plaza-iglesia-01.jpg',
    coordinates: { latitude: -26.7825265, longitude: -56.9450719 },
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'ABC Color (7/9/2026) y Wikipedia ES',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'ABC Color — "Santa María de Fe celebrará a su patrona entre historia y tradición" (2026)', url: 'https://www.abc.com.py/viajes/2026/09/07/santa-maria-de-fe-celebrara-a-su-patrona-entre-historia-y-tradicion/' },
      { title: 'Wikipedia ES — Santa María de Fe', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
    ],
    note: 'Los horarios exactos cambian cada año. Verificá el programa vigente con la parroquia o la municipalidad.',
  },
  {
    id: 'peregrinacion-viernes-santo',
    title: 'Peregrinación al Kurusu Cerro — Viernes Santo',
    description:
      'Cada Viernes Santo, miles de peregrinos ascienden desde muy temprano al Kurusu Cerro para pagar promesas, con salida tradicional desde el centro de la ciudad. En 2024 se estimó la concurrencia de unas 15.000 personas entre el Jueves y el Viernes Santo. En la base del cerro se instalan artesanos y hay estacionamientos; el ingreso al cerro es gratuito.',
    category: 'religiosa',
    when: 'Viernes Santo del calendario litúrgico (tradición anual)',
    venue: 'Kurusu Cerro (Cerro de Santa María), a unos 9 km del casco urbano',
    image: '/images/commons/acceso-ruta.jpg',
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'La Nación (2017 y 2024)',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'La Nación — "Subir al cerro Santa María, una tradicional y atractiva peregrinación de Viernes Santo en Misiones" (2024)', url: 'https://www.lanacion.com.py/pais/2024/03/29/subir-al-cerro-santa-maria-una-tradicional-y-atractiva-peregrinacion-de-viernes-santo-en-misiones/' },
      { title: 'La Nación — "Subir hasta el Kurusu Cerro en Santa María de Fe" (2017)', url: 'https://www.lanacion.com.py/pais/2017/04/14/subir-hasta-el-kurusu-cerro-en-santa-maria-de-fe-tradicion-del-viernes-santo/' },
    ],
    note: 'La fecha varía cada año según el calendario litúrgico. Planificá transporte con anticipación: hay aglomeraciones y cierres de calles.',
  },
  {
    id: 'semana-santa',
    title: 'Semana Santa mariense',
    description:
      'La Semana Santa es el período de mayor movimiento del año: la peregrinación al Kurusu Cerro, las celebraciones en la iglesia parroquial y la visita de familias de todo el departamento convierten a Santa María de Fe en uno de los destinos religiosos más importantes de Misiones. Los monos de la plaza y el museo jesuítico completan la oferta para quienes visitan en estas fechas.',
    category: 'religiosa',
    when: 'Semana Santa (fechas móviles según calendario litúrgico)',
    venue: 'Iglesia parroquial, Plaza Mariscal Estigarribia y Kurusu Cerro',
    image: '/images/commons/mono-caraya-02.jpg',
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'La Nación (2024), ABC Color y Wikipedia ES',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'La Nación — peregrinación de Viernes Santo (2024)', url: 'https://www.lanacion.com.py/pais/2024/03/29/subir-al-cerro-santa-maria-una-tradicional-y-atractiva-peregrinacion-de-viernes-santo-en-misiones/' },
      { title: 'Wikipedia ES — Santa María de Fe', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
    ],
    note: 'Es el período de mayor afluencia: reservá alojamiento con mucha anticipación.',
  },
  {
    id: 'aniversario-fundacion',
    title: 'Aniversario de la fundación de la reducción (8 de septiembre de 1647)',
    description:
      'El 8 de septiembre de 1647 el padre Emmanuel Berthot fundó la reducción de Nuestra Señora del Taré, origen de la actual Santa María de Fe. La fecha se conmemora cada año junto con la fiesta patronal, y en 2022 el distrito celebró sus 375 años de existencia.',
    category: 'cultural',
    when: '8 de septiembre (aniversario histórico de 1647)',
    venue: 'Casco histórico de Santa María de Fe',
    image: '/images/commons/calle-01.jpg',
    verificationStatus: {
      status: 'verified',
      lastChecked: DATA_REVIEW_DATE,
      source: 'Wikipedia ES',
    },
    lastUpdated: DATA_REVIEW_DATE,
    sources: [
      { title: 'Wikipedia ES — Santa María de Fe', url: 'https://es.wikipedia.org/wiki/Santa_Mar%C3%ADa_de_Fe' },
    ],
    note: 'Verificá el programa del año vigente con la municipalidad.',
  },
]

/** Aviso estándar sobre la verificación del calendario. */
export const EVENTS_DISCLAIMER =
  'Este portal no publica eventos futuros sin confirmar. Las celebraciones listadas son tradiciones anuales documentadas; consultá el calendario vigente con la Municipalidad de Santa María de Fe, la parroquia o la oficina de turismo antes de planificar tu visita.'
