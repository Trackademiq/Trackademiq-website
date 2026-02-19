import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = new pg.Pool({ connectionString });
  return drizzle(pool, { schema });
}

export type DrizzleDb = ReturnType<typeof getDb>;
