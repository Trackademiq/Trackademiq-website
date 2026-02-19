# Trackademiq-Webpage — Architecture & Folder Structure

This document describes the project layout and how it is aligned for **local development** and **AWS deployment**. The app no longer depends on Replit.

---

## Folder structure

```
Trackademiq-Webpage/
├── client/                    # Frontend (React + Vite)
│   ├── index.html             # Entry HTML
│   ├── public/                # Static assets (robots.txt, sitemap, manifest, etc.)
│   └── src/
│       ├── main.tsx           # React entry
│       ├── App.tsx             # Root component & routing
│       ├── index.css           # Global styles
│       ├── components/         # Reusable UI
│       │   ├── ui/             # Base UI (shadcn-style)
│       │   └── chat-widget.tsx
│       ├── pages/              # Route-level pages (landing, pricing, contact, etc.)
│       ├── hooks/              # useToast, useMobile
│       └── lib/                # queryClient, utils
│
├── server/                     # Backend (Express + Node)
│   ├── index.ts                # App entry, middleware, PORT binding
│   ├── routes.ts               # API routes (e.g. /api/demo-requests)
│   ├── static.ts               # Serves dist/public in production
│   ├── storage.ts              # In-memory storage (swap for Supabase/Postgres later)
│   └── vite.ts                 # Vite dev middleware (dev only)
│
├── shared/                     # Code shared by client & server
│   └── schema.ts               # Drizzle schema + Zod schemas (users, demo_requests)
│
├── script/
│   └── build.ts                # Builds client (Vite) + server (esbuild) → dist/
│
├── docs/
│   ├── ARCHITECTURE.md         # This file
│   └── DEPLOY-AWS.md           # AWS deployment guide
│
├── dist/                       # Build output (git-ignored)
│   ├── index.cjs               # Bundled server
│   └── public/                 # Built client (HTML, JS, CSS, assets)
│
├── .env.example                # Template: PORT, DATABASE_URL (optional)
├── .dockerignore
├── Dockerfile                  # Production image for local/AWS
├── drizzle.config.ts           # Drizzle Kit config (Postgres/Supabase)
├── package.json
├── tsconfig.json
├── vite.config.ts              # Vite config (no Replit plugins)
```
```

---

## How it fits together

| Layer        | Role |
|-------------|------|
| **client/** | React SPA. Vite dev server is proxied by Express in dev; in production, static files are served from `dist/public`. |
| **server/** | Express app: API routes, JSON body, error handler, then either Vite middleware (dev) or `serveStatic` (production). Listens on `PORT` (default 5000), `host: "0.0.0.0"`. |
| **shared/** | Drizzle schema and Zod validation used by server (and by Drizzle Kit for migrations). Client does not import server-only code. |
| **script/build.ts** | Runs Vite build → `dist/public`, then esbuild of `server/index.ts` → `dist/index.cjs`. Production runs `node dist/index.cjs`. |
| **static.ts** | In production, serves `path.resolve(__dirname, "public")`; with bundle at `dist/index.cjs`, `__dirname` is `dist/`, so it correctly serves `dist/public`. |

---

## Data flow

- **API**: Client uses relative URLs (e.g. `POST /api/demo-requests`) so the same origin works locally and on AWS.
- **Storage**: Currently `server/storage.ts` is in-memory (`MemStorage`). When you add Supabase, introduce a Postgres-backed storage that uses `DATABASE_URL` and keep the same `IStorage` interface so routes do not need structural changes.
- **Schema**: `shared/schema.ts` defines tables and insert schemas. Use `npm run db:push` with `DATABASE_URL` set (e.g. Supabase) when you enable the database.

---

## Alignment checklist

- [x] Single entry: `server/index.ts` → `dist/index.cjs`.
- [x] Client build output: `dist/public` (Vite `outDir` and `static.ts` both use this).
- [x] No Replit-specific code in Vite or runtime; scripts use `cross-env` for Windows/Linux.
- [x] Port and host configurable via `PORT` and `host: "0.0.0.0"` for AWS.
- [x] Dockerfile builds and runs the same `dist/` layout.
- [x] Supabase/Postgres is optional; configure `DATABASE_URL` and storage when ready.

---

## Optional cleanup

- **.replit**: Safe to delete; it is not used for local or AWS. Kept only if you still open the project on Replit for reference.
