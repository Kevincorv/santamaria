/**
 * Prueba real de las operaciones del backend de administración contra la
 * base de datos configurada (TiDB Cloud). Crea un registro de prueba, lo lee,
 * lo edita, lo elimina y verifica que no queden residuos.
 *
 * Requiere el API levantada (node server/index.js).
 */
const BASE = process.env.API || 'http://127.0.0.1:4000/api';
const USER = process.env.ADMIN_USER || 'admin';
const PASS = process.env.ADMIN_PASS || '';

const fs = (await import('node:fs')).default;

const out = [];
const ok = (name, pass, detail = '') => {
  out.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  :: ' + detail : ''}`);
};

const TEST_ID = `__smf_test_${Date.now()}__`;

const req = async (path, opts = {}, token) => {
  const res = await fetch(BASE + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });
  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, body };
};

/* ---------- 1. Salud del servicio ---------- */
try {
  const h = await req('/health');
  ok('GET /api/health responde', h.status === 200, `status=${h.status} ${JSON.stringify(h.body).slice(0, 120)}`);
  ok('Motor de datos reportado', Boolean(h.body && (h.body.driver || h.body.ok)), JSON.stringify(h.body).slice(0, 120));
} catch (e) {
  ok('GET /api/health responde', false, String(e.message).slice(0, 150));
}

/* ---------- 2. Acceso sin autenticación debe rechazarse ---------- */
const anon = await req('/content/places');
ok('GET /api/content/:type sin token -> 401', anon.status === 401, `status=${anon.status}`);

/* ---------- 3. Login ---------- */
let token = null;
if (PASS) {
  const login = await req('/auth/login', { method: 'POST', body: JSON.stringify({ username: USER, password: PASS }) });
  token = login.body?.token || login.body?.sessionToken || login.body?.data?.token || null;
  ok('POST /api/auth/login', login.status === 200 && Boolean(token), `status=${login.status} token=${token ? 'OK' : 'ausente'} ${JSON.stringify(login.body).slice(0, 120)}`);
} else {
  console.log('SKIP  Login (no se definió ADMIN_PASS)');
}

if (!token) {
  console.log('\nNo hay sesión: se omite la prueba de CRUD autenticado.');
  fs.writeFileSync('shots/api-report.json', JSON.stringify(out, null, 2));
  process.exit(0);
}

/* ---------- 4. READ ---------- */
const read = await req('/content/places', {}, token);
ok('GET /api/content/places (lectura)', read.status === 200 && Array.isArray(read.body?.items), `status=${read.status} items=${read.body?.items?.length ?? 'n/d'}`);

/* ---------- 5. CREATE ---------- */
const payload = {
  id: TEST_ID,
  slug: TEST_ID,
  name: 'REGISTRO DE PRUEBA - ELIMINAR',
  category: 'servicios',
  shortDescription: 'Registro temporal creado por la prueba automatizada.',
  description: 'Registro temporal creado por la prueba automatizada. No publicar.',
  images: [],
  address: { city: 'Santa María de Fe', region: 'Misiones', country: 'Paraguay' },
  verificationStatus: { status: 'pending', lastChecked: '2026-11-03', source: 'prueba automatizada' },
  lastUpdated: '2026-11-03',
  sources: [],
};
const created = await req('/content/places', { method: 'POST', body: JSON.stringify({ data: payload }) }, token);
ok('POST /api/content/places (creación)', created.status === 200 && created.body?.ok === true, `status=${created.status} ${JSON.stringify(created.body).slice(0, 120)}`);

/* ---------- 6. READ tras crear ---------- */
const readAfterCreate = await req('/content/places', {}, token);
const foundAfterCreate = (readAfterCreate.body?.items || []).find((i) => i.id === TEST_ID);
ok('El registro creado se puede leer', Boolean(foundAfterCreate), foundAfterCreate ? `encontrado: ${foundAfterCreate.data?.name}` : 'no aparece en el listado');

/* ---------- 7. EDIT ---------- */
const edited = { ...payload, name: 'REGISTRO DE PRUEBA (editado)', shortDescription: 'Texto editado por la prueba.' };
const editRes = await req('/content/places', { method: 'POST', body: JSON.stringify({ data: edited }) }, token);
ok('POST /api/content/places (edición)', editRes.status === 200 && editRes.body?.ok === true, `status=${editRes.status}`);

const readAfterEdit = await req('/content/places', {}, token);
const foundAfterEdit = (readAfterEdit.body?.items || []).find((i) => i.id === TEST_ID);
ok('La edición persistió', Boolean(foundAfterEdit) && /editado/i.test(foundAfterEdit.data?.name || ''), foundAfterEdit ? `name=${foundAfterEdit.data?.name}` : 'no encontrado');

/* ---------- 8. DELETE ---------- */
const del = await req('/content/places/delete', { method: 'POST', body: JSON.stringify({ id: TEST_ID }) }, token);
ok('POST /api/content/places/delete (baja)', del.status === 200 && del.body?.ok === true, `status=${del.status} ${JSON.stringify(del.body).slice(0, 120)}`);

const readAfterDelete = await req('/content/places', {}, token);
const stillThere = (readAfterDelete.body?.items || []).find((i) => i.id === TEST_ID);
ok('El registro fue eliminado (sin residuos)', !stillThere, stillThere ? 'AÚN EXISTE' : 'confirmado');

/* ---------- 9. Exportación ---------- */
const exp = await req('/export', {}, token);
ok('GET /api/export (exportación)', exp.status === 200 && Boolean(exp.body?.content), `status=${exp.status}`);

/* ---------- 10. Logout ---------- */
const logout = await req('/auth/logout', { method: 'POST' }, token);
ok('POST /api/auth/logout', logout.status === 200, `status=${logout.status}`);

const afterLogout = await req('/content/places', {}, token);
ok('La sesión deja de ser válida tras logout', afterLogout.status === 401, `status=${afterLogout.status}`);

fs.writeFileSync('shots/api-report.json', JSON.stringify(out, null, 2));
const failed = out.filter((r) => !r.pass);
console.log(`\n=== ${out.length - failed.length}/${out.length} comprobaciones OK ===`);
if (failed.length) {
  console.log('FALLAS:');
  for (const f of failed) console.log(`  - ${f.name}: ${f.detail}`);
  process.exit(1);
}
