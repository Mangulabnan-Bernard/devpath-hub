import type { Tech, Challenge } from "./types";

// Canonical content for DevPath.hub. Used to seed the database (prisma/seed.ts)
// and as an offline fallback when DATABASE_URL is not set (lib/data.ts).

export const techContent: Tech[] = [
  {
    id: "tech-nextjs",
    name: "Next.js",
    slug: "nextjs",
    description:
      "The React framework for production. Build full-stack web apps with server rendering, file-based routing, and a first-class developer experience.",
    tagline: "The React Framework for the Web",
    iconEmoji: "▲",
    color: "#000000",
    isFeatured: true,
    stats: { learners: "48k", guides: 12, projects: 6 },
    setupGuide: {
      title: "Next.js Setup Guide",
      description:
        "Go from an empty folder to a running Next.js app. Every command is explained — what it does, why you need it, and how to confirm it worked.",
      steps: [
        {
          id: "ns-1",
          order: 1,
          title: "Install Node.js",
          command: "# Download the LTS installer from https://nodejs.org",
          explanation:
            "Node.js is a JavaScript runtime — it lets your computer run JavaScript outside of a browser. It also ships with npm, the package manager you'll use to install everything else.",
          why: "Next.js is a Node.js program. Without Node installed, none of the `npx`/`npm` commands below will exist on your machine.",
          alternatives: "Use a version manager like nvm (Mac/Linux) or fnm (cross-platform) to switch Node versions per project.",
          verification: "Run `node -v`. You should see something like v20.x or newer.",
          eli5: "Node.js is like a kitchen that lets your computer 'cook' JavaScript. npm is the grocery delivery that brings in ingredients (packages).",
        },
        {
          id: "ns-2",
          order: 2,
          title: "Install a code editor",
          command: "# Download VS Code from https://code.visualstudio.com",
          explanation:
            "VS Code is a free, lightweight editor with excellent TypeScript, React, and Next.js support out of the box.",
          why: "You'll spend most of your time here. Good autocomplete and inline errors dramatically speed up learning.",
          alternatives: "WebStorm, Cursor, Zed, or Neovim — any editor with a TypeScript language server works.",
          verification: "Open VS Code and create a new file. If it opens, you're good.",
          eli5: "An editor is your desk and tools. VS Code is a popular, free desk that already has helpful gadgets attached.",
        },
        {
          id: "ns-3",
          order: 3,
          title: "Create a Next.js app",
          command: "npx create-next-app@latest my-app",
          explanation:
            "`create-next-app` scaffolds a complete project: folder structure, config files, and example code, all wired together correctly.",
          why: "Setting up bundling, routing, and TypeScript by hand is error-prone. This is the officially supported, batteries-included starting point.",
          alternatives: "`pnpm create next-app` or `yarn create next-app` if you prefer those package managers.",
          verification: "A new `my-app` folder appears with a `package.json` inside it.",
          eli5: "It's like ordering a pre-built LEGO starter set instead of hunting for each brick yourself.",
        },
        {
          id: "ns-4",
          order: 4,
          title: "Start the dev server",
          command: "cd my-app\nnpm run dev",
          explanation:
            "This launches a local development server with hot reloading — changes you save appear in the browser instantly.",
          why: "You need a running server to see and test your app while you build it.",
          alternatives: "`npm run build && npm start` runs the optimized production build instead of the dev server.",
          verification: "Open http://localhost:3000 — you should see the Next.js welcome page.",
          eli5: "This turns on a tiny private copy of your website that only your computer can see while you work on it.",
        },
        {
          id: "ns-5",
          order: 5,
          title: "Install Git",
          command: "# Download from https://git-scm.com",
          explanation:
            "Git is version control — it tracks the history of your code so you can undo mistakes and collaborate. `create-next-app` already initializes a Git repository for you.",
          why: "You'll need Git to push to GitHub, deploy to Vercel, and recover from mistakes. Most hosting and CI tools assume your project is a Git repo.",
          alternatives: "GitHub Desktop or your editor's built-in Git UI if you prefer not to use the command line.",
          verification: "Run `git --version`. You should see a version number.",
          eli5: "Git is a time machine for your code — it saves snapshots so you can always travel back if something breaks.",
        },
        {
          id: "ns-6",
          order: 6,
          title: "Understand the project structure",
          explanation:
            "Key folders: `app/` holds your routes (each folder = a URL, `page.tsx` = the page). `public/` holds static files like images. `next.config.ts` configures the framework. `package.json` lists your dependencies and scripts.",
          why: "Knowing where things live saves hours of confusion later — you'll know exactly where to add a page, an image, or a setting.",
          verification: "Open the `app` folder and find `page.tsx` and `layout.tsx` — those render the homepage you just saw.",
          eli5: "It's like learning which drawer holds the forks before you cook — `app/` is your pages drawer, `public/` is your pictures drawer.",
        },
        {
          id: "ns-7",
          order: 7,
          title: "Deploy to the web",
          command: "# Push to GitHub, then import the repo at https://vercel.com/new",
          explanation:
            "Push your code to GitHub and connect the repo to Vercel. Every push then builds and deploys automatically, with a unique preview URL for each pull request.",
          why: "Deploying early means you always have a shareable live link, and you catch build-only problems before they pile up.",
          alternatives: "Netlify, Cloudflare Pages, Railway, or a self-hosted Node server / Docker container.",
          verification: "Vercel gives you a `*.vercel.app` URL — open it and your app is live on the internet.",
          eli5: "This is opening your shop to the public — anyone with the link can now visit your site.",
        },
      ],
    },
    roadmaps: [
      {
        id: "rm-nextjs-foundations",
        title: "Next.js Foundations",
        description: "The core mental model: routing, components, and data — the 20% that unlocks 80% of Next.js.",
        level: "BEGINNER",
        steps: [
          {
            id: "rs-1",
            order: 1,
            title: "What is Next.js (and why use it)?",
            content:
              "Next.js is a framework built on top of React. React gives you components; Next.js adds the *application* concerns around them: routing, rendering strategies (server vs. client), data fetching, and bundling — all pre-wired so you can focus on features.",
            eli5Content:
              "React is the engine. Next.js is the whole car built around that engine — wheels, seats, and steering already attached so you can just drive.",
          },
          {
            id: "rs-2",
            order: 2,
            title: "File-based routing with the App Router",
            content:
              "Folders inside `app/` become URL segments. A `page.tsx` makes a route public, and `layout.tsx` wraps everything beneath it. A folder like `[slug]` becomes a dynamic segment.",
            eli5Content:
              "Your folders ARE your menu. A folder named `about` automatically becomes the `/about` page — no manual route list to maintain.",
            codeSnippet:
              "// app/blog/[slug]/page.tsx\nexport default async function Page({\n  params,\n}: {\n  params: Promise<{ slug: string }>\n}) {\n  const { slug } = await params\n  return <h1>Post: {slug}</h1>\n}",
          },
          {
            id: "rs-3",
            order: 3,
            title: "Server vs. Client Components",
            content:
              "Components are Server Components by default — they render on the server and ship zero JavaScript. Add `'use client'` at the top of a file only when you need interactivity (state, effects, event handlers, browser APIs).",
            eli5Content:
              "Server Components are like a printed newspaper (fast, no batteries). Client Components are like a tablet (interactive, but heavier). Use the newspaper unless you truly need the tablet.",
            codeSnippet:
              "'use client'\nimport { useState } from 'react'\n\nexport function Counter() {\n  const [n, setN] = useState(0)\n  return <button onClick={() => setN(n + 1)}>Clicked {n}</button>\n}",
          },
          {
            id: "rs-4",
            order: 4,
            title: "Fetching data",
            content:
              "Server Components can be `async` and `await` data directly — no `useEffect`, no loading flags. The result is rendered on the server and streamed to the browser.",
            eli5Content:
              "On the server you can just ask for your data and wait for it, like grabbing a book off a shelf, instead of mailing a request and waiting for a reply.",
            codeSnippet:
              "export default async function Page() {\n  const res = await fetch('https://api.example.com/posts')\n  const posts = await res.json()\n  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>\n}",
          },
          {
            id: "rs-5",
            order: 5,
            title: "Navigating with <Link>",
            content:
              "Use the `<Link>` component from `next/link` for navigation. It prefetches pages in the background and does client-side transitions, so moving between pages feels instant.",
            eli5Content:
              "`<Link>` is a smart door: it quietly gets the next room ready before you even reach for the handle.",
            codeSnippet:
              "import Link from 'next/link'\n\n<Link href=\"/blog/hello\">Read the post</Link>",
          },
          {
            id: "rs-6",
            order: 6,
            title: "Styling your app",
            content:
              "Next.js supports Tailwind CSS, CSS Modules, global CSS, and CSS-in-JS. Tailwind is the most popular: utility classes right in your markup. CSS Modules (`*.module.css`) scope class names to a single component so they never collide.",
            eli5Content:
              "Think of styling options as different sets of crayons. Tailwind is a big labelled box you grab from constantly; CSS Modules is a private box that only one drawing can use.",
            codeSnippet:
              "// component.module.css\n.card { padding: 1rem; border-radius: 8px; }\n\n// Component.tsx\nimport styles from './component.module.css'\nexport default () => <div className={styles.card}>Hi</div>",
          },
          {
            id: "rs-7",
            order: 7,
            title: "Shared layouts and templates",
            content:
              "A `layout.tsx` wraps every page beneath it and keeps its state across navigations (great for navbars and sidebars). A `template.tsx` is similar but re-mounts on every navigation — use it when you need a fresh instance each time (e.g. enter animations).",
            eli5Content:
              "A layout is the picture frame that stays on the wall while you swap the photos inside. A template is a frame you take down and rehang every time.",
            codeSnippet:
              "// app/dashboard/layout.tsx\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <section><Sidebar />{children}</section>\n}",
          },
          {
            id: "rs-8",
            order: 8,
            title: "Loading states & streaming with Suspense",
            content:
              "Add a `loading.tsx` next to a page and Next.js shows it instantly while the page's data loads — powered by React Suspense. You can also wrap any slow component in `<Suspense>` to stream the rest of the page immediately.",
            eli5Content:
              "Instead of staring at a blank screen until the whole meal is cooked, the kitchen sends out the bread first and the main course when it's ready.",
            codeSnippet:
              "// app/dashboard/loading.tsx\nexport default function Loading() {\n  return <p>Loading your dashboard…</p>\n}",
          },
          {
            id: "rs-9",
            order: 9,
            title: "Handling errors & not-found",
            content:
              "An `error.tsx` file (a Client Component) catches runtime errors in its segment and shows a fallback with a `reset()` button. A `not-found.tsx` renders when you call `notFound()` or hit an unknown route.",
            eli5Content:
              "`error.tsx` is the airbag that pops out if something crashes, with a button to try again. `not-found.tsx` is the friendly 'this room doesn't exist' sign.",
            codeSnippet:
              "'use client'\n// app/error.tsx\nexport default function Error({ reset }: { reset: () => void }) {\n  return <button onClick={reset}>Try again</button>\n}",
          },
          {
            id: "rs-10",
            order: 10,
            title: "Metadata & SEO",
            content:
              "Export a `metadata` object (or an async `generateMetadata` function) from any page or layout to set the title, description, and Open Graph tags. Next.js injects them into the `<head>` for you — no extra library needed.",
            eli5Content:
              "Metadata is the label on a gift: it tells Google and social sites what's inside before they unwrap it.",
            codeSnippet:
              "export const metadata = {\n  title: 'My Blog',\n  description: 'Thoughts on building for the web',\n}",
          },
          {
            id: "rs-11",
            order: 11,
            title: "Optimizing images & fonts",
            content:
              "Use `next/image` for automatic resizing, lazy loading, and modern formats — it prevents layout shift and slow loads. Use `next/font` to self-host Google Fonts with zero layout shift and no extra network request.",
            eli5Content:
              "`next/image` is a smart photo printer that always makes the right-sized print so pages load fast and don't jump around.",
            codeSnippet:
              "import Image from 'next/image'\n\n<Image src=\"/hero.png\" alt=\"Hero\" width={800} height={400} priority />",
          },
          {
            id: "rs-12",
            order: 12,
            title: "Environment variables & config",
            content:
              "Put secrets in `.env.local` and read them with `process.env.MY_KEY` on the server. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser — never put secrets there. `next.config.ts` controls build-time options like image domains and redirects.",
            eli5Content:
              "`.env.local` is a locked drawer for passwords. Anything you label `NEXT_PUBLIC_` is taped to the outside of the drawer for everyone to read — so keep real secrets inside.",
            codeSnippet:
              "// .env.local\nDATABASE_URL=\"postgresql://...\"\nNEXT_PUBLIC_SITE_NAME=\"DevPath\"\n\n// server code\nconst db = process.env.DATABASE_URL",
          },
        ],
      },
      {
        id: "rm-nextjs-intermediate",
        title: "Going Full-Stack",
        description: "Mutations, route handlers, and talking to a database with Server Actions.",
        level: "INTERMEDIATE",
        steps: [
          {
            id: "ri-1",
            order: 1,
            title: "Server Actions for mutations",
            content:
              "Server Actions are async functions marked with `'use server'`. You can call them straight from a form's `action` prop — no API route needed for simple create/update/delete flows.",
            codeSnippet:
              "// app/actions.ts\n'use server'\nexport async function createTodo(formData: FormData) {\n  const title = formData.get('title')\n  // ...write to the database\n}",
          },
          {
            id: "ri-2",
            order: 2,
            title: "Route Handlers (API endpoints)",
            content:
              "Add a `route.ts` file that exports `GET`, `POST`, etc. to build a JSON API. Use these when something other than your own UI needs the data (webhooks, mobile clients).",
            codeSnippet:
              "// app/api/health/route.ts\nexport async function GET() {\n  return Response.json({ ok: true })\n}",
          },
          {
            id: "ri-3",
            order: 3,
            title: "Caching & revalidation",
            content:
              "Next.js caches aggressively. Learn `revalidatePath`, `revalidateTag`, and the `cache` fetch options so your users see fresh data exactly when they should.",
          },
          {
            id: "ri-4",
            order: 4,
            title: "Connecting a database with Prisma",
            content:
              "Prisma gives you a type-safe client generated from a schema. Define your models, run a migration, then query the database directly inside Server Components and Server Actions. Always use a single shared client instance to avoid exhausting connections in dev.",
            codeSnippet:
              "// lib/prisma.ts\nimport { PrismaClient } from '@prisma/client'\nexport const prisma = globalThis.prisma ?? new PrismaClient()\nif (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma",
          },
          {
            id: "ri-5",
            order: 5,
            title: "Forms with useActionState & validation",
            content:
              "Pair a Server Action with the `useActionState` hook to handle submission, pending state, and validation errors without client-side fetch code. Validate input on the server with a library like Zod before touching your database.",
            codeSnippet:
              "'use client'\nimport { useActionState } from 'react'\nimport { createPost } from './actions'\n\nconst [state, action, pending] = useActionState(createPost, null)\nreturn <form action={action}><button disabled={pending}>Save</button></form>",
          },
          {
            id: "ri-6",
            order: 6,
            title: "Authentication",
            content:
              "Add sign-in with NextAuth/Auth.js: configure providers (GitHub, Google, credentials), then read the session in Server Components with `auth()`. Store sessions in your database via an adapter for persistence across deploys.",
            codeSnippet:
              "// app/page.tsx\nimport { auth } from '@/lib/auth'\nexport default async function Page() {\n  const session = await auth()\n  return <p>{session ? `Hi ${session.user.name}` : 'Sign in'}</p>\n}",
          },
          {
            id: "ri-7",
            order: 7,
            title: "Middleware & route protection",
            content:
              "`middleware.ts` runs before a request completes — perfect for redirecting unauthenticated users, rewriting URLs, or setting headers. Use a `matcher` to limit which routes it runs on so you don't slow down every request.",
            codeSnippet:
              "// middleware.ts\nimport { NextResponse } from 'next/server'\nexport function middleware(req) {\n  if (!req.cookies.get('session')) return NextResponse.redirect(new URL('/login', req.url))\n}\nexport const config = { matcher: ['/dashboard/:path*'] }",
          },
          {
            id: "ri-8",
            order: 8,
            title: "Optimistic UI updates",
            content:
              "The `useOptimistic` hook lets you update the UI instantly while a Server Action runs in the background, then reconcile when it resolves. It makes likes, comments, and todos feel instant even on slow networks.",
            codeSnippet:
              "'use client'\nimport { useOptimistic } from 'react'\nconst [optimisticTodos, addOptimistic] = useOptimistic(todos)",
          },
        ],
      },
      {
        id: "rm-nextjs-advanced",
        title: "Advanced & Production",
        description: "Rendering strategies, performance, and shipping Next.js with confidence.",
        level: "ADVANCED",
        steps: [
          {
            id: "ra-1",
            order: 1,
            title: "Rendering strategies: SSG, ISR, SSR & PPR",
            content:
              "Static (SSG) prebuilds pages at build time. Incremental Static Regeneration (ISR) rebuilds them on a schedule with `revalidate`. Dynamic (SSR) renders per request. Partial Prerendering (PPR) combines a static shell with streamed dynamic holes. Pick per route based on how fresh the data must be.",
            eli5Content:
              "SSG bakes the cake ahead of time. ISR re-bakes it every so often. SSR bakes a fresh one for each guest. PPR serves the pre-baked base and pipes the hot toppings on as they're ready.",
            codeSnippet:
              "// ISR: rebuild this page at most once per hour\nexport const revalidate = 3600",
          },
          {
            id: "ra-2",
            order: 2,
            title: "The caching layers, explained",
            content:
              "Next.js has four caches: the Request Memoization (per render), the Data Cache (persists fetches across requests), the Full Route Cache (static HTML), and the Router Cache (client-side, in memory). Knowing which one is serving stale data is the key to debugging 'why isn't my page updating?'.",
            eli5Content:
              "There are four fridges between your kitchen and the customer. When food looks stale, you have to figure out which fridge it's sitting in.",
          },
          {
            id: "ra-3",
            order: 3,
            title: "Parallel & intercepting routes",
            content:
              "Parallel routes (`@slot` folders) render multiple pages in the same layout at once — great for dashboards. Intercepting routes (`(.)folder`) let you show a route in a modal over the current page while keeping a shareable URL.",
            codeSnippet:
              "app/\n  @team/page.tsx      // parallel slot\n  @analytics/page.tsx // parallel slot\n  layout.tsx          // receives both as props",
          },
          {
            id: "ra-4",
            order: 4,
            title: "Route Handlers & the Edge runtime",
            content:
              "Build APIs with `route.ts` exporting `GET`/`POST`/etc. Opt into the Edge runtime for ultra-low-latency, globally distributed responses — at the cost of a limited Node API surface. Use Node runtime when you need full Node modules.",
            codeSnippet:
              "// app/api/ping/route.ts\nexport const runtime = 'edge'\nexport async function GET() {\n  return Response.json({ pong: true })\n}",
          },
          {
            id: "ra-5",
            order: 5,
            title: "Performance & bundle optimization",
            content:
              "Measure with `@next/bundle-analyzer`. Lazy-load heavy client components with `next/dynamic`. Keep components as Server Components when possible to ship less JavaScript. Watch the RSC payload size and avoid importing big libraries into client bundles.",
            codeSnippet:
              "import dynamic from 'next/dynamic'\nconst Chart = dynamic(() => import('./Chart'), { ssr: false })",
          },
          {
            id: "ra-6",
            order: 6,
            title: "Internationalization (i18n)",
            content:
              "Use a `[lang]` dynamic segment plus middleware to detect and route by locale. Libraries like next-intl handle message catalogs, pluralization, and date/number formatting per locale.",
          },
          {
            id: "ra-7",
            order: 7,
            title: "Testing your app",
            content:
              "Unit-test components with Vitest/Jest + React Testing Library. Test Server Components and actions as plain async functions. Add end-to-end tests with Playwright to cover real user flows across pages.",
            codeSnippet:
              "// example.test.tsx\nimport { render, screen } from '@testing-library/react'\ntest('renders heading', () => {\n  render(<h1>Hello</h1>)\n  expect(screen.getByText('Hello')).toBeInTheDocument()\n})",
          },
          {
            id: "ra-8",
            order: 8,
            title: "Deploying & observability",
            content:
              "Deploy to Vercel (zero-config) or a Node server/Docker. Set environment variables in the host, run database migrations as part of the deploy, and add logging/metrics (e.g. Vercel Analytics, Sentry) so you can see errors and slow routes in production.",
          },
        ],
      },
    ],
    projects: [
      {
        id: "pj-todo",
        slug: "todo-app",
        title: "Build a Todo App",
        description:
          "The classic first project. Learn components, props, state, and forms by building a working todo list with add, toggle, and delete.",
        level: "BEGINNER",
        estimatedHours: 3,
        tags: ["State", "Forms", "Components"],
        starterCode: "https://github.com/devpath-hub/nextjs-todo-starter",
        demoUrl: "https://nextjs-todo-demo.vercel.app",
        steps: [
          {
            id: "pjs-1",
            order: 1,
            title: "Scaffold the project",
            content:
              "Create a fresh Next.js app and start the dev server. We'll build everything inside the `app/` directory.",
            codeSnippet: "npx create-next-app@latest todo-app\ncd todo-app\nnpm run dev",
          },
          {
            id: "pjs-2",
            order: 2,
            title: "Create the TodoItem component",
            content:
              "Make a presentational component that receives a todo's text and completed state via props and renders a single row.",
            codeSnippet:
              "// components/TodoItem.tsx\nexport function TodoItem({ text, completed }: { text: string; completed: boolean }) {\n  return (\n    <li className={completed ? 'line-through opacity-60' : ''}>\n      {text}\n    </li>\n  )\n}",
          },
          {
            id: "pjs-3",
            order: 3,
            title: "Hold the list in state",
            content:
              "Mark the page as a Client Component and use `useState` to store an array of todos. Map over it to render a `TodoItem` for each entry.",
            codeSnippet:
              "'use client'\nimport { useState } from 'react'\n\nconst [todos, setTodos] = useState<{ id: number; text: string; done: boolean }[]>([])",
          },
          {
            id: "pjs-4",
            order: 4,
            title: "Add a form to create todos",
            content:
              "Add a controlled input and a submit handler that appends a new todo to state. Clear the input afterward.",
          },
          {
            id: "pjs-5",
            order: 5,
            title: "Toggle and delete",
            content:
              "Wire up click handlers to flip a todo's `done` flag and to remove it from the array. Congratulations — you've built a full CRUD UI!",
          },
        ],
      },
      {
        id: "pj-blog",
        slug: "markdown-blog",
        title: "Markdown Blog with Dynamic Routes",
        description:
          "Build a blog that reads Markdown files and generates a page per post using dynamic routes and static generation.",
        level: "INTERMEDIATE",
        estimatedHours: 6,
        tags: ["Dynamic Routes", "SSG", "Markdown"],
        starterCode: "https://github.com/devpath-hub/nextjs-blog-starter",
        steps: [
          {
            id: "bjs-1",
            order: 1,
            title: "Set up the content folder",
            content: "Create a `content/` directory with a few `.md` files. Each file is one blog post with frontmatter.",
          },
          {
            id: "bjs-2",
            order: 2,
            title: "List posts on the index page",
            content: "Read the content directory on the server and render a list of links to each post.",
          },
          {
            id: "bjs-3",
            order: 3,
            title: "Render a post with [slug]",
            content: "Create `app/blog/[slug]/page.tsx`, await the params, and render the matching Markdown file as HTML.",
          },
          {
            id: "bjs-4",
            order: 4,
            title: "Pre-render with generateStaticParams",
            content: "Export `generateStaticParams` so every post is built ahead of time for instant loads and great SEO.",
          },
        ],
      },
      {
        id: "pj-dashboard",
        slug: "saas-dashboard",
        title: "Full-Stack SaaS Dashboard",
        description:
          "An auth-protected dashboard with a database, Server Actions, and charts. The capstone project that ties everything together.",
        level: "ADVANCED",
        estimatedHours: 16,
        tags: ["Auth", "Database", "Server Actions", "Charts"],
        steps: [
          {
            id: "djs-1",
            order: 1,
            title: "Add authentication",
            content: "Wire up NextAuth with a GitHub provider and protect the `/dashboard` route group.",
          },
          {
            id: "djs-2",
            order: 2,
            title: "Model data with Prisma",
            content: "Define your schema, run a migration, and generate the typed client.",
          },
          {
            id: "djs-3",
            order: 3,
            title: "Mutations via Server Actions",
            content: "Create, update, and delete records straight from forms, then revalidate the affected pages.",
          },
          {
            id: "djs-4",
            order: 4,
            title: "Visualize with charts",
            content: "Add a charting library and render usage metrics from your database.",
          },
        ],
      },
      {
        id: "pj-nextjs-weather",
        slug: "weather-dashboard",
        title: "Weather Dashboard",
        description:
          "Fetch live weather from a public API and render it with Server Components, caching, and a clean responsive layout. A great first taste of data fetching.",
        level: "BEGINNER",
        estimatedHours: 4,
        tags: ["Data Fetching", "Caching", "API"],
        starterCode: "https://github.com/devpath-hub/nextjs-weather-starter",
        steps: [
          { id: "nwjs-1", order: 1, title: "Get an API key", content: "Sign up for a free weather API (e.g. OpenWeather) and store the key in `.env.local`." },
          { id: "nwjs-2", order: 2, title: "Fetch in a Server Component", content: "Make the page an async Server Component and `await fetch()` the current conditions for a city." },
          { id: "nwjs-3", order: 3, title: "Cache and revalidate", content: "Use `next: { revalidate: 600 }` so the data refreshes every 10 minutes instead of on every request." },
          { id: "nwjs-4", order: 4, title: "Search by city", content: "Add a form that updates the URL `searchParams`, and read them in the page to fetch a different city." },
          { id: "nwjs-5", order: 5, title: "Polish the UI", content: "Show a loading skeleton via `loading.tsx` and handle the 'city not found' error gracefully." },
        ],
      },
      {
        id: "pj-auth-starter",
        slug: "auth-starter",
        title: "Authentication Starter",
        description:
          "Add real sign-in to a Next.js app with NextAuth (GitHub + credentials), protected routes, and a database-backed session.",
        level: "INTERMEDIATE",
        estimatedHours: 8,
        tags: ["Auth", "NextAuth", "Middleware"],
        steps: [
          { id: "ajs-1", order: 1, title: "Install and configure Auth.js", content: "Set up NextAuth with a GitHub provider and the required environment variables." },
          { id: "ajs-2", order: 2, title: "Add a database adapter", content: "Persist users and sessions with the Prisma adapter so logins survive restarts." },
          { id: "ajs-3", order: 3, title: "Protect routes with middleware", content: "Redirect unauthenticated users away from `/dashboard` using `middleware.ts`." },
          { id: "ajs-4", order: 4, title: "Read the session", content: "Show the signed-in user's name and a sign-out button in the navbar." },
          { id: "ajs-5", order: 5, title: "Add credentials login", content: "Support email + password sign-in with hashed passwords and validation." },
        ],
      },
      {
        id: "pj-ecommerce",
        slug: "ecommerce-store",
        title: "E-Commerce Store",
        description:
          "Build a small storefront with a product catalog, cart, Stripe checkout, and order history — the full production-grade flow.",
        level: "ADVANCED",
        estimatedHours: 20,
        tags: ["Stripe", "Database", "Server Actions", "Auth"],
        steps: [
          { id: "ejs-1", order: 1, title: "Model products & orders", content: "Design the Prisma schema for products, carts, and orders, then seed sample products." },
          { id: "ejs-2", order: 2, title: "Build the catalog", content: "Render product listing and detail pages with static generation + ISR." },
          { id: "ejs-3", order: 3, title: "Cart with Server Actions", content: "Add/remove items and persist the cart per user or session." },
          { id: "ejs-4", order: 4, title: "Stripe Checkout", content: "Create a checkout session and redirect to Stripe's hosted page." },
          { id: "ejs-5", order: 5, title: "Handle webhooks", content: "Fulfill orders in a Route Handler when Stripe sends the `checkout.session.completed` event." },
          { id: "ejs-6", order: 6, title: "Order history", content: "Show each customer their past orders on a protected account page." },
        ],
      },
    ],
    errors: [
      {
        id: "err-1",
        errorMessage: "Module not found: Can't resolve 'react'",
        cause: "Dependencies aren't installed, or node_modules was deleted/corrupted.",
        solution: "Run `npm install` in the project root. If it persists, delete `node_modules` and `package-lock.json`, then reinstall.",
        codeSnippet: "rm -rf node_modules package-lock.json\nnpm install",
        tags: ["dependencies", "install"],
      },
      {
        id: "err-2",
        errorMessage: "Error: A component was suspended while responding to synchronous input",
        cause: "You used an async/server-only feature inside a Client Component, or read `params`/`searchParams` without awaiting them.",
        solution: "In Next.js 15+, `params` and `searchParams` are Promises. Make the page `async` and `await` them before use.",
        codeSnippet:
          "export default async function Page({ params }: { params: Promise<{ id: string }> }) {\n  const { id } = await params // ✅ await it\n}",
        tags: ["params", "async"],
      },
      {
        id: "err-3",
        errorMessage: "You're importing a component that needs useState. It only works in a Client Component",
        cause: "You used a React hook (useState/useEffect) in a file that is a Server Component by default.",
        solution: "Add `'use client'` as the very first line of the file that uses the hook.",
        codeSnippet: "'use client'\nimport { useState } from 'react'",
        tags: ["use client", "hooks"],
      },
      {
        id: "err-4",
        errorMessage: "Hydration failed because the server rendered HTML didn't match the client",
        cause: "The server and client rendered different markup — often from using `Date.now()`, `Math.random()`, or browser-only values during render.",
        solution: "Move non-deterministic values into `useEffect`, or guard them so they only run on the client. For values that must differ, add `suppressHydrationWarning` to that element.",
        tags: ["hydration", "ssr"],
      },
      {
        id: "err-5",
        errorMessage: "ReferenceError: window is not defined",
        cause: "You accessed a browser-only global (`window`, `document`, `localStorage`) during server rendering. Server Components and the server pass of Client Components have no `window`.",
        solution: "Access browser globals inside `useEffect` (which only runs on the client), or guard with `typeof window !== 'undefined'`. For whole components, import them with `next/dynamic` and `{ ssr: false }`.",
        codeSnippet: "useEffect(() => {\n  const theme = localStorage.getItem('theme') // safe: client only\n}, [])",
        tags: ["ssr", "window", "client"],
      },
      {
        id: "err-6",
        errorMessage: "Error: Event handlers cannot be passed to Client Component props",
        cause: "You passed a function (like `onClick`) from a Server Component down to a Client Component. Functions aren't serializable across the server/client boundary.",
        solution: "Move the handler into a Client Component (a file with `'use client'`), or pass plain serializable data and define the handler where it's used.",
        codeSnippet: "'use client'\n// Define the handler in the client component, not the server parent\nexport function Button() {\n  return <button onClick={() => console.log('hi')}>Click</button>\n}",
        tags: ["use client", "server-components", "props"],
      },
      {
        id: "err-7",
        errorMessage: "Module not found: Can't resolve 'fs' (or 'net', 'child_process')",
        cause: "A Node.js-only module was imported into code that runs in the browser — usually a Client Component or a library pulled into the client bundle.",
        solution: "Use Node modules only in Server Components, Route Handlers, or Server Actions. Keep server-only code out of `'use client'` files; add `import 'server-only'` to a module to make accidental client imports fail loudly.",
        tags: ["bundling", "node", "client"],
      },
      {
        id: "err-8",
        errorMessage: "Error: Invalid src prop on `next/image`, hostname is not configured under images",
        cause: "You're loading a remote image with `next/image` from a domain Next.js hasn't been told to allow.",
        solution: "Add the hostname to `images.remotePatterns` in `next.config.ts`, then restart the dev server.",
        codeSnippet: "// next.config.ts\nexport default {\n  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }] },\n}",
        tags: ["next/image", "config"],
      },
      {
        id: "err-9",
        errorMessage: "Dynamic server usage: Route couldn't be rendered statically because it used `headers`/`cookies`",
        cause: "You read request-time data (`cookies()`, `headers()`, `searchParams`) in a route Next.js was trying to prerender as static.",
        solution: "That's expected — opt the route into dynamic rendering with `export const dynamic = 'force-dynamic'`, or move the request-time read into a child wrapped in `<Suspense>`.",
        codeSnippet: "export const dynamic = 'force-dynamic'",
        tags: ["rendering", "dynamic", "cookies"],
      },
      {
        id: "err-10",
        errorMessage: "Each child in a list should have a unique \"key\" prop",
        cause: "You rendered an array with `.map()` without giving each element a stable, unique `key`. React needs keys to track items efficiently.",
        solution: "Add a `key` using a stable id (not the array index when the list can reorder or change).",
        codeSnippet: "{items.map((item) => (\n  <li key={item.id}>{item.name}</li>\n))}",
        tags: ["react", "keys", "lists"],
      },
      {
        id: "err-11",
        errorMessage: "Maximum update depth exceeded",
        cause: "A component calls `setState` during render or in an effect without a correct dependency array, causing an infinite re-render loop.",
        solution: "Don't call setState directly in the render body. In `useEffect`, make sure the dependency array doesn't include a value the effect itself changes every run.",
        codeSnippet: "// ❌ runs every render\nuseEffect(() => { setCount(count + 1) })\n// ✅ runs once\nuseEffect(() => { setCount((c) => c + 1) }, [])",
        tags: ["react", "hooks", "render-loop"],
      },
      {
        id: "err-12",
        errorMessage: "TypeError: Cannot read properties of undefined (reading 'map')",
        cause: "You called `.map()` on data that was undefined — commonly because data is still loading or a fetch returned an unexpected shape.",
        solution: "Default to an empty array and guard the access, or handle the loading/empty state explicitly.",
        codeSnippet: "const items = data?.items ?? []\nreturn items.map((i) => <li key={i.id}>{i.name}</li>)",
        tags: ["javascript", "undefined", "data"],
      },
      {
        id: "err-13",
        errorMessage: "Port 3000 is already in use",
        cause: "Another process (often a previous `next dev` that didn't shut down) is holding port 3000.",
        solution: "Run dev on another port with `next dev -p 3001`, or kill the process using the port.",
        codeSnippet: "# Windows: find and kill the process on port 3000\nnetstat -ano | findstr :3000\ntaskkill /PID <pid> /F",
        tags: ["dev-server", "ports"],
      },
      {
        id: "err-14",
        errorMessage: "Environment variable not found: DATABASE_URL",
        cause: "Your code (often Prisma) read an env var that isn't set, or the dev server was started before `.env` existed.",
        solution: "Add the variable to `.env.local`, then fully restart the dev server (env files are read at startup, not on hot reload).",
        codeSnippet: "# .env.local\nDATABASE_URL=\"postgresql://user:pass@host/db\"",
        tags: ["env", "prisma", "config"],
      },
      {
        id: "err-15",
        errorMessage: "PrismaClientInitializationError: Too many connections / can't reach database",
        cause: "In development, hot reload can create a new PrismaClient on every change, exhausting the database's connection pool.",
        solution: "Reuse a single client via a global singleton, and use a pooled connection string (e.g. the Neon pooler) in serverless environments.",
        codeSnippet: "const globalForPrisma = globalThis as any\nexport const prisma = globalForPrisma.prisma ?? new PrismaClient()\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma",
        tags: ["prisma", "database", "connections"],
      },
      {
        id: "err-16",
        errorMessage: "A tree hydrated but some attributes of the server rendered HTML didn't match (browser extension)",
        cause: "A browser extension (password managers, Grammarly, dark-mode tools) injected attributes into the HTML before React hydrated, so the markup no longer matches.",
        solution: "This one is usually harmless and caused by the user's browser, not your code. Add `suppressHydrationWarning` to the affected element (commonly `<body>`), or test in an incognito window with extensions disabled.",
        tags: ["hydration", "extensions"],
      },
    ],
    tools: [
      {
        id: "tl-tailwind",
        name: "Tailwind CSS",
        description: "A utility-first CSS framework for building custom UI directly in your markup.",
        purpose: "Styling",
        whyUseIt: "Style without leaving your component, ship only the CSS you use, and stay consistent with a design-token system.",
        alternatives: "CSS Modules, styled-components, vanilla-extract, Panda CSS",
        bestFor: "Most apps — especially when paired with a component library like shadcn/ui.",
        docsUrl: "https://tailwindcss.com/docs",
      },
      {
        id: "tl-prisma",
        name: "Prisma",
        description: "A type-safe ORM for Node.js and TypeScript with migrations and a visual data browser.",
        purpose: "Database access",
        whyUseIt: "Autocomplete for your queries, compile-time safety on your data, and painless schema migrations.",
        alternatives: "Drizzle ORM, Kysely, TypeORM, raw SQL",
        bestFor: "Teams that want safety and DX over maximum control of the generated SQL.",
        docsUrl: "https://www.prisma.io/docs",
      },
      {
        id: "tl-nextauth",
        name: "NextAuth.js (Auth.js)",
        description: "Authentication for Next.js with built-in OAuth providers and session management.",
        purpose: "Authentication",
        whyUseIt: "Drop-in social login, secure sessions, and database adapters — without building auth from scratch.",
        alternatives: "Clerk, Lucia, Supabase Auth, Better Auth",
        bestFor: "Apps that want self-hosted, provider-flexible auth at no cost.",
        docsUrl: "https://authjs.dev",
      },
      {
        id: "tl-vercel",
        name: "Vercel",
        description: "The deployment platform built by the Next.js team.",
        purpose: "Hosting & deployment",
        whyUseIt: "Zero-config deploys, preview URLs per pull request, edge network, and serverless functions.",
        alternatives: "Netlify, Cloudflare Pages, Railway, a self-hosted Node server",
        bestFor: "Shipping Next.js apps with the least possible configuration.",
        docsUrl: "https://vercel.com/docs",
      },
      {
        id: "tl-shadcn",
        name: "shadcn/ui",
        description: "Accessible, unstyled-by-default components you copy into your codebase and own.",
        purpose: "UI components",
        whyUseIt: "You get beautiful, accessible components (built on Radix + Tailwind) as source you can edit — no black-box dependency to fight.",
        alternatives: "Material UI, Mantine, Chakra UI, Park UI",
        bestFor: "Teams using Tailwind who want full control over their component code.",
        docsUrl: "https://ui.shadcn.com",
      },
      {
        id: "tl-zod",
        name: "Zod",
        description: "TypeScript-first schema validation with static type inference.",
        purpose: "Validation",
        whyUseIt: "Validate form input, API payloads, and env vars at runtime, and get the TypeScript types for free from the same schema.",
        alternatives: "Valibot, Yup, ArkType, io-ts",
        bestFor: "Validating anything that crosses a trust boundary in a Server Action or Route Handler.",
        docsUrl: "https://zod.dev",
      },
      {
        id: "tl-rhf",
        name: "React Hook Form",
        description: "Performant, flexible form state management with minimal re-renders.",
        purpose: "Forms",
        whyUseIt: "Handles complex client-side forms with easy validation (pairs with Zod) and great performance.",
        alternatives: "Formik, TanStack Form, native Server Actions + useActionState",
        bestFor: "Rich, interactive forms with lots of fields and client-side validation.",
        docsUrl: "https://react-hook-form.com",
      },
      {
        id: "tl-tanstack-query",
        name: "TanStack Query",
        description: "Async state management: caching, background refetching, and mutations for client data.",
        purpose: "Client data fetching",
        whyUseIt: "When you fetch on the client (dashboards, infinite scroll, polling), it handles caching, retries, and stale data so you don't reinvent it.",
        alternatives: "SWR, RTK Query, native fetch in Server Components",
        bestFor: "Highly interactive client-side data that Server Components can't cover alone.",
        docsUrl: "https://tanstack.com/query",
      },
      {
        id: "tl-zustand",
        name: "Zustand",
        description: "A tiny, hook-based global state store with no boilerplate.",
        purpose: "Client state management",
        whyUseIt: "When you need shared client state (cart, modals, filters) beyond `useState`, Zustand is simpler than Redux and works great with the App Router.",
        alternatives: "Redux Toolkit, Jotai, Context API, signals",
        bestFor: "Shared interactive UI state across components without prop drilling.",
        docsUrl: "https://zustand.docs.pmnd.rs",
      },
      {
        id: "tl-drizzle",
        name: "Drizzle ORM",
        description: "A lightweight, SQL-like TypeScript ORM with zero runtime overhead.",
        purpose: "Database access",
        whyUseIt: "If you want queries that read like SQL and a thinner abstraction than Prisma, Drizzle gives you full type safety with minimal magic.",
        alternatives: "Prisma, Kysely, raw SQL",
        bestFor: "Developers who like SQL and want maximum control and edge compatibility.",
        docsUrl: "https://orm.drizzle.team",
      },
      {
        id: "tl-stripe",
        name: "Stripe",
        description: "Payments infrastructure: checkout, subscriptions, and billing.",
        purpose: "Payments",
        whyUseIt: "The standard for taking money online — great SDKs, hosted Checkout, and webhooks that pair naturally with Route Handlers.",
        alternatives: "Lemon Squeezy, Paddle, PayPal",
        bestFor: "Any app that needs to charge customers or run subscriptions.",
        docsUrl: "https://stripe.com/docs",
      },
    ],
  },
  {
    id: "tech-flutter",
    name: "Flutter",
    slug: "flutter",
    description:
      "Google's UI toolkit for building natively compiled apps for mobile, web, and desktop from a single Dart codebase.",
    tagline: "Build apps for any screen",
    iconEmoji: "📱",
    color: "#02569B",
    isFeatured: true,
    stats: { learners: "31k", guides: 9, projects: 3 },
    setupGuide: {
      title: "Flutter Setup Guide",
      description: "Install the Flutter SDK and run your first app on an emulator or real device.",
      steps: [
        {
          id: "fs-1",
          order: 1,
          title: "Install the Flutter SDK",
          command: "# Download from https://docs.flutter.dev/get-started/install",
          explanation: "The Flutter SDK includes the Dart language, the framework, and the `flutter` command-line tool.",
          why: "Everything you build with Flutter runs through this SDK — it compiles your Dart code to native apps.",
          alternatives: "On Mac/Linux you can install via `git clone` of the Flutter repo and add it to your PATH.",
          verification: "Run `flutter doctor`. It lists what's installed and what's still missing.",
          eli5: "Flutter is a magic paintbox; the SDK is the box itself with all the brushes inside.",
        },
        {
          id: "fs-2",
          order: 2,
          title: "Set up a device or emulator",
          command: "flutter emulators --launch <emulator_id>",
          explanation: "You need somewhere to run your app — an Android emulator, iOS simulator, or a physical phone.",
          why: "Without a target device, there's nothing to display your app on.",
          alternatives: "Run on Chrome with `flutter run -d chrome` for fast web-based iteration.",
          verification: "`flutter devices` lists at least one connected device.",
        },
        {
          id: "fs-3",
          order: 3,
          title: "Create and run your app",
          command: "flutter create my_app\ncd my_app\nflutter run",
          explanation: "Scaffolds a starter counter app and launches it on your selected device.",
          why: "This proves your whole toolchain works end-to-end before you write any code.",
          verification: "The default counter app appears on your device and the button increments.",
          eli5: "It builds a tiny demo app so you can confirm the paintbox actually paints.",
        },
      ],
    },
    roadmaps: [
      {
        id: "rm-flutter-basics",
        title: "Flutter Basics",
        description: "Widgets, layout, and state — the building blocks of every Flutter app.",
        level: "BEGINNER",
        steps: [
          {
            id: "frs-1",
            order: 1,
            title: "Everything is a Widget",
            content:
              "In Flutter, the entire UI is a tree of widgets — text, padding, buttons, even the app itself. You compose small widgets into bigger ones.",
            eli5Content: "Widgets are LEGO bricks. You snap small bricks together to build the whole app.",
          },
          {
            id: "frs-2",
            order: 2,
            title: "Stateless vs. Stateful widgets",
            content:
              "StatelessWidgets never change after they're built. StatefulWidgets hold state that can change over time and trigger rebuilds via `setState`.",
            eli5Content: "Stateless is a printed photo. Stateful is a whiteboard you can erase and redraw.",
          },
          {
            id: "frs-3",
            order: 3,
            title: "Layout with Row, Column, and Flex",
            content:
              "Arrange widgets horizontally with `Row`, vertically with `Column`, and control spacing with `MainAxisAlignment` and `Expanded`.",
          },
          {
            id: "frs-4",
            order: 4,
            title: "Handling user input",
            content:
              "Capture taps with `GestureDetector` and buttons (`ElevatedButton`, `TextButton`), and read text with `TextField` and a `TextEditingController`.",
            eli5Content: "These are the buttons and text boxes — the parts of your app the user actually pokes and types into.",
            codeSnippet: "TextField(\n  controller: _controller,\n  decoration: InputDecoration(labelText: 'Name'),\n)",
          },
          {
            id: "frs-5",
            order: 5,
            title: "Lists and scrolling",
            content:
              "Use `ListView.builder` to efficiently render long, scrollable lists — it only builds the items currently on screen. Use `GridView` for grids.",
            eli5Content: "`ListView.builder` is a smart conveyor belt: it only makes the items you can currently see, so even a million-row list stays fast.",
            codeSnippet: "ListView.builder(\n  itemCount: items.length,\n  itemBuilder: (context, i) => ListTile(title: Text(items[i])),\n)",
          },
          {
            id: "frs-6",
            order: 6,
            title: "Navigation between screens",
            content:
              "Push and pop screens with the `Navigator`, or adopt declarative routing with `go_router` for deep links and web URLs.",
            eli5Content: "Navigation is the doors between rooms — pushing opens a new room, popping goes back to the previous one.",
            codeSnippet: "Navigator.push(\n  context,\n  MaterialPageRoute(builder: (_) => DetailScreen()),\n);",
          },
          {
            id: "frs-7",
            order: 7,
            title: "Calling APIs & async/await",
            content:
              "Fetch data with the `http` (or `dio`) package, parse JSON into Dart models, and render it. Use `FutureBuilder` to show loading and error states while the request is in flight.",
            eli5Content: "`FutureBuilder` shows a spinner while the food is cooking and the meal once it's ready — no manual juggling.",
            codeSnippet: "FutureBuilder(\n  future: fetchData(),\n  builder: (context, snapshot) =>\n    snapshot.hasData ? Text(snapshot.data!) : CircularProgressIndicator(),\n)",
          },
          {
            id: "frs-8",
            order: 8,
            title: "Theming & Material Design",
            content:
              "Define a `ThemeData` with your colors, typography, and shapes in one place so the whole app stays consistent — and supports light/dark mode for free.",
            eli5Content: "A theme is your app's style guide — set the colors and fonts once and every screen follows them.",
          },
        ],
      },
      {
        id: "rm-flutter-intermediate",
        title: "Building Real Apps",
        description: "State management, persistence, and the patterns production Flutter apps rely on.",
        level: "INTERMEDIATE",
        steps: [
          {
            id: "fri-1",
            order: 1,
            title: "State management with Provider/Riverpod",
            content:
              "`setState` only works within one widget. For state shared across screens (auth, cart, settings), reach for Provider or Riverpod so any widget can read and react to it.",
          },
          {
            id: "fri-2",
            order: 2,
            title: "Local persistence",
            content:
              "Save simple key-value data with `shared_preferences`, or structured data with a local database like `sqflite`, `drift`, or `Isar`, so it survives app restarts.",
          },
          {
            id: "fri-3",
            order: 3,
            title: "Forms & validation",
            content:
              "Wrap fields in a `Form` with a `GlobalKey<FormState>`, give each field a `validator`, and call `formKey.currentState!.validate()` on submit.",
          },
          {
            id: "fri-4",
            order: 4,
            title: "Animations",
            content:
              "Start with implicit animations (`AnimatedContainer`, `AnimatedOpacity`) for easy transitions, then use `AnimationController` for fully custom motion.",
          },
          {
            id: "fri-5",
            order: 5,
            title: "Testing & building for release",
            content:
              "Write widget tests with `flutter test`, then build release artifacts with `flutter build apk` / `flutter build ios` and ship to the stores.",
          },
        ],
      },
    ],
    projects: [
      {
        id: "pj-weather",
        slug: "weather-app",
        title: "Weather App",
        description: "Fetch live weather from an API and display it with a clean, responsive Flutter UI.",
        level: "BEGINNER",
        estimatedHours: 5,
        tags: ["HTTP", "State", "Layout"],
        steps: [
          { id: "wjs-1", order: 1, title: "Create the app shell", content: "Scaffold a new Flutter app and build the home screen layout." },
          { id: "wjs-2", order: 2, title: "Call a weather API", content: "Use the `http` package to fetch current conditions for a city." },
          { id: "wjs-3", order: 3, title: "Display the data", content: "Parse the JSON and render temperature, conditions, and an icon." },
        ],
      },
      {
        id: "pj-flutter-todo",
        slug: "todo-app",
        title: "Todo App with Local Storage",
        description: "Build a todo list that persists across restarts, learning state management and local persistence.",
        level: "BEGINNER",
        estimatedHours: 4,
        tags: ["State", "Persistence", "ListView"],
        steps: [
          { id: "ftjs-1", order: 1, title: "Build the list UI", content: "Render todos with `ListView.builder` and a `TextField` to add new ones." },
          { id: "ftjs-2", order: 2, title: "Add & remove items", content: "Manage the list with `setState`, adding on submit and removing on swipe with `Dismissible`." },
          { id: "ftjs-3", order: 3, title: "Persist with shared_preferences", content: "Save the list to local storage so it survives app restarts." },
        ],
      },
      {
        id: "pj-flutter-chat",
        slug: "firebase-chat",
        title: "Real-time Chat with Firebase",
        description: "A group chat app with Google sign-in and live messages backed by Cloud Firestore.",
        level: "ADVANCED",
        estimatedHours: 12,
        tags: ["Firebase", "Auth", "Streams", "Real-time"],
        steps: [
          { id: "fcjs-1", order: 1, title: "Set up Firebase", content: "Connect your app to a Firebase project with FlutterFire." },
          { id: "fcjs-2", order: 2, title: "Add Google sign-in", content: "Authenticate users with Firebase Auth." },
          { id: "fcjs-3", order: 3, title: "Stream messages", content: "Render a live message list from a Firestore `snapshots()` stream with `StreamBuilder`." },
          { id: "fcjs-4", order: 4, title: "Send messages", content: "Write new messages to Firestore and watch them appear instantly for everyone." },
        ],
      },
    ],
    errors: [
      {
        id: "ferr-1",
        errorMessage: "RenderFlex overflowed by N pixels",
        cause: "A Row or Column tried to lay out children wider/taller than the available space.",
        solution: "Wrap the overflowing child in `Expanded` or `Flexible`, or make the area scrollable with `SingleChildScrollView`.",
        tags: ["layout", "overflow"],
      },
      {
        id: "ferr-2",
        errorMessage: "setState() called after dispose()",
        cause: "You called setState on a widget that's already been removed from the tree (often after an async gap).",
        solution: "Guard with `if (mounted) setState(...)` before updating state in async callbacks.",
        codeSnippet: "if (mounted) {\n  setState(() => data = result);\n}",
        tags: ["state", "async"],
      },
      {
        id: "ferr-3",
        errorMessage: "Vertical viewport was given unbounded height",
        cause: "You put a `ListView` (or other scrollable) inside a `Column` without constraining its height, so it tries to be infinitely tall.",
        solution: "Wrap the `ListView` in `Expanded` (inside a Column) or give it a fixed height with a `SizedBox`.",
        codeSnippet: "Column(children: [\n  Expanded(child: ListView(...)),\n])",
        tags: ["layout", "scrolling"],
      },
      {
        id: "ferr-4",
        errorMessage: "A RenderFlex overflowed / Bottom overflowed by N pixels when keyboard opens",
        cause: "The on-screen keyboard shrinks the available space and your fixed content no longer fits.",
        solution: "Wrap the body in a `SingleChildScrollView` or use `resizeToAvoidBottomInset` so content can scroll above the keyboard.",
        tags: ["layout", "keyboard"],
      },
      {
        id: "ferr-5",
        errorMessage: "type 'Null' is not a subtype of type 'X'",
        cause: "You accessed a value that was null — commonly a missing JSON field parsed into a non-nullable Dart type.",
        solution: "Make the model field nullable (`String?`) or provide a default when parsing (`json['name'] ?? ''`).",
        codeSnippet: "name: json['name'] as String? ?? 'Unknown',",
        tags: ["null-safety", "json"],
      },
      {
        id: "ferr-6",
        errorMessage: "No MaterialLocalizations found / No Material widget found",
        cause: "A Material widget (like `Scaffold` or `showDialog`) was used outside a `MaterialApp`, or above it in the tree.",
        solution: "Make sure your app is wrapped in `MaterialApp`, and that the widget using Material is below it.",
        tags: ["material", "widget-tree"],
      },
      {
        id: "ferr-7",
        errorMessage: "Exception: Connection refused / SocketException on Android emulator",
        cause: "You tried to reach `localhost` from the Android emulator, which routes to the emulator itself, not your host machine.",
        solution: "Use `10.0.2.2` instead of `localhost` to reach your computer's server from the Android emulator.",
        tags: ["networking", "emulator"],
      },
    ],
    tools: [
      {
        id: "ftl-1",
        name: "Riverpod",
        description: "A reactive caching and state-management framework for Flutter.",
        purpose: "State management",
        whyUseIt: "Compile-safe providers, no BuildContext gymnastics, and testable state out of the box.",
        alternatives: "Provider, Bloc, GetX, signals",
        bestFor: "Apps that outgrow setState and need shared, testable state.",
        docsUrl: "https://riverpod.dev",
      },
      {
        id: "ftl-2",
        name: "Firebase",
        description: "Google's backend-as-a-service: auth, database, storage, and more.",
        purpose: "Backend",
        whyUseIt: "Ship features fast without running servers — first-class Flutter SDKs included.",
        alternatives: "Supabase, Appwrite, a custom REST/GraphQL backend",
        bestFor: "Solo devs and prototypes that need a backend yesterday.",
        docsUrl: "https://firebase.google.com/docs/flutter/setup",
      },
      {
        id: "ftl-3",
        name: "go_router",
        description: "The official declarative routing package for Flutter.",
        purpose: "Navigation",
        whyUseIt: "Handles deep links, web URLs, redirects, and nested navigation far more cleanly than imperative `Navigator` calls.",
        alternatives: "Navigator 2.0, auto_route, beamer",
        bestFor: "Apps with more than a couple of screens, or that target web.",
        docsUrl: "https://pub.dev/packages/go_router",
      },
      {
        id: "ftl-4",
        name: "dio",
        description: "A powerful HTTP client for Dart with interceptors and rich configuration.",
        purpose: "Networking",
        whyUseIt: "Adds interceptors, global error handling, timeouts, and request cancellation on top of the basic `http` package.",
        alternatives: "http, chopper, retrofit",
        bestFor: "Apps with non-trivial API needs (auth headers, retries, logging).",
        docsUrl: "https://pub.dev/packages/dio",
      },
      {
        id: "ftl-5",
        name: "freezed",
        description: "Code generation for immutable data classes, unions, and JSON serialization.",
        purpose: "Models & state",
        whyUseIt: "Eliminates boilerplate for data models — `copyWith`, equality, and `fromJson`/`toJson` are generated for you.",
        alternatives: "json_serializable alone, built_value, manual classes",
        bestFor: "Apps with many data models and JSON APIs.",
        docsUrl: "https://pub.dev/packages/freezed",
      },
      {
        id: "ftl-6",
        name: "Isar",
        description: "A fast, type-safe local NoSQL database for Flutter.",
        purpose: "Local persistence",
        whyUseIt: "Store structured data offline with a simple API and great performance — no SQL required.",
        alternatives: "sqflite, drift, Hive, shared_preferences",
        bestFor: "Offline-first apps that need to store more than simple key-value data.",
        docsUrl: "https://isar.dev",
      },
    ],
  },
  {
    id: "tech-cicd",
    name: "CI/CD",
    slug: "cicd",
    description:
      "Continuous Integration and Continuous Delivery: automate testing and deployment so every push ships with confidence.",
    tagline: "Ship safely, automatically",
    iconEmoji: "🔁",
    color: "#2088FF",
    isFeatured: true,
    stats: { learners: "22k", guides: 8, projects: 2 },
    setupGuide: {
      title: "GitHub Actions Setup Guide",
      description: "Create your first automated pipeline that runs on every push.",
      steps: [
        {
          id: "cs-1",
          order: 1,
          title: "Create the workflows folder",
          command: "mkdir -p .github/workflows",
          explanation: "GitHub looks in `.github/workflows/` for YAML files that describe your automation.",
          why: "This is the one location GitHub Actions reads — files anywhere else are ignored.",
          verification: "The folder exists in your repo root.",
          eli5: "It's a special mailbox GitHub checks for instructions on what to do automatically.",
        },
        {
          id: "cs-2",
          order: 2,
          title: "Add a CI workflow",
          command: "# .github/workflows/ci.yml",
          explanation: "Define a workflow that checks out your code, installs dependencies, and runs your tests.",
          why: "Catching failures automatically on every push prevents broken code from reaching your main branch.",
          alternatives: "GitLab CI, CircleCI, Jenkins — same concept, different YAML.",
          verification: "Push a commit and watch the run appear in the repo's Actions tab.",
        },
        {
          id: "cs-3",
          order: 3,
          title: "Add a status badge",
          command: "![CI](https://github.com/USER/REPO/actions/workflows/ci.yml/badge.svg)",
          explanation: "Drop a build-status badge into your README so anyone can see at a glance whether the main branch is passing.",
          why: "A green badge builds trust and surfaces breakage immediately — for you and for contributors.",
          verification: "The badge renders in your README and turns green after a successful run.",
          eli5: "It's a little health sticker on your project that says 'all tests passing' in green or 'broken' in red.",
        },
      ],
    },
    roadmaps: [
      {
        id: "rm-cicd-basics",
        title: "CI/CD Fundamentals",
        description: "Pipelines, triggers, and the build → test → deploy loop.",
        level: "BEGINNER",
        steps: [
          {
            id: "crs-1",
            order: 1,
            title: "What is a pipeline?",
            content:
              "A pipeline is an automated sequence of steps that runs on an event (like a push). Typical stages: install, lint, test, build, deploy.",
            eli5Content: "It's a factory conveyor belt: code goes in one end and a tested, deployed app comes out the other.",
          },
          {
            id: "crs-2",
            order: 2,
            title: "Triggers and events",
            content:
              "Workflows run in response to events: `push`, `pull_request`, a schedule (`cron`), or manual dispatch. Choose triggers that match your team's flow.",
          },
          {
            id: "crs-3",
            order: 3,
            title: "Secrets and environments",
            content:
              "Never hardcode credentials. Store API keys and tokens as encrypted secrets and reference them in your workflow.",
          },
          {
            id: "crs-4",
            order: 4,
            title: "Jobs, steps & runners",
            content:
              "A workflow has jobs; each job runs on a fresh runner (a VM) and contains ordered steps. Steps either run shell commands (`run:`) or reusable actions (`uses:`). Jobs run in parallel by default unless you add `needs:`.",
            eli5Content: "A job is one worker at one workbench; steps are their to-do list. Add more workers to do things at the same time.",
            codeSnippet: "jobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test",
          },
          {
            id: "crs-5",
            order: 5,
            title: "Caching dependencies",
            content:
              "Re-downloading dependencies every run is slow. Cache them (or use `actions/setup-node`'s built-in cache) so builds are dramatically faster and cheaper.",
            eli5Content: "Instead of going grocery shopping before every meal, you keep a stocked pantry and only restock when the list changes.",
            codeSnippet: "- uses: actions/setup-node@v4\n  with:\n    node-version: 20\n    cache: 'npm'",
          },
          {
            id: "crs-6",
            order: 6,
            title: "Matrix builds",
            content:
              "Run the same job across multiple versions or OSes at once with a `matrix` — e.g. test on Node 18, 20, and 22 in parallel — to catch compatibility issues early.",
            codeSnippet: "strategy:\n  matrix:\n    node: [18, 20, 22]",
          },
          {
            id: "crs-7",
            order: 7,
            title: "Continuous Delivery vs. Deployment",
            content:
              "Continuous Delivery means every passing build is *ready* to release (often with a manual approval). Continuous Deployment goes one step further and ships to production automatically. Pick based on how much you trust your tests.",
            eli5Content: "Delivery parks the finished car in the driveway ready to go; Deployment drives it straight to the customer.",
          },
        ],
      },
      {
        id: "rm-cicd-intermediate",
        title: "Production Pipelines",
        description: "Environments, gates, containers, and safe release strategies.",
        level: "INTERMEDIATE",
        steps: [
          {
            id: "cri-1",
            order: 1,
            title: "Environments & approval gates",
            content:
              "Define `staging` and `production` environments with required reviewers and protection rules so risky deploys need a human's sign-off.",
          },
          {
            id: "cri-2",
            order: 2,
            title: "Build once, deploy many",
            content:
              "Build a single immutable artifact (or container image) and promote that same artifact through environments — never rebuild per environment, or staging and prod can drift.",
          },
          {
            id: "cri-3",
            order: 3,
            title: "Containerize with Docker",
            content:
              "Package your app and its environment into a Docker image so it runs identically locally, in CI, and in production. Push the image to a registry as part of the pipeline.",
          },
          {
            id: "cri-4",
            order: 4,
            title: "Release strategies",
            content:
              "Reduce risk with blue-green (swap between two identical environments) or canary (roll out to a small % first) deployments, plus a fast rollback path.",
          },
          {
            id: "cri-5",
            order: 5,
            title: "Monitoring & rollback",
            content:
              "A deploy isn't done when it ships — watch error rates and latency after release, and automate rollback when health checks fail.",
          },
        ],
      },
    ],
    projects: [
      {
        id: "pj-deploy-pipeline",
        slug: "auto-deploy-pipeline",
        title: "Auto-Deploy Pipeline",
        description: "Build a pipeline that tests a Node app and deploys it to production on every merge to main.",
        level: "INTERMEDIATE",
        estimatedHours: 4,
        tags: ["GitHub Actions", "Testing", "Deploy"],
        steps: [
          { id: "cpjs-1", order: 1, title: "Run tests on PRs", content: "Add a workflow that installs deps and runs the test suite for every pull request." },
          { id: "cpjs-2", order: 2, title: "Build artifacts", content: "Cache dependencies and produce a production build." },
          { id: "cpjs-3", order: 3, title: "Deploy on merge", content: "Trigger a deploy step only when changes land on the main branch." },
        ],
      },
      {
        id: "pj-docker-ship",
        slug: "dockerize-and-ship",
        title: "Dockerize & Ship an App",
        description: "Containerize a web app, build and push the image in CI, and deploy it — the modern, portable release flow.",
        level: "ADVANCED",
        estimatedHours: 6,
        tags: ["Docker", "Registry", "Deploy"],
        steps: [
          { id: "dsjs-1", order: 1, title: "Write a Dockerfile", content: "Create a multi-stage Dockerfile that builds the app and produces a small runtime image." },
          { id: "dsjs-2", order: 2, title: "Build & test the image", content: "Build the image in CI and run a smoke test against the running container." },
          { id: "dsjs-3", order: 3, title: "Push to a registry", content: "Tag the image and push it to GitHub Container Registry (GHCR) or Docker Hub." },
          { id: "dsjs-4", order: 4, title: "Deploy the image", content: "Pull and run the image on your host (or a platform like Railway/Fly.io) on every merge to main." },
        ],
      },
    ],
    errors: [
      {
        id: "cerr-1",
        errorMessage: "Error: Process completed with exit code 1",
        cause: "A step in your workflow failed — usually a test, lint, or build command returning a non-zero code.",
        solution: "Open the failed step's logs in the Actions tab to find the real error, then reproduce it locally.",
        tags: ["actions", "debugging"],
      },
      {
        id: "cerr-2",
        errorMessage: "Permission denied (publickey)",
        cause: "The runner can't authenticate to a remote (often a deploy target or private repo).",
        solution: "Add the correct SSH key or token as an encrypted secret and reference it in the step.",
        tags: ["secrets", "auth"],
      },
      {
        id: "cerr-3",
        errorMessage: "Resource not accessible by integration (HTTP 403)",
        cause: "The default `GITHUB_TOKEN` doesn't have permission for what the job is trying to do (e.g. push commits, comment on PRs).",
        solution: "Grant the needed scopes with a top-level `permissions:` block, or use a PAT stored as a secret for cross-repo actions.",
        codeSnippet: "permissions:\n  contents: write\n  pull-requests: write",
        tags: ["permissions", "token"],
      },
      {
        id: "cerr-4",
        errorMessage: "npm ERR! could not determine executable to run / lockfile out of sync",
        cause: "`npm ci` requires `package-lock.json` to match `package.json` exactly; a stale or missing lockfile fails the install.",
        solution: "Commit an up-to-date lockfile (`npm install` then commit), and use `npm ci` (not `npm install`) in CI for reproducible builds.",
        tags: ["npm", "install"],
      },
      {
        id: "cerr-5",
        errorMessage: "The workflow is not valid. .github/workflows/ci.yml: (Line N) mapping values are not allowed",
        cause: "A YAML syntax error — usually wrong indentation, a tab character, or a missing colon/quote.",
        solution: "YAML is whitespace-sensitive: use spaces (never tabs) and consistent indentation. Validate with an editor's YAML linter before pushing.",
        tags: ["yaml", "syntax"],
      },
      {
        id: "cerr-6",
        errorMessage: "Error: Container action is only supported on Linux",
        cause: "A Docker-based action was run on a Windows or macOS runner, which don't support container actions.",
        solution: "Use `runs-on: ubuntu-latest` for jobs that use container actions, or switch to a JavaScript-based action.",
        tags: ["docker", "runners"],
      },
      {
        id: "cerr-7",
        errorMessage: "Job exceeded the maximum execution time / timed out",
        cause: "A step hung (often waiting for input, a flaky network call, or an infinite loop) and hit the runner's time limit.",
        solution: "Add a `timeout-minutes` to fail fast, run non-interactive flags on commands, and investigate the hanging step's logs.",
        codeSnippet: "jobs:\n  test:\n    timeout-minutes: 10",
        tags: ["timeout", "debugging"],
      },
    ],
    tools: [
      {
        id: "ctl-1",
        name: "GitHub Actions",
        description: "CI/CD built directly into GitHub repositories.",
        purpose: "Automation",
        whyUseIt: "No external service to configure — workflows live next to your code and run on GitHub's runners.",
        alternatives: "GitLab CI, CircleCI, Jenkins, Buildkite",
        bestFor: "Teams already hosting code on GitHub.",
        docsUrl: "https://docs.github.com/actions",
      },
      {
        id: "ctl-2",
        name: "Docker",
        description: "Containerize your app so it runs identically everywhere.",
        purpose: "Packaging",
        whyUseIt: "Eliminate 'works on my machine' by shipping the app with its exact environment.",
        alternatives: "Podman, Buildpacks, Nix",
        bestFor: "Any app deployed to more than one environment.",
        docsUrl: "https://docs.docker.com",
      },
      {
        id: "ctl-3",
        name: "Turborepo",
        description: "A high-performance build system for JavaScript/TypeScript monorepos.",
        purpose: "Build orchestration",
        whyUseIt: "Caches task outputs and only rebuilds what changed, cutting CI time dramatically in multi-package repos.",
        alternatives: "Nx, Bazel, Lerna",
        bestFor: "Monorepos where rebuilding everything on each push is too slow.",
        docsUrl: "https://turborepo.com/docs",
      },
      {
        id: "ctl-4",
        name: "Terraform",
        description: "Infrastructure as Code — define cloud resources in version-controlled files.",
        purpose: "Infrastructure",
        whyUseIt: "Provision and update servers, databases, and DNS reproducibly from your pipeline instead of clicking in a console.",
        alternatives: "Pulumi, AWS CDK, OpenTofu, Ansible",
        bestFor: "Teams managing real cloud infrastructure that must be repeatable.",
        docsUrl: "https://developer.hashicorp.com/terraform/docs",
      },
      {
        id: "ctl-5",
        name: "Sentry",
        description: "Error tracking and performance monitoring for production apps.",
        purpose: "Observability",
        whyUseIt: "Know immediately when a deploy introduces errors, with stack traces and the release that caused them.",
        alternatives: "Datadog, New Relic, Rollbar, Grafana",
        bestFor: "Any production app — close the loop between deploy and what users actually hit.",
        docsUrl: "https://docs.sentry.io",
      },
    ],
  },
];

export const challengeContent: Challenge[] = [
  {
    id: "ch-weather",
    slug: "weather-app-challenge",
    title: "Build a Weather App in a Weekend",
    description:
      "Pick any stack and build a polished weather app that pulls live data. Bonus points for nice loading states and error handling.",
    techSlug: "nextjs",
    techName: "Next.js",
    level: "BEGINNER",
    prize: "$200 + featured on the homepage",
    startDate: "2026-05-20",
    endDate: "2026-06-20",
    isActive: true,
    participants: 184,
    submissions: [
      {
        id: "sub-1",
        author: "maya.dev",
        avatarColor: "#2563eb",
        repoUrl: "https://github.com/maya-dev/skycast",
        demoUrl: "https://skycast.vercel.app",
        blurb: "SkyCast — animated weather cards with a 7-day forecast and geolocation.",
        votes: 92,
      },
      {
        id: "sub-2",
        author: "leon_codes",
        avatarColor: "#7c3aed",
        repoUrl: "https://github.com/leon/weatherly",
        demoUrl: "https://weatherly.app",
        blurb: "Weatherly — minimalist design with a dark/light auto theme.",
        votes: 67,
      },
      {
        id: "sub-3",
        author: "priya.builds",
        avatarColor: "#0ea5e9",
        repoUrl: "https://github.com/priya/forecastr",
        blurb: "Forecastr — focuses on accessibility and keyboard navigation.",
        votes: 41,
      },
    ],
  },
  {
    id: "ch-portfolio",
    slug: "portfolio-glow-up",
    title: "Portfolio Glow-Up",
    description:
      "Rebuild your developer portfolio with smooth animations. Show off your work and your motion-design skills.",
    techSlug: "nextjs",
    techName: "Next.js",
    level: "INTERMEDIATE",
    prize: "1-on-1 mentorship session",
    startDate: "2026-06-01",
    endDate: "2026-07-01",
    isActive: true,
    participants: 96,
    submissions: [
      {
        id: "sub-4",
        author: "deshawn.codes",
        avatarColor: "#8b5cf6",
        repoUrl: "https://github.com/deshawn/portfolio",
        demoUrl: "https://deshawn.dev",
        blurb: "Scroll-driven storytelling with anime.js timelines.",
        votes: 53,
      },
    ],
  },
  {
    id: "ch-flutter-game",
    slug: "flutter-mini-game",
    title: "Flutter Mini-Game Jam",
    description: "Build a small but complete mobile game in Flutter. Any genre — keep it fun and finishable in a week.",
    techSlug: "flutter",
    techName: "Flutter",
    level: "ADVANCED",
    prize: "Mechanical keyboard",
    startDate: "2026-03-01",
    endDate: "2026-03-15",
    isActive: false,
    participants: 142,
    submissions: [
      {
        id: "sub-5",
        author: "kenji.dev",
        avatarColor: "#02569B",
        repoUrl: "https://github.com/kenji/tap-dash",
        blurb: "Tap Dash — an endless runner with 60fps physics.",
        votes: 118,
      },
    ],
  },
];
