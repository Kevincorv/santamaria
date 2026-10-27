/**
 * Itinerarios orientativos armados con lugares y locales verificados del portal.
 * Las duraciones son estimaciones de recorrido y los costos se indican solo
 * cuando existe una tarifa publicada; el resto queda como "Consultar previamente".
 */

export interface ItineraryStop {
  time?: string
  name: string
  /** Ruta interna de la ficha, si existe. */
  href?: string
  detail: string
  cost: string
}

export interface Itinerary {
  id: string
  title: string
  duration: string
  summary: string
  bestFor: string
  stops: ItineraryStop[]
  totalCost: string
  tips: string[]
  image: string
  note?: string
}

export const itineraries: Itinerary[] = [
  {
    id: 'dos-horas',
    title: 'Santa María en 2 horas',
    duration: '2 horas · a pie',
    summary:
      'El recorrido mínimo para entender el pueblo: la plaza con sus monos, la iglesia, el museo jesuítico y el manantial histórico. Todo en el casco urbano.',
    bestFor: 'Escala rápida, viajeros de paso o primera tarde en el pueblo.',
    stops: [
      {
        time: '00:00 – 00:20',
        name: 'Plaza Mariscal Estigarribia',
        href: '/lugares/plaza-mariscal-estigarribia',
        detail: 'Caminata bajo la arboleda y observación de los monos carayás que vive la comunidad.',
        cost: 'Gratis',
      },
      {
        time: '00:20 – 00:40',
        name: 'Iglesia de Santa María de Fe',
        href: '/lugares/iglesia-santa-maria',
        detail: 'Fachada y conjunto monumental frente a la plaza. Si hay culto, se respeta el momento.',
        cost: 'Gratis',
      },
      {
        time: '00:40 – 01:25',
        name: 'Museo Diocesano de Arte Jesuítico Guaraní',
        href: '/lugares/museo-diocesano',
        detail: 'Seis salas con imágenes barrocas guaraníes y el pesebre completo de la Natividad.',
        cost: 'Gs. 20.000 (tarifa de referencia SENATUR)',
      },
      {
        time: '01:25 – 02:00',
        name: 'Ykua Teja',
        href: '/lugares/ykua-teja',
        detail: 'Manantial jesuítico y antigua lavandería comunitaria, hoy plaza con áreas verdes.',
        cost: 'Gratis',
      },
    ],
    totalCost: 'Orientativo: Gs. 20.000 por persona (solo museo) + consumos.',
    tips: [
      'El museo no tiene horario único publicado: confirmá antes de arrancar.',
      'Llevá agua y gorra; el sol de Misiones pega fuerte al mediodía.',
      'Si te sobra tiempo, sumá el Monasterio San José y su taller de dulces.',
    ],
    image: '/images/commons/plaza-iglesia-01.jpg',
    note: 'Los tiempos incluyen caminata lenta y pausas cortas, sin contar traslados en vehículo.',
  },
  {
    id: 'medio-dia',
    title: 'Medio día jesuítico y sabores',
    duration: '4 a 5 horas · a pie y en auto corto',
    summary:
      'Patrimonio, artesanía y comida local en una sola salida. Ideal para conocer el museo con calma y llevarse algo hecho en el pueblo.',
    bestFor: 'Familias y visitantes que quieren combinar cultura con gastronomía.',
    stops: [
      {
        time: '09:00 – 09:30',
        name: 'Plaza Mariscal Estigarribia e iglesia',
        href: '/lugares/plaza-mariscal-estigarribia',
        detail: 'Punto de partida en el centro, con la iglesia y el casco fundacional.',
        cost: 'Gratis',
      },
      {
        time: '09:30 – 10:30',
        name: 'Museo Diocesano de Arte Jesuítico Guaraní',
        href: '/lugares/museo-diocesano',
        detail: 'Visita guiada por las seis salas del museo en la antigua Casa de Indios.',
        cost: 'Gs. 20.000 (referencia SENATUR)',
      },
      {
        time: '10:30 – 11:15',
        name: 'Ykua Teja y casco histórico',
        href: '/lugares/ykua-teja',
        detail: 'Paseo corto por el manantial y las calles del casco.',
        cost: 'Gratis',
      },
      {
        time: '11:15 – 12:15',
        name: 'Taller de Hermandad o taller de tapices',
        href: '/lugares/taller-hermandad',
        detail: 'Bordados y apliqués hechos a mano por artesanas del pueblo. Visita coordinada.',
        cost: 'Consultar previamente',
      },
      {
        time: '12:30 – 14:00',
        name: 'Almuerzo en Delicias Tati',
        href: '/gastronomia/delicias-tati',
        detail: 'Heladería, pizzería y pastelería sobre el Paseo Jesuítico, a una cuadra de la plaza.',
        cost: 'Consultar previamente (sin menú publicado)',
      },
    ],
    totalCost: 'Orientativo: Gs. 20.000 de museo + almuerzo y consumos a confirmar.',
    tips: [
      'Las visitas a talleres se coordinan con anticipación por sus canales de contacto.',
      'Reservá el almuerzo si vas en fin de semana o feriado.',
      'El monasterio vende dulces y mermeladas a leña: preguntá disponibilidad.',
    ],
    image: '/images/commons/museo-casa-indios.jpg',
    note: 'Si el museo está cerrado, el recorrido se puede hacer igual por fuera y sumar el Kurusu Cerro.',
  },
  {
    id: 'fin-de-semana',
    title: 'Fin de semana completo',
    duration: '2 días · auto recomendado',
    summary:
      'Dos jornadas para el casco histórico, el cerro, la naturaleza y los productos locales. Pensado para dormir en el pueblo y recorrer sin apuro.',
    bestFor: 'Parejas y familias que quieren quedarse a dormir y conocer los alrededores.',
    stops: [
      {
        time: 'Sábado 09:00',
        name: 'Casco histórico: plaza, iglesia y museo',
        href: '/lugares/museo-diocesano',
        detail: 'Circuito jesuítico completo en el centro, con calma y visita guiada.',
        cost: 'Gs. 20.000 (museo)',
      },
      {
        time: 'Sábado 15:00',
        name: 'Kurusu Cerro',
        href: '/lugares/kurusu-cerro',
        detail: 'Traslado de unos 9 km y ascenso por sendero de 2 km hasta la capilla y el mirador.',
        cost: 'Gratis (acceso al cerro)',
      },
      {
        time: 'Sábado noche',
        name: 'Santa María Hotel',
        href: '/hospedajes/santa-maria-hotel',
        detail: 'Alojamiento de turismo solidario con desayuno incluido y comidas por reserva.',
        cost: 'Desde Gs. 180.000 (tarifa 2026 publicada)',
      },
      {
        time: 'Domingo 09:00',
        name: 'Balneario Taperã y Frutas del Paraguay',
        href: '/lugares/balneario-taperã',
        detail: 'Paseo corto por el balneario y compra de frutas de temporada en el centro.',
        cost: 'Gratis / compras a confirmar',
      },
      {
        time: 'Domingo 11:00',
        name: 'Ingenio Hibernia',
        href: '/lugares/ingenio-hibernia',
        detail: 'Parada en la entrada del pueblo para conocer la agroindustria del azúcar orgánica.',
        cost: 'Consultar previamente (visitas técnicas)',
      },
      {
        time: 'Domingo 12:30',
        name: 'Almuerzo y artesanías',
        href: '/gastronomia',
        detail: 'Opciones del centro y compra directa de artesanías y productos del monasterio.',
        cost: 'Consultar previamente',
      },
    ],
    totalCost:
      'Orientativo: alojamiento desde Gs. 180.000 + Gs. 20.000 de museo + comidas y traslados a confirmar.',
    tips: [
      'Reservá el alojamiento con anticipación, sobre todo en Semana Santa y el 8 de septiembre.',
      'El acceso al cerro y a la Granja 5 de Mayo depende del estado del camino.',
      'Cargá combustible en San Ignacio si venís desde Asunción.',
    ],
    image: '/images/commons/acceso-ruta.jpg',
    note: 'Los costos son orientativos y no incluyen transporte propio ni excursiones contratadas.',
  },
]
