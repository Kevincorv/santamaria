import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'public', 'images', 'lugares');
const OUT = path.join(process.cwd(), 'shots', 'zoom');
fs.mkdirSync(OUT, { recursive: true });

const jobs = [
  // Telefono del cartel de Hostal San Jose (recorte muy amplio)
  { file: 'Hostal san joseportada.jpeg', name: 'phone-hostalsanjose', clip: { x: 758, y: 468, width: 80, height: 26 }, scale: 16 },
  { file: 'Hostal san joseportada.jpeg', name: 'phone-hostalsanjose-b', clip: { x: 750, y: 462, width: 96, height: 36 }, scale: 12 },
  // Cartel completo de AguarA
  { file: 'aguarahotelportada.jpeg', name: 'sign-aguara', clip: { x: 295, y: 290, width: 150, height: 70 }, scale: 10 },
  // Telefono de NandeRoga
  { file: 'ñanderogaportada.png', name: 'sign-nanderoga', clip: { x: 120, y: 360, width: 260, height: 60 }, scale: 8 },
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
  await page.setContent(
    `<html><body style="margin:0;overflow:hidden;background:#fff">
       <img id="i" src="${dataUri}" style="position:absolute;" />
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
