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

- **[Architecture & folder structure](docs/ARCHITECTURE.md)** — project layout and how client/server/build align.
- **[Deploy to AWS](docs/DEPLOY-AWS.md)** — EC2, Docker, Elastic Beanstalk, Supabase (configure last).
- **[Connect DB + EC2 + your domain](docs/CONNECT-DB-EC2-DOMAIN.md)** — Supabase setup, host on EC2, point Hostinger domain to EC2, Nginx, HTTPS.

## Environment

Copy `.env.example` to `.env` and set `PORT` (optional). Set `DATABASE_URL` when using Supabase/Postgres and running `db:push` or a DB-backed storage.
