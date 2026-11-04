import fs from 'node:fs';

function summarize(file, label) {
  const src = fs.readFileSync(file, 'utf8');
  console.log('\n===== ' + label + ' =====');
  console.log('bytes:', src.length);
}

// crude extraction of image arrays per place block
const places = fs.readFileSync('src/data/places.ts', 'utf8');
const blocks = places.split(/\n  \{\n/).slice(1);
console.log('PLACES: ' + blocks.length + ' entries');
for (const b of blocks) {
  const id = (b.match(/id: '([^']+)'/) || [])[1];
  const name = (b.match(/name: '([^']+)'/) || [])[1];
  const cat = (b.match(/category: '([^']+)'/) || [])[1];
  const imgMatch = b.match(/images: \[([\s\S]*?)\]/);
  const imgs = imgMatch ? (imgMatch[1].match(/'[^']+'/g) || []).length : 0;
  const coords = /coordinates: \{/.test(b) ? (b.match(/latitude: (-?[\d.]+), longitude: (-?[\d.]+)/) || []).slice(1).join(',') : 'NONE';
  const phone = /phone/.test(b) ? 'PHONE' : '-';
  const hours = /openingHours:/.test(b) ? 'hours' : '-';
  console.log(`  [${cat}] ${id} | imgs=${imgs} | coords=${coords} | ${phone} ${hours} | ${name}`);
}
