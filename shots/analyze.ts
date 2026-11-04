import { places, featuredPlaces } from '../src/data/places';
import { accommodations } from '../src/data/accommodations';
import { restaurants } from '../src/data/restaurants';
import { celebrations } from '../src/data/events';
import { tours } from '../src/data/tours';

console.log('=== PLACES: ' + places.length + ' ===');
for (const p of places as any[]) {
  const imgs = (p.images || []).length;
  const coords = p.coordinates ? `${p.coordinates.latitude},${p.coordinates.longitude}` : 'NONE';
  console.log(`[${p.category}] ${p.id} | imgs=${imgs} | ${coords} | phone=${p.phone || '-'} | hours=${p.openingHours ? 'Y' : 'n'} | ${p.name}`);
}

console.log('\n=== FEATURED: ' + (featuredPlaces as any[]).length + ' ===');
for (const p of featuredPlaces as any[]) console.log(' ', p.id, '|', p.name);

console.log('\n=== ACCOMMODATIONS: ' + (accommodations as any[]).length + ' ===');
for (const a of accommodations as any[]) {
  console.log(`  ${a.slug} | imgs=${(a.images||[]).length} | coords=${a.coordinates ? 'Y' : 'N'} | phone=${a.phone||a.whatsapp||'-'} | web=${a.website||'-'} | price=${JSON.stringify(a.priceRange||a.prices||null)} | ${a.name}`);
}

console.log('\n=== RESTAURANTS: ' + (restaurants as any[]).length + ' ===');
for (const r of restaurants as any[]) {
  console.log(`  ${r.slug} | imgs=${(r.images||[]).length} | coords=${r.coordinates ? 'Y' : 'N'} | phone=${r.phone||r.whatsapp||'-'} | hours=${r.openingHours||'-'} | ${r.name}`);
}

console.log('\n=== EVENTS: ' + (celebrations as any[]).length + ' ===');
for (const e of celebrations as any[]) console.log(`  ${e.id} | ${e.name} | ${e.dateDescription || e.date || '-'}`);

console.log('\n=== TOURS: ' + (tours as any[]).length + ' ===');
for (const t of tours as any[]) console.log(`  ${t.slug || t.id} | ${t.name}`);
