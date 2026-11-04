/**
 * /api/content/:type — gestión de contenido del panel de administración.
 *   GET  /api/content/:type → listado (requiere sesión)
 *   POST /api/content/:type → creación o edición (requiere sesión)
 *
 * Tipos válidos: places, accommodations, restaurants, celebrations, crafts,
 * experiences, tours, provider_requests (ver CONTENT_TYPES en server/db.js).
 *
 * Ver server/app.js para la implementación; no duplica lógica.
 */
export { default } from '../../server/api-handler.js'
