import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 (no Rust engine) connects through a driver adapter. We use the
// PostgreSQL adapter with the connection string from DATABASE_URL. The same
// adapter works against the local `prisma dev` server and a hosted Postgres
// (e.g. Neon), so nothing changes when moving to production.
//
// When DATABASE_URL is unset, `prisma` is null and the data layer falls back to
// the bundled content (see lib/data.ts), so the app still runs with no database.

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient | null = connectionString
  ? (globalForPrisma.prisma ??
    new PrismaClient({ adapter: new PrismaPg({ connectionString, max: 6 }) }))
  : null;

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
