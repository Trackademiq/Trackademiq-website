# Trackademiq-Webpage

Marketing and product site for Trackademiq (AI-powered Education ERP). Runs **locally** or on **AWS**; database (Supabase) is configured when you need persistent storage.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5000.

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Development server (Vite + Express) |
| `npm run build`| Production build → `dist/`     |
| `npm run start`| Run production server          |
| `npm run db:push` | Push schema to DB (requires `DATABASE_URL`, e.g. Supabase) |

## Docs

- **[Deploy & run](docs/DEPLOY.md)** — go live on EC2, domain, HTTPS, troubleshooting.
- **[Architecture](docs/ARCHITECTURE.md)** — project layout and client/server/build.

## Environment

Copy `.env.example` to `.env` and set `PORT` (optional). Set `DATABASE_URL` when using Supabase/Postgres and running `db:push` or a DB-backed storage.
