import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'public', 'images', 'lugares');
const OUT = path.join(process.cwd(), 'shots', 'zoom');
fs.mkdirSync(OUT, { recursive: true });

// Regiones aproximadas [x, y, w, h] sobre el tamaño natural de cada imagen.
const jobs = [
  { file: 'Hostal san joseportada.jpeg', name: 'sign-hostalsanjose', clip: { x: 690, y: 385, width: 230, height: 125 }, scale: 5 },
  { file: 'hospedajelaloportada.jpeg', name: 'sign-tiolalo', clip: { x: 645, y: 425, width: 235, height: 105 }, scale: 6 },
  { file: 'aguarahotelportada.jpeg', name: 'sign-aguara', clip: { x: 275, y: 275, width: 190, height: 105 }, scale: 7 },
  { file: 'ñanderogaportada.png', name: 'sign-nanderoga', clip: { x: 95, y: 345, width: 305, height: 85 }, scale: 5 },
];

const browser = await chromium.launch({ headless: true });

for (const job of jobs) {
  const full = path.join(ROOT, job.file);
  const ext = path.extname(job.file).slice(1).toLowerCase();
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  const dataUri = `data:${mime};base64,` + fs.readFileSync(full).toString('base64');

  const ctx = await browser.newContext({
    viewport: { width: job.clip.width * job.scale, height: job.clip.height * job.scale },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  // La imagen se embebe como data URI: sin restricciones de origen.
  await page.setContent(
    `<html><body style="margin:0;overflow:hidden;background:#fff">
       <img id="i" src="${dataUri}"
            style="position:absolute;image-rendering:pixelated;" />
     </body></html>`
  );
  await page.waitForFunction(() => {
    const i = document.getElementById('i');
    return i && i.complete && i.naturalWidth > 0;
  }, { timeout: 30000 });

  await page.evaluate(
    ({ clip, scale }) => {
      const img = document.getElementById('i');
      img.style.width = img.naturalWidth * scale + 'px';
      img.style.height = 'auto';
      img.style.left = -clip.x * scale + 'px';
      img.style.top = -clip.y * scale + 'px';
    },
    { clip: job.clip, scale: job.scale }
  );
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, job.name + '.png') });
  console.log('ok', job.name);
  await ctx.close();
}

await browser.close();
console.log('listo en shots/zoom');
