import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Required when running db:push or migrations. Use your Supabase (or other Postgres) connection string.
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is required for database commands. Set it in .env (e.g. Supabase connection string)."
  );
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
