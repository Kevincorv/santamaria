import fs from 'node:fs';

function entries(file) {
  const src = fs.readFileSync(file, 'utf8');
  return src.split(/\n  \{\r?\n/).slice(1);
}
function field(block, re) {
  const m = block.match(re);
  return m ? m[1] : '';
}
function countImages(block) {
  const m = block.match(/images: \[([\s\S]*?)\]/);
  return m ? (m[1].match(/'[^']*'/g) || []).length : 0;
}

const out = [];

const pl = entries('src/data/places.ts');
out.push(`=== PLACES: ${pl.length} ===`);
for (const b of pl) {
  const id = field(b, /id: '([^']+)'/);
  const name = field(b, /name: '([^']+)'/);
  const cat = field(b, /category: '([^']+)'/);
  const coords = /coordinates: \{/.test(b) ? field(b, /latitude: (-?[\d.]+), longitude: (-?[\d.]+)/) : 'NONE';
  out.push(`[${cat}] ${id} | imgs=${countImages(b)} | ${coords} | phone=${/phone:/.test(b) ? 'Y' : 'n'} | hours=${/openingHours:/.test(b) ? 'Y' : 'n'} | web=${/website:/.test(b) ? 'Y' : 'n'} | ${name}`);
}

for (const [file, label] of [
  ['src/data/accommodations.ts', 'ACCOMMODATIONS'],
  ['src/data/restaurants.ts', 'RESTAURANTS'],
  ['src/data/events.ts', 'EVENTS'],
  ['src/data/tours.ts', 'TOURS'],
  ['src/data/crafts.ts', 'CRAFTS'],
] ) {
  const es = entries(file);
  out.push(`\n=== ${label}: ${es.length} ===`);
  for (const b of es) {
    const id = field(b, /(?:^|\n)\s*(?:id|slug): '([^']+)'/);
    const name = field(b, /name: '([^']+)'/);
    out.push(`  ${id} | imgs=${countImages(b)} | coords=${/coordinates: \{/.test(b) ? 'Y' : 'N'} | phone=${/phone|whatsapp/.test(b) ? 'Y' : 'n'} | hours=${/hours|schedule|opening/i.test(b) ? 'Y' : 'n'} | web=${/website|url:/.test(b) ? 'Y' : 'n'} | ${name}`);
  }
}

fs.writeFileSync('shots/data-report.txt', out.join('\n'), 'utf8');
console.log('wrote shots/data-report.txt lines=' + out.length);
