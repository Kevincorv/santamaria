/** Sondeo de solo lectura: salud del API y usuarios existentes (sin mutaciones). */
const BASE = process.env.API || 'http://127.0.0.1:4000/api';

const h = await fetch(BASE + '/health').then((r) => r.json());
console.log('HEALTH:', JSON.stringify(h));

// Consulta directa al store para saber si hay usuarios, sin crear nada.
const { getStore } = await import('../server/db.js');
const { loadEnv } = await import('../server/config.js');
loadEnv();
const store = await getStore();
console.log('driver:', store.driver);

if (typeof store.listUsers === 'function') {
  const users = await store.listUsers();
  console.log('usuarios:', JSON.stringify(users?.map((u) => u.username) ?? users));
} else {
  // Algunas implementaciones exponen solo getUser por nombre.
  for (const name of ['admin', 'administrador', 'root', 'santamaria']) {
    const u = await store.getUser(name);
    console.log(`getUser(${name}):`, u ? `EXISTE (username=${u.username})` : 'no existe');
  }
}
await store.close();
