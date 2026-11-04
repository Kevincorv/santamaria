const BASE = process.env.BASE || 'https://santamaria-azure.vercel.app';

const paths = [
  '/api',
  '/api/',
  '/api/health',
  '/api/export',
  '/api/auth',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/content',
  '/api/content/places',
  '/api/content/places/delete',
  '/api/provider-requests',
  '/api/a/b/c',
];

for (const p of paths) {
  for (const method of ['GET', 'POST']) {
    if (method === 'POST' && !/login|logout|delete|content|provider/.test(p)) continue;
    try {
      const res = await fetch(BASE + p + '?cb=' + Date.now(), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method === 'POST' ? '{}' : undefined,
      });
      const text = await res.text();
      console.log(
        `${method} ${p.padEnd(28)} -> ${res.status} | ${res.headers.get('content-type') || '-'} | ${JSON.stringify(text.slice(0, 90))}`
      );
    } catch (e) {
      console.log(`${method} ${p.padEnd(28)} -> ERR ${e.message}`);
    }
  }
}
