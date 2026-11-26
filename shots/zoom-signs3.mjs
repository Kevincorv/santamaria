import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'public', 'images', 'lugares');
const OUT = path.join(process.cwd(), 'shots', 'zoom');

const jobs = [
  // Zona completa del cartel de NandeRoga para localizar el telefono
  { file: 'ñanderogaportada.png', name: 'sign-nanderoga-full', clip: { x: 15, y: 165, width: 345, height: 275 }, scale: 4 },
  // Solo la linea del telefono
  { file: 'ñanderogaportada.png', name: 'phone-nanderoga', clip: { x: 125, y: 370, width: 215, height: 45 }, scale: 10 },
  // Cartel de AguarA completo
  { file: 'aguarahotelportada.jpeg', name: 'sign-aguara-full', clip: { x: 290, y: 285, width: 165, height: 85 }, scale: 8 },
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
    `<html><body style="margin:0;overflow:hidden;background:#fff"><img id="i" src="${dataUri}" style="position:absolute" /></body></html>`
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
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(OUT, job.name + '.png') });
  console.log('ok', job.name);
  await ctx.close();
}
await browser.close();
