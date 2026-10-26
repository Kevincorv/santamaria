import { useEffect } from 'react'
import { canonicalUrl, SITE_NAME } from '../data/site'

interface SeoOptions {
  title: string
  description: string
  /** Ruta canónica, p. ej. "/lugares/museo-diocesano". */
  path?: string
  image?: string
  /** Tipo de Open Graph. */
  type?: string
  /** Datos estructurados JSON-LD adicionales. */
  jsonLd?: Record<string, unknown>
}

const setMeta = (selector: string, create: () => HTMLElement, update: (el: HTMLElement) => void) => {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  update(el)
}

/**
 * Aplica título, descripción, metadatos sociales y JSON-LD por ruta.
 * Se usa en cada página para cumplir con SEO técnico.
 */
export const useSeo = ({ title, description, path, image, type = 'website', jsonLd }: SeoOptions) => {
  useEffect(() => {
    const fullTitle = `${title} · ${SITE_NAME}`
    document.title = fullTitle

    setMeta('meta[name="description"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('name', 'description')
      return el
    }, (el) => el.setAttribute('content', description))

    if (path) {
      const canonical = canonicalUrl(path)
      setMeta('link[rel="canonical"]', () => {
        const el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        return el
      }, (el) => el.setAttribute('href', canonical))

      setMeta('meta[property="og:url"]', () => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:url')
        return el
      }, (el) => el.setAttribute('content', canonical))
    }

    setMeta('meta[property="og:title"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:title')
      return el
    }, (el) => el.setAttribute('content', fullTitle))

    setMeta('meta[property="og:description"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:description')
      return el
    }, (el) => el.setAttribute('content', description))

    setMeta('meta[property="og:type"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:type')
      return el
    }, (el) => el.setAttribute('content', type))

    setMeta('meta[property="og:locale"]', () => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'og:locale')
      return el
    }, (el) => el.setAttribute('content', 'es_PY'))

    if (image) {
      setMeta('meta[property="og:image"]', () => {
        const el = document.createElement('meta')
        el.setAttribute('property', 'og:image')
        return el
      }, (el) => el.setAttribute('content', canonicalUrl(image)))

      setMeta('meta[name="twitter:card"]', () => {
        const el = document.createElement('meta')
        el.setAttribute('name', 'twitter:card')
        return el
      }, (el) => el.setAttribute('content', 'summary_large_image'))
    }

    // JSON-LD
    const scriptId = 'page-jsonld'
    document.getElementById(scriptId)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = scriptId
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.getElementById(scriptId)?.remove()
    }
  }, [title, description, path, image, type, JSON.stringify(jsonLd)])
}

/** JSON-LD base del sitio (LocalBusiness / TouristInformationCenter). */
export const siteJsonLd = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'TouristInformationCenter',
  name: SITE_NAME,
  description: 'Guía turística y patrimonial de Santa María de Fe, Misiones, Paraguay',
  url: canonicalUrl('/'),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santa María de Fe',
    addressRegion: 'Misiones',
    addressCountry: 'PY',
  },
  areaServed: 'Santa María de Fe, Misiones, Paraguay',
})

/** JSON-LD de una ficha de lugar (Place + TouristAttraction). */
export const placeJsonLd = (opts: {
  name: string
  description: string
  path: string
  image?: string
  address?: string
  latitude?: number
  longitude?: number
}): Record<string, unknown> => {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: opts.name,
    description: opts.description,
    url: canonicalUrl(opts.path),
  }
  if (opts.image) data.image = canonicalUrl(opts.image)
  if (opts.address) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: opts.address,
      addressLocality: 'Santa María de Fe',
      addressRegion: 'Misiones',
      addressCountry: 'PY',
    }
  }
  if (opts.latitude !== undefined && opts.longitude !== undefined) {
    data.geo = {
      '@type': 'GeoCoordinates',
      latitude: opts.latitude,
      longitude: opts.longitude,
    }
  }
  return data
}
