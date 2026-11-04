import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/data/places.ts', 'src/data/accommodations.ts', 'src/data/restaurants.ts',
  'src/data/events.ts', 'src/data/tours.ts', 'src/data/crafts.ts', 'src/data/images.ts',
  'src/data/history.ts', 'src/data/itineraries.ts', 'src/data/site.ts',
];

const refs = new Map();
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const m = src.match(/'(\/[^']*\.(?:jpg|jpeg|png|webp|svg|avif))'/gi) || [];
  for (const u of m) {
    const clean = u.slice(1, -1);
    if (!refs.has(clean)) refs.set(clean, []);
    refs.get(clean).push(f);
  }
}

const missing = [];
const ok = [];
for (const [u, where] of refs) {
  const p = path.join('public', u.replace(/^\//, ''));
  if (fs.existsSync(p)) ok.push(u);
  else missing.push(`${u}   <- ${[...new Set(where)].join(', ')}`);
}

console.log('TOTAL refs: ' + refs.size + ' | OK: ' + ok.length + ' | MISSING: ' + missing.length);
console.log('\n--- MISSING ---');
for (const m of missing) console.log('  ' + m);

// also list public images not referenced
const pub = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, e.name);
    if (e.isDirectory()) walk(full);
    else pub.push('/' + path.relative('public', full).replace(/\\/g, '/'));
  }
}
walk('public');
const unreferenced = pub.filter((p) => !refs.has(p));
console.log('\n--- PUBLIC FILES NOT REFERENCED IN DATA (' + unreferenced.length + ') ---');
for (const u of unreferenced) console.log('  ' + u);
console.log('\n--- ALL PUBLIC IMAGES (' + pub.length + ') ---');
for (const u of pub.sort()) console.log('  ' + u);
