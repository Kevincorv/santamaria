# Backend de administración — Santa María de Fe Digital

Servidor **Node.js** real con base de datos, autenticación y API REST para el
panel de administración del portal. No simula persistencia ni login: todo se
guarda y valida en el servidor.

## Motores de datos disponibles

| Motor | Descripción | Cuándo usarlo |
|-------|-------------|----------------|
| `sqlite` (por defecto) | Base de datos local en `server/data/santamaria.sqlite` usando el módulo integrado `node:sqlite` de Node.js 22+. Sin dependencias nativas ni configuración. | Desarrollo, pruebas y despliegues sencillos. |
| `tidb` | TiDB Cloud (compatible con MySQL) vía `mysql2` con TLS. | Cuando se quiere una base de datos en la nube, escalable y compartida. |

Ambos motores implementan la misma interfaz (`server/db.js`), por lo que el
resto del servidor y el panel no cambian al alternar entre uno y otro.

## Requisitos

- Node.js 22 o superior (probado con Node 24).
- Para TiDB Cloud: un clúster activo y su certificado raíz TLS.

## Instalación

```bash
cd server
npm install
```

## Configuración

```bash
cp .env.example .env
# Editá .env según el motor que elijas (ver comentarios del archivo)
```

### SQLite local (por defecto)

No requiere nada más. La base se crea automáticamente en `server/data/`.

### TiDB Cloud

1. Creá un clúster en [TiDB Cloud](https://tidbcloud.com/).
2. Descargá el certificado raíz TLS (`isqlroot.pem`).
3. En `.env` definí:

```env
DB_DRIVER=tidb
TIDB_HOST=gateway01.<region>.tidbcloud.com
TIDB_PORT=4000
TIDB_USER=<usuario>
TIDB_PASSWORD=<contraseña>
TIDB_DATABASE=<base>
TIDB_CA_FILE=/ruta/al/isqlroot.pem
```

## Crear el usuario administrador

Opción interactiva:

```bash
npm run create-user
```

Opción no interactiva:

```bash
node create-user.js admin "TuContraseñaSegura"
```

También podés definir `ADMIN_USER` y `ADMIN_INITIAL_PASSWORD` en `.env` para
que el servidor cree el usuario en el primer arranque (y luego eliminar esas
variables).

## Iniciar el servidor

```bash
npm start
```

La API queda disponible en `http://localhost:4000/api`.

## API

Todas las respuestas son JSON. Las rutas protegidas requieren
`Authorization: Bearer <token>` (token obtenido en `login`).

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Estado del servicio y motor activo |
| POST | `/api/auth/login` | `{username, password}` → `{token}` |
| POST | `/api/auth/logout` | Cierra la sesión |
| GET | `/api/content/:type` | Lista registros de un tipo |
| POST | `/api/content/:type` | Crea o actualiza `{data}` (requiere `data.id`) |
| POST | `/api/content/:type/delete` | Elimina `{id}` |
| GET | `/api/export` | Volcado JSON de todo el contenido |

Tipos soportados: `places`, `accommodations`, `restaurants`, `celebrations`,
`crafts`, `experiences`, `tours`.

## Seguridad

- Contraseñas con `scrypt` (módulo criptográfico de Node.js).
- Tokens de sesión aleatorios con expiración configurable.
- Retardo ante intentos fallidos de login.
- El directorio `server/data/` queda protegido con `.htaccess` si el proyecto
  se sirve desde Apache/WampServer.
- **Nunca** se guardan credenciales en el frontend: el panel solo conserva el
  token de sesión en la pestaña del navegador.

## Nota sobre la publicación del contenido

El frontend público consume los archivos TypeScript de `src/data/`. El panel
administra el contenido en la base de datos; el volcado `GET /api/export`
devuelve JSON en la misma forma para poder sincronizarlo con `src/data` cuando
se desee automatizar el proceso de publicación.
