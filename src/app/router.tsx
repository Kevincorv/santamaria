import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages'
import { NotFoundPage } from '../pages/not-found'

/**
 * Router con carga diferida (lazy) por ruta para reducir el bundle inicial.
 * Cada import se resuelve en un chunk propio.
 */
export const router = createBrowserRouter([
  { path: '/', Component: Home },
  {
    path: '/lugares',
    lazy: async () => ({ Component: (await import('../pages/lugares')).PlacesCatalog }),
  },
  {
    path: '/lugares/:slug',
    lazy: async () => ({ Component: (await import('../pages/lugar-detalle')).PlaceDetail }),
  },
  {
    path: '/historia',
    lazy: async () => ({ Component: (await import('../pages/historia')).HistoriaPage }),
  },
  {
    path: '/mapa',
    lazy: async () => ({ Component: (await import('../pages/mapa')).MapPage }),
  },
  {
    path: '/hospedajes',
    lazy: async () => ({ Component: (await import('../pages/hospedajes')).HospedajesPage }),
  },
  {
    path: '/gastronomia',
    lazy: async () => ({ Component: (await import('../pages/gastronomia')).GastronomiaPage }),
  },
  {
    path: '/artesania',
    lazy: async () => ({ Component: (await import('../pages/artesania')).ArtesaniaPage }),
  },
  {
    path: '/eventos',
    lazy: async () => ({ Component: (await import('../pages/eventos')).EventosPage }),
  },
  {
    path: '/recorridos',
    lazy: async () => ({ Component: (await import('../pages/recorridos')).RecorridosPage }),
  },
  {
    path: '/escanear',
    lazy: async () => ({ Component: (await import('../features/qr/qr-scanner')).QRScanner }),
  },
  {
    path: '/instalar',
    lazy: async () => ({ Component: (await import('../pages/info-pages')).InstalarPage }),
  },
  {
    path: '/acerca-de',
    lazy: async () => ({ Component: (await import('../pages/info-pages')).AcercaDePage }),
  },
  {
    path: '/privacidad',
    lazy: async () => ({ Component: (await import('../pages/info-pages')).PrivacidadPage }),
  },
  {
    path: '/admin',
    lazy: async () => ({ Component: (await import('../pages/admin')).AdminPage }),
  },
  { path: '*', Component: NotFoundPage },
])
