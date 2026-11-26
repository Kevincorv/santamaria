import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'public', 'images', 'lugares');
const files = fs.readdirSync(root).filter((f) => fs.statSync(path.join(root, f)).isFile());

// Dimensiones leyendo cabeceras de JPEG/PNG (sin dependencias)
function sizeOf(file) {
  const buf = fs.readFileSync(file);
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    // PNG
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), fmt: 'png' };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5), fmt: 'jpeg' };
      }
      i += 2 + len;
    }
    return { w: 0, h: 0, fmt: 'jpeg' };
  }
  return { w: 0, h: 0, fmt: 'desconocido' };
}

const out = files.map((f) => {
  const full = path.join(root, f);
  const st = fs.statSync(full);
  const d = sizeOf(full);
  return {
    archivo: f,
    base: path.parse(f).name,
    ext: path.parse(f).ext,
    kb: Math.round(st.size / 1024),
    ancho: d.w,
    alto: d.h,
    ratio: d.w && d.h ? +(d.w / d.h).toFixed(2) : null,
    portada: /portada/i.test(f),
  };
});

console.log(JSON.stringify(out, null, 2));
console.log('\nTOTALES:', out.length, '| portadas:', out.filter((x) => x.portada).length);
