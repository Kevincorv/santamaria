import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.env.BASE || 'http://127.0.0.1:4173';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// 1) Recorrer todas las páginas conocidas y recolectar enlaces internos
const seedRoutes = [
  '/', '/lugares', '/historia', '/mapa', '/servicios', '/contacto', '/hospedajes',
  '/gastronomia', '/artesania', '/eventos', '/recorridos', '/itinerarios',
  '/informacion-util', '/idiomas', '/registro-prestadores', '/escanear',
  '/instalar', '/acerca-de', '/privacidad',
];

const internal = new Set();
const notFoundOn = [];
const titleMap = new Map();

for (const route of seedRoutes) {
  await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(400);
  const info = await page.evaluate(() => {
    const isNotFound = /No encontramos esa p.gina|\b404\b/.test(document.body.innerText.slice(0, 800));
    const links = Array.from(document.querySelectorAll('a[href]'))
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && (h.startsWith('/') || h.startsWith('#')));
    return { isNotFound, links, title: document.title, len: document.body.innerText.length };
  });
  titleMap.set(route, info.title);
  if (info.isNotFound) notFoundOn.push(route);
  for (const l of info.links) {
    const clean = l.split('?')[0].split('#')[0];
    if (clean && clean !== '/') internal.add(clean);
    else if (clean === '/') internal.add('/');
  }
}

// 2) Añadir fichas dinámicas desde los directorios
for (const dir of ['/lugares', '/hospedajes', '/gastronomia']) {
  await page.goto(BASE + dir, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const links = await page.evaluate(
    (prefix) =>
      Array.from(document.querySelectorAll('a[href]'))
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && h.startsWith(prefix + '/')),
    dir
  );
  for (const l of links) internal.add(l.split('?')[0]);
}

const routes = [...internal].sort();
console.log(`Enlaces internos descubiertos: ${routes.length}`);

// 3) Visitar cada enlace y comprobar que no cae en 404
const broken = [];
const details = [];
for (const r of routes) {
  await page.goto(BASE + r, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(350);
  const info = await page.evaluate(() => {
    const txt = document.body.innerText;
    return {
      isNotFound: /No encontramos esa p.gina/.test(txt.slice(0, 900)),
      len: txt.length,
      title: document.title,
    };
  });
  const pass = !info.isNotFound && info.len > 250;
  details.push({ route: r, pass, len: info.len, title: info.title });
  if (!pass) broken.push(`${r} (404=${info.isNotFound}, len=${info.len})`);
}

console.log(`Rutas verificadas: ${routes.length}`);
console.log(`Rutas caídas en 404 o vacías: ${broken.length}`);
for (const b of broken) console.log('   BROKEN ' + b);

// 4) Títulos únicos por página (SEO)
const seeds = [...titleMap.entries()];
const titles = seeds.map(([, t]) => t);
const dupes = titles.filter((t, i) => titles.indexOf(t) !== i);
console.log(`\nPáginas semilla: ${seeds.length} | títulos únicos: ${new Set(titles).size}`);
if (dupes.length) console.log('   TÍTULOS DUPLICADOS: ' + [...new Set(dupes)].join(' | '));

fs.writeFileSync(
  'shots/link-report.json',
  JSON.stringify({ routes, broken, details, titles: seeds }, null, 2)
);
await browser.close();

if (broken.length || dupes.length) process.exit(1);
console.log('\nOK: todos los enlaces internos resuelven contenido real.');
