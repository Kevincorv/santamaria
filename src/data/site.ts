/**
 * Configuración central del sitio.
 *
 * IMPORTANTE para producción: definir VITE_SITE_URL en el entorno de build
 * (por ejemplo VITE_SITE_URL=https://tudominio.com) para que los códigos QR,
 * las etiquetas canónicas y el sitemap apunten a la URL pública definitiva.
 * Sin esa variable, en producción se usa el origen donde se sirva la app.
 */
const envUrl = import.meta.env.VITE_SITE_URL as string | undefined

const runtimeOrigin = (): string => {
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return ''
}

export const SITE_URL: string = (envUrl || (import.meta.env.PROD ? runtimeOrigin() : '')).replace(
  /\/$/,
  ''
)

/** true cuando aún no se definió una URL canónica de producción. */
export const IS_CANONICAL_URL_MISSING = !envUrl && !import.meta.env.PROD

export const SITE_NAME = 'Santa María de Fe Digital'
export const SITE_TAGLINE = 'Guía turística y patrimonial de Santa María de Fe, Misiones, Paraguay'
export const DISTRICT = 'Santa María de Fe'
export const DEPARTMENT = 'Misiones'
export const COUNTRY = 'Paraguay'

/** URL pública de una ruta de la aplicación. */
export const canonicalUrl = (path: string): string => {
  const base = SITE_URL || runtimeOrigin()
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/** Fecha de la última revisión editorial general de los datos del sitio. */
export const DATA_REVIEW_DATE = '2026-10-26'

/** Texto estándar para datos sin confirmar. */
export const CONSULTAR_PREVIAMENTE = 'Consultar previamente'

export const PLACEHOLDER_ALT_TEXT =
  'Fotografía pendiente de incorporar de Santa María de Fe'
