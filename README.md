# PlanIt

Marketplace de bienes y servicios para organizar eventos: una sola app donde
las personas pueden descubrir propuestas de distintas empresas y armar su
evento de punta a punta.

Monorepo con npm workspaces:

```
apps/
  api/   # Backend (Express + MikroORM + PostgreSQL/Supabase)
  web/   # Frontend (React + TypeScript + Vite)
```

Ver el detalle de cada app en [apps/api](apps/api) y [apps/web](apps/web/README.md).

## Requisitos

* Node.js 20+
* Una base PostgreSQL (se usa Supabase en desarrollo/producción)

## Puesta en marcha

```bash
npm install
# crear un .env en la raíz con JWT_SECRET, DATABASE_URL, etc. (ver apps/api/src/config)
npm run dev            # levanta api (puerto 4000) y web (Vite) en paralelo
```

Cada app también se puede correr por separado con `npm run dev -w api` o
`npm run dev -w web`.

## Scripts útiles

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Corre API y web en paralelo |
| `npm run build -w api` | Compila el backend a `apps/api/dist` |
| `npm run build -w web` | Build de producción del frontend |
| `npm run test -w api` | Tests del backend (Vitest) |
| `npm run test -w web` | Tests del frontend (Vitest) |
| `npm run db:check -w api` | Verifica la conexión a la base de datos |
| `npm run seed:demo -w api` | Carga datos de ejemplo |

## Base de datos

El esquema vive en [apps/api/src/migrations](apps/api/src/migrations); ver el
README de esa carpeta para el detalle de cómo aplicarlo.

## Despliegue

El proyecto se despliega en Vercel según [vercel.json](vercel.json): la API
como servicio Express y el frontend como build de Vite, con `/api/*`
enrutado al backend.

## Propuesta académica

Este proyecto nace como Trabajo Práctico de la materia Desarrollo de
Software (UTN). El detalle del alcance funcional está en
[PROPOSAL.md](PROPOSAL.md).
