# Deploying Trackademiq-Webpage to AWS (Free Tier)

This app is ready to run **locally** and on **AWS**. Configure **Supabase** (or any Postgres) when you need persistent database storage.

**For a single guide that covers database (Supabase), EC2 hosting, and pointing your Hostinger domain to EC2 (with Nginx and HTTPS), see [Connect DB + EC2 + Domain](CONNECT-DB-EC2-DOMAIN.md).**

---

## 1. Local development

```bash
cp .env.example .env   # optional: set PORT, DATABASE_URL when using DB
npm install
npm run dev
```

- App: http://localhost:5000  
- API: http://localhost:5000/api/...

---

## 2. Production build (local or server)

```bash
npm run build
npm run start
```

- Serves from `dist/`: `dist/index.cjs` (server) and `dist/public/` (client).

---

## 3. AWS options (free tier friendly)

### Option A: EC2

1. Launch an **Amazon Linux 2** or **Ubuntu** instance (t2.micro / t3.micro).
2. Install Node 20:  
   - [NodeSource](https://github.com/nodesource/distributions) or use **nvm**.
3. On the instance:
   ```bash
   cd /home/ec2-user
   git clone <your-repo> trackademiq-webpage && cd trackademiq-webpage
   npm ci
   npm run build
   PORT=5000 npm run start
   ```
4. Security group: allow **Inbound** TCP **80** (and **22** for SSH). Use Nginx or a reverse proxy to forward port 80 → 5000, or set `PORT=80` and run the app with appropriate permissions.
5. Optional: use **pm2** or **systemd** to keep the process running and restart on reboot.

### Option B: Docker on EC2

```bash
docker build -t trackademiq-webpage .
docker run -d -p 5000:5000 -e PORT=5000 --name app trackademiq-webpage
```

Use Nginx in front or map port 80 to 5000.

### Option C: AWS Elastic Beanstalk (Docker or Node)

- **Docker**: Add the project’s `Dockerfile`; Elastic Beanstalk will build and run it. Set `PORT=8080` in the environment (EB often uses 8080).
- **Node**: Use a `Procfile` or platform default to run `npm run start` after `npm run build`. Set `PORT` as required by the platform.

### Option D: ECS (Fargate)

- Build the image with the included `Dockerfile`.
- Push to **Amazon ECR**.
- Create a Fargate service and task definition that runs the image and exposes the container port (e.g. 5000). Set `PORT` in the task environment if needed.

---

## 4. Environment variables on AWS

| Variable        | When to set | Example / note                          |
|----------------|-------------|----------------------------------------|
| `PORT`         | Always      | `5000` or `8080` (per platform)        |
| `NODE_ENV`     | Optional    | Set to `production` (often default)    |
| `DATABASE_URL` | When using DB | Supabase connection string (see below) |

---

## 5. Supabase (database) — configure last

When you’re ready to use a real database:

1. Create a project in [Supabase](https://supabase.com).
2. In **Settings → Database**, copy the **Connection string** (URI).
3. Set `DATABASE_URL` in your environment (e.g. on EC2 in `~/.bashrc`, systemd unit, or Elastic Beanstalk/ECS environment):
   ```bash
   export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
   ```
4. Run migrations / push schema (from your machine or a one-off task):
   ```bash
   npm run db:push
   ```
5. Switch the app from in-memory storage to a Postgres-backed storage implementation that uses `DATABASE_URL` (e.g. Drizzle + Supabase). The schema in `shared/schema.ts` is already compatible with Postgres.

Until then, the app runs with **in-memory storage** and does not require `DATABASE_URL` for normal runs.

---

## 6. Checklist

- [ ] Replit-specific code removed; app runs locally with `npm run dev` and `npm run start`.
- [ ] `.env.example` present; copy to `.env` and set `PORT` (and `DATABASE_URL` when using DB).
- [ ] `npm run build` produces `dist/index.cjs` and `dist/public/`.
- [ ] Dockerfile builds and runs with `node dist/index.cjs`.
- [ ] On AWS: `PORT` set to the value expected by your platform (e.g. 8080 for Elastic Beanstalk).
- [ ] Supabase (or other Postgres) and `DATABASE_URL` configured only when you add persistent storage.
