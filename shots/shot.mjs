import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE || 'http://127.0.0.1:4173';
const OUT = process.env.OUT || 'shots/out';
fs.mkdirSync(OUT, { recursive: true });

// routes: [path, name, viewportKey]
const routes = JSON.parse(process.env.ROUTES || '[]');

const viewports = {
  desktop: { width: 1440, height: 900 },
  wide: { width: 1920, height: 1080 },
  tablet: { width: 820, height: 1180 },
  mobile: { width: 390, height: 844 },
  small: { width: 320, height: 640 },
};

const browser = await chromium.launch({ headless: true });
const report = [];

for (const r of routes) {
  const vp = viewports[r.vp || 'desktop'];
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  const failedReq = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e.message).slice(0, 300)));
  page.on('requestfailed', (req) => failedReq.push(req.url().slice(0, 200) + ' :: ' + (req.failure()?.errorText || '')));
  page.on('response', (res) => { if (res.status() >= 400) failedReq.push(res.status() + ' ' + res.url().slice(0, 200)); });

  try {
    await page.goto(BASE + r.path, { waitUntil: 'networkidle', timeout: 45000 });
  } catch (e) {
    errors.push('GOTO: ' + String(e.message).slice(0, 200));
  }

  // Scroll completo para disparar las imágenes con carga diferida.
  try {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const step = () => {
          window.scrollBy(0, window.innerHeight);
          total += window.innerHeight;
          if (total < document.body.scrollHeight + window.innerHeight) {
            setTimeout(step, 120);
          } else {
            window.scrollTo(0, 0);
            resolve();
          }
        };
        step();
      });
    });
    await page.waitForTimeout(600);
    await page.waitForFunction(
      () => Array.from(document.images).every((i) => i.complete),
      { timeout: 8000 }
    ).catch(() => {});
  } catch {}
  await page.waitForTimeout(r.wait || 1200);

  const file = path.join(OUT, `${r.name}.png`);
  await page.screenshot({ path: file, fullPage: r.full !== false });

  // detect broken images
  const brokenImgs = await page.evaluate(() => {
    return Array.from(document.images)
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src)
      .slice(0, 20);
  });

  const bodyText = await page.evaluate(() => document.body.innerText.length);

  report.push({ name: r.name, path: r.path, vp: r.vp || 'desktop', errors, failedReq: [...new Set(failedReq)], brokenImgs, bodyText, file });
  await ctx.close();
}

fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify(report, null, 2));
