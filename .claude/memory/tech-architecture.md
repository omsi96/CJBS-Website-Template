# Tech Architecture

## Stack
- **Next.js (App Router)** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens in `src/app/globals.css`)
- **Prisma + SQLite** (`prisma/dev.db`) — no migrations, just `db push`. Default DB.
- **Supabase** — OPTIONAL, off by default. `src/lib/supabase.ts` + `npm run connect:supabase`.
  Used only if a team connects an account; see `docs/SUPABASE.md`.
- Lightweight signed-cookie auth (no NextAuth)
- **OpenRouter** for LLM calls (`src/lib/ai.ts`)

For how to grow this cleanly (feature folders, where new files go), read `scalable-structure.md`.

## File map
```
src/
  app/
    layout.tsx           # Header + Footer wrap every page; fonts loaded here
    page.tsx             # landing page
    login/page.tsx       # sign-in
    dashboard/page.tsx   # auth-gated home + Electives example
    api/auth/{login,logout}/route.ts
    api/ai/route.ts      # example LLM endpoint
  components/
    ui/                  # Button, Card, Input, Label, Badge, Avatar, PageHeader, EmptyState, Stat
    site/                # Header, Footer (locked), SignInCard, CambridgeLogo
  lib/
    db.ts                # Prisma singleton  → import { db }
    auth.ts              # sessions          → import { getCurrentUser }
    ai.ts                # OpenRouter        → import { chat }
    supabase.ts          # optional Supabase → import { getSupabase }
prisma/
  schema.prisma          # models
  seed.ts                # demo data
scripts/
  connect-supabase.mjs   # `npm run connect:supabase` — guided optional setup
  welcome.mjs            # post-install nudge
```

## Commands
- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run db:push` — apply schema changes to dev.db
- `npm run db:seed` — (re)load demo data
- `npm run db:reset` — wipe + push + seed from scratch
- `npm run db:studio` — visual DB browser
- `npm run setup` — generate + push + seed (also runs on `npm install`)
- `npm run connect:supabase` — optional: connect a Supabase account (or skip → stay on SQLite)

## Adding a feature (the loop)
1. Model the data in `schema.prisma`, then `npm run db:push`.
2. (Optional) add demo rows to `seed.ts`, then `npm run db:seed`.
3. Build the page under `src/app/...` using `ui/` components + `db` + `getCurrentUser`.
4. Need an action/mutation? Add a route handler under `src/app/api/...` or use a server action.

Default to **server components**. Add `"use client"` only for interactive widgets.
