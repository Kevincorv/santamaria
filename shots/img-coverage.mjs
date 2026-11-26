import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'public', 'images', 'lugares');
const SRC = path.join(process.cwd(), 'src');

// 1) Todas las imágenes de la carpeta
const files = fs.readdirSync(ROOT).filter((f) => fs.statSync(path.join(ROOT, f)).isFile());

// 2) Todo el código fuente concatenado
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx)$/.test(e.name)) acc.push(full);
  }
  return acc;
}
const sources = walk(SRC);
const corpus = sources.map((f) => fs.readFileSync(f, 'utf8')).join('\n');

// 3) Cobertura
const rows = files.map((f) => {
  const url = '/images/lugares/' + f;
  const hits = sources
    .filter((s) => fs.readFileSync(s, 'utf8').includes(f))
    .map((s) => path.relative(process.cwd(), s).replace(/\\/g, '/'));
  return { archivo: f, referenciada: hits.length > 0, en: hits.join(', ') };
});

console.log('=== COBERTURA DE IMÁGENES DE public/images/lugares ===');
for (const r of rows) {
  console.log(`${r.referenciada ? 'OK  ' : 'FALTA'}  ${r.archivo.padEnd(45)} ${r.en}`);
}

const sinUsar = rows.filter((r) => !r.referenciada);
console.log(`\nTotal: ${rows.length} | referenciadas: ${rows.length - sinUsar.length} | sin usar: ${sinUsar.length}`);

// 4) Referencias rotas: toda URL /images/... del código debe existir
const refs = new Set();
for (const m of corpus.matchAll(/'(\/images\/[^']+\.(?:jpg|jpeg|png|webp|svg))'/gi)) refs.add(m[1]);
const rotas = [...refs].filter((u) => !fs.existsSync(path.join(process.cwd(), 'public', u.replace(/^\//, ''))));
console.log(`\n=== REFERENCIAS /images/ EN EL CÓDIGO ===`);
console.log(`Total: ${refs.size} | rotas: ${rotas.length}`);
for (const r of rotas) console.log('  ROTA ' + r);

// 5) Verificar que las portadas estén como primera imagen de su registro
console.log('\n=== PORTADAS COMO IMAGEN PRINCIPAL ===');
for (const f of files.filter((x) => /portada/i.test(x))) {
  // buscar el array images: [...] que contiene ese archivo y ver si va primero
  const idx = corpus.indexOf(f);
  const before = corpus.slice(Math.max(0, idx - 400), idx);
  const arrayStart = before.lastIndexOf('images: [');
  const isFirst = arrayStart === -1 ? null : !before.slice(arrayStart).includes("'");
  console.log(`  ${f.padEnd(38)} primera del array: ${isFirst}`);
}

fs.writeFileSync(
  'shots/img-coverage.json',
  JSON.stringify({ rows, totalRefs: refs.size, rotas }, null, 2),
  'utf8'
);
