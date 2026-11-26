import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/data/accommodations.ts',
  'src/data/places.ts',
  'src/data/restaurants.ts',
  'src/data/events.ts',
  'src/data/crafts.ts',
];

const out = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  // dividir en registros por "  {\n"
  const blocks = src.split(/\n  \{\r?\n/).slice(1);
  for (const b of blocks) {
    const id = (b.match(/(?:^|\n)\s*id: '([^']+)'/) || [])[1] || '(sin id)';
    const m = b.match(/images: \[([\s\S]*?)\]/);
    const single = b.match(/\n\s*image: '([^']+)'/);
    let imgs = [];
    if (m) imgs = (m[1].match(/'[^']*'/g) || []).map((s) => s.slice(1, -1));
    else if (single) imgs = [single[1]];
    if (imgs.length === 0) continue;
    const first = imgs[0];
    out.push({
      archivo: f,
      id,
      cantidad: imgs.length,
      principal: first,
      esDeLugares: first.startsWith('/images/lugares/'),
    });
  }
}

console.log('=== IMAGEN PRINCIPAL DE CADA REGISTRO ===');
for (const r of out) {
  const marca = r.esDeLugares ? '  <== NUEVA' : '';
  console.log(`${r.id.padEnd(38)} n=${String(r.cantidad).padStart(2)}  ${r.principal}${marca}`);
}

const nuevas = out.filter((r) => r.esDeLugares);
console.log(`\nRegistros con foto de public/images/lugares como principal: ${nuevas.length}`);
for (const n of nuevas) console.log('  - ' + n.id + '  <-  ' + n.principal);

fs.writeFileSync('shots/img-principales.json', JSON.stringify(out, null, 2), 'utf8');
