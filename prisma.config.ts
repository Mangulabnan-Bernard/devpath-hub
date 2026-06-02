import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 moved the datasource connection out of schema.prisma into this file.
// `prisma migrate`, `prisma db`, and `prisma studio` read the URL from here.
//
// We use `process.env.DATABASE_URL` (not Prisma's `env()` helper) so that
// `prisma generate` — which runs in CI/`postinstall` and does NOT need a
// database — won't crash when the variable isn't present at install time.
// Commands that actually touch the database still require it to be set.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
