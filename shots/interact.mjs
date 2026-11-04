import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.env.BASE || 'http://127.0.0.1:4173';
const results = [];
const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  :: ' + detail : ''}`);
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });
page.on('pageerror', (e) => consoleErrors.push('PAGEERROR ' + String(e.message).slice(0, 200)));

/* ---------- 1. Buscador de la portada ---------- */
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.fill('#buscador-portada', 'museo');
await page.click('button[aria-label="Buscar"]');
await page.waitForTimeout(1200);
ok('Buscador portada navega a /lugares?q=museo', page.url().includes('/lugares?q=museo'), page.url());
const resultText = await page.evaluate(() => document.body.innerText);
ok('Resultados de búsqueda visibles', /museo/i.test(resultText), 'texto contiene "museo"');

/* ---------- 2. Filtros del catálogo de lugares ---------- */
await page.goto(BASE + '/lugares', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const countCards = () =>
  page.evaluate(() => document.querySelectorAll('main a[href^="/lugares/"]').length);
const cardsAll = await countCards();
// click en un filtro de categoría si existe
const filterBtns = page.locator('button:has-text("Naturaleza")');
if ((await filterBtns.count()) > 0) {
  await filterBtns.first().click();
  await page.waitForTimeout(700);
  const cardsFiltered = await countCards();
  ok(
    'Filtro por categoría reduce resultados',
    cardsFiltered > 0 && cardsFiltered <= cardsAll,
    `todos=${cardsAll} filtrado=${cardsFiltered}`
  );
} else {
  ok('Filtro por categoría reduce resultados', false, 'no se encontró el botón de filtro');
}

/* ---------- 2b. Volver a "Todos" restaura el catálogo completo ---------- */
const allBtn = page.locator('button:has-text("Todos")');
if ((await allBtn.count()) > 0) {
  await allBtn.first().click();
  await page.waitForTimeout(600);
  const restored = await countCards();
  ok('Filtro "Todos" restaura el catálogo', restored === cardsAll, `restaurado=${restored} inicial=${cardsAll}`);
}

/* ---------- 3. Estado sin resultados ---------- */
await page.goto(BASE + '/lugares?q=zzzzzznoexiste', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
const emptyTxt = await page.evaluate(() => document.body.innerText);
ok('Estado sin resultados mostrado', /no encontr|sin resultados|ningún/i.test(emptyTxt), emptyTxt.slice(0, 120).replace(/\n/g, ' '));

/* ---------- 4. QR: URL real (no localhost) y descarga disponible ---------- */
await page.goto(BASE + '/lugares/iglesia-santa-maria', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const qrValue = await page.evaluate(() => {
  const t = document.body.innerText;
  const m = t.match(/https?:\/\/[^\s]+\/lugares\/[^\s]+/);
  return m ? m[0] : null;
});
const svgCount = await page.locator('svg').count();
ok('QR renderizado en la ficha', svgCount > 0, `${svgCount} svg`);

const canonical = await page.evaluate(() => {
  const el = document.querySelector('link[rel="canonical"]');
  return el ? el.getAttribute('href') : null;
});
ok('Etiqueta canónica con dominio de producción', Boolean(canonical) && /santamaria-azure\.vercel\.app/.test(canonical), canonical || 'no encontrada');
const ogUrl = await page.evaluate(() => {
  const el = document.querySelector('meta[property="og:url"]');
  return el ? el.getAttribute('content') : null;
});
ok('og:url con dominio de producción', Boolean(ogUrl) && /santamaria-azure\.vercel\.app/.test(ogUrl), ogUrl || 'no encontrada');
const jsonLd = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  return els.map((e) => e.textContent).join(' | ');
});
ok('JSON-LD presente y con URL real', jsonLd.length > 0 && /santamaria-azure\.vercel\.app/.test(jsonLd), String(jsonLd.length) + ' chars');
const usesLocalhost = await page.evaluate(() => document.body.innerText.includes('localhost'));
ok('Sin referencias a localhost', !usesLocalhost);

/* ---------- 5. Ver código QR (botón) ---------- */
const qrBtn = page.locator('button:has-text("Ver código QR"), a:has-text("Ver código QR")');
if (await qrBtn.count() > 0) {
  await qrBtn.first().click();
  await page.waitForTimeout(1200);
  const after = await page.evaluate(() => document.body.innerText);
  ok('Panel de QR abre con descarga PNG/SVG', /PNG|SVG|Descargar|Imprimir/i.test(after), after.slice(0, 150).replace(/\n/g, ' '));
  const svgVal = await page.evaluate(() => {
    const t = document.body.innerText;
    const m = t.match(/https?:\/\/[^\s]+\/lugares\/[^\s]+/);
    return m ? m[0] : null;
  });
  ok('Panel de QR muestra la URL real', Boolean(svgVal) && !/localhost/.test(svgVal || ''), svgVal || 'sin URL visible');
  ok('QR codifica la URL pública real', Boolean(svgVal) && /santamaria-azure\.vercel\.app/.test(svgVal || ''), svgVal || '');
  ok('QR apunta a la ruta de la ficha', Boolean(svgVal) && (svgVal || '').includes('/lugares/iglesia-santa-maria'), svgVal || '');
  ok('QR sin localhost', !/localhost|127\.0\.0\.1/.test(svgVal || ''));
  ok('Descarga PNG disponible', (await page.locator('button:has-text("PNG")').count()) > 0);
  ok('Descarga SVG disponible', (await page.locator('button:has-text("SVG")').count()) > 0);
  ok('Vista imprimible disponible', (await page.locator('button:has-text("Imprimir")').count()) > 0);
} else {
  ok('Panel de QR abre con descarga PNG/SVG', false, 'botón no encontrado');
}

/* ---------- 6. Filtro del mapa interactivo ---------- */
await page.goto(BASE + '/mapa', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
const markersAll = await page.locator('.custom-map-marker').count();
const hotelBtn = page.locator('button:has-text("Hoteles")');
if (await hotelBtn.count() > 0) {
  await hotelBtn.first().click();
  await page.waitForTimeout(1500);
  const markersFiltered = await page.locator('.custom-map-marker').count();
  ok('Filtro de mapa cambia los marcadores', markersFiltered !== markersAll, `todos=${markersAll} hoteles=${markersFiltered}`);
} else {
  ok('Filtro de mapa cambia los marcadores', false, 'botón "Hoteles" no encontrado');
}

/* ---------- 7. Geolocalización solo con autorización ---------- */
const geoBtn = page.locator('button:has-text("Usar mi ubicación")');
ok('Botón de ubicación presente (requiere acción del usuario)', (await geoBtn.count()) > 0);

/* ---------- 8. Navegación por teclado / skip link ---------- */
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40) || '');
ok('Primer tabulador = skip link accesible', /saltar al contenido/i.test(firstFocus), firstFocus);

/* ---------- 9. Enlaces internos principales ---------- */
const navLinks = await page.evaluate(() => {
  const header = document.querySelector('header');
  return header ? Array.from(header.querySelectorAll('a')).map((a) => a.getAttribute('href')) : [];
});
const expected = ['/', '/lugares', '/historia', '/mapa', '/servicios', '/contacto'];
const missingNav = expected.filter((h) => !navLinks.includes(h));
ok('Nav principal completa (6 enlaces)', missingNav.length === 0, missingNav.join(', ') || 'todas presentes');

/* ---------- 10. Responsive: sin scroll horizontal ---------- */
for (const w of [320, 360, 390, 414, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const overflow = await page.evaluate(() => {
    return {
      docW: document.documentElement.scrollWidth,
      winW: window.innerWidth,
    };
  });
  ok(`Sin scroll horizontal @ ${w}px`, overflow.docW <= overflow.winW + 1, `scrollW=${overflow.docW} winW=${overflow.winW}`);
}
await page.setViewportSize({ width: 1440, height: 900 });

/* ---------- 11. Consola limpia ---------- */
ok('Sin errores de consola', consoleErrors.length === 0, consoleErrors.slice(0, 5).join(' | '));

fs.writeFileSync('shots/interaction-report.json', JSON.stringify(results, null, 2));
await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n=== ${results.length - failed.length}/${results.length} comprobaciones OK ===`);
if (failed.length) {
  console.log('FALLAS:');
  for (const f of failed) console.log(`  - ${f.name}: ${f.detail}`);
  process.exit(1);
}
