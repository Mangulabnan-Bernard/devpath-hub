import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7 moved the datasource connection out of schema.prisma into this file.
// `prisma migrate`, `prisma db`, and `prisma studio` read the URLs from here.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
