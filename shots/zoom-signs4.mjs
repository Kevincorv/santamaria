import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'public', 'images', 'lugares');
const OUT = path.join(process.cwd(), 'shots', 'zoom');

const jobs = [
  { file: 'aguarahotelportada.jpeg', name: 'sign-aguara-v2', clip: { x: 300, y: 330, width: 150, height: 90 }, scale: 10 },
  { file: 'aguarahotelportada.jpeg', name: 'sign-aguara-v3', clip: { x: 305, y: 355, width: 140, height: 55 }, scale: 14 },
];

const browser = await chromium.launch({ headless: true });
for (const job of jobs) {
  const full = path.join(ROOT, job.file);
  const dataUri = 'data:image/jpeg;base64,' + fs.readFileSync(full).toString('base64');
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
