/**
 * Genera public/sitemap.xml y public/robots.txt a partir de los datos reales
 * del portal (lugares, alojamientos y locales) para que el SEO sea coherente
 * con las rutas existentes.
 *
 * Uso:  node scripts/generate-sitemap.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://santamaria-azure.vercel.app'
const OUT_DIR = path.join(process.cwd(), 'public')

/** Extrae los slugs de un archivo de datos .ts */
const slugsFrom = (file, key = 'slug') => {
  const src = fs.readFileSync(path.join(process.cwd(), file), 'utf8')
  const out = []
  const re = new RegExp(key + ":\\s*'([^']+)'", 'g')
  let m
  while ((m = re.exec(src)) !== null) out.push(m[1])
  return [...new Set(out)]
}

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/lugares', priority: '0.9', changefreq: 'weekly' },
  { path: '/mapa', priority: '0.9', changefreq: 'weekly' },
  { path: '/historia', priority: '0.8', changefreq: 'monthly' },
  { path: '/hospedajes', priority: '0.8', changefreq: 'weekly' },
  { path: '/gastronomia', priority: '0.8', changefreq: 'weekly' },
  { path: '/artesania', priority: '0.8', changefreq: 'monthly' },
  { path: '/eventos', priority: '0.8', changefreq: 'monthly' },
  { path: '/recorridos', priority: '0.7', changefreq: 'monthly' },
  { path: '/itinerarios', priority: '0.7', changefreq: 'monthly' },
  { path: '/servicios', priority: '0.7', changefreq: 'monthly' },
  { path: '/informacion-util', priority: '0.7', changefreq: 'monthly' },
  { path: '/contacto', priority: '0.7', changefreq: 'monthly' },
  { path: '/idiomas', priority: '0.5', changefreq: 'yearly' },
  { path: '/registro-prestadores', priority: '0.5', changefreq: 'monthly' },
  { path: '/escanear', priority: '0.5', changefreq: 'yearly' },
  { path: '/instalar', priority: '0.4', changefreq: 'yearly' },
  { path: '/acerca-de', priority: '0.4', changefreq: 'yearly' },
  { path: '/privacidad', priority: '0.3', changefreq: 'yearly' },
]

const dynamicRoutes = [
  ...slugsFrom('src/data/places.ts').map((s) => `/lugares/${s}`),
  ...slugsFrom('src/data/accommodations.ts').map((s) => `/hospedajes/${s}`),
  ...slugsFrom('src/data/restaurants.ts').map((s) => `/gastronomia/${s}`),
]

const allRoutes = [
  ...staticRoutes.map((r) => ({ ...r, loc: r.path })),
  ...dynamicRoutes.map((p) => ({ path: p, loc: p, priority: '0.7', changefreq: 'monthly' })),
]

const today = new Date().toISOString().slice(0, 10)

const urlEntries = allRoutes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.loc === '/' ? '/' : r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap, 'utf8')
fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots, 'utf8')

console.log(`sitemap.xml generado con ${allRoutes.length} URLs`)
console.log(`  - rutas estáticas:  ${staticRoutes.length}`)
console.log(`  - fichas dinámicas: ${dynamicRoutes.length}`)
