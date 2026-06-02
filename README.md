# DevPath.hub

A guided, interactive platform to learn any tech stack from zero — step-by-step
setup guides with "why this step?" explanations, roadmaps, project walkthroughs,
a searchable error solver, and tool comparisons.

Built with **Next.js 16** (App Router, React 19), **Tailwind CSS 4**,
**anime.js 4**, and **Prisma 7 + PostgreSQL**.

## Getting started

```bash
npm install
```

The app runs with **or without** a database. Without `DATABASE_URL` set, it
serves bundled content (`lib/content.ts`). With a database configured, it reads
everything through Prisma (`lib/data.ts`).

```bash
npm run dev      # http://localhost:3000 (or the next free port)
```

## Database setup

The data layer (`lib/data.ts`) reads from Postgres via Prisma when
`DATABASE_URL` is set, and transparently falls back to bundled content
otherwise.

### Option A — Hosted Postgres (recommended for reliability)

Create a free database at [Neon](https://neon.tech) (or any Postgres), then:

```bash
# .env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"

npm run db:push     # create tables from prisma/schema.prisma
npm run db:seed     # load the content from lib/content.ts
npm run dev
```

### Option B — Local Postgres via `prisma dev` (no Docker, no account)

Prisma 7 ships a local Postgres dev server. Note it's a preview tool and can be
flaky; if connections drop, recreate it with `npx prisma dev rm devpath` then
the start command below.

```bash
npm run db:start                 # starts a local server named "devpath"
npx prisma dev ls                # copy the direct TCP url into .env as DATABASE_URL
npm run db:push
npm run db:seed
npm run dev
```

### Useful scripts

| Script | What it does |
| --- | --- |
| `npm run db:push` | Sync the schema to the database (no migration history) |
| `npm run db:seed` | Load `lib/content.ts` into the database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:generate` | Regenerate the Prisma client (`lib/generated/prisma`) |

## Notes for Prisma 7

- The datasource connection lives in `prisma.config.ts`, **not** in
  `schema.prisma` (Prisma 7 removed `url` from the schema).
- The client is generated to `lib/generated/prisma` (gitignored) and is
  imported via `lib/prisma.ts`, which wires up the `@prisma/adapter-pg` driver
  adapter (Prisma 7 has no Rust engine).
- To target the spec's **MySQL** in production: change the datasource provider
  to `mysql`, replace the Postgres-only `String[]` array fields with a join
  table or JSON, and run a fresh migration.

## Deploy

Deploy on [Vercel](https://vercel.com/new) and set `DATABASE_URL` to a hosted
Postgres (Neon/Supabase/etc.). Run `db:push` + `db:seed` against it once.
