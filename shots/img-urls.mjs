import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'public', 'images', 'lugares');
const files = fs.readdirSync(root).filter((f) => fs.statSync(path.join(root, f)).isFile());

const rows = files.map((f) => {
  const bytes = Buffer.from(f, 'utf8');
  return {
    nombreEnDisco: f,
    hex: bytes.toString('hex').slice(0, 60),
    urlRelativa: '/images/lugares/' + encodeURIComponent(f),
    tieneNoAscii: /[^\x00-\x7F]/.test(f),
  };
});

fs.writeFileSync('shots/img-urls.json', JSON.stringify(rows, null, 2), 'utf8');
console.log('escrito shots/img-urls.json (' + rows.length + ')');
console.log('con caracteres no ASCII:', rows.filter((r) => r.tieneNoAscii).length);
