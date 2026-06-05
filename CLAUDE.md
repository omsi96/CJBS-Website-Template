# CLAUDE.md — read me first

You are working inside a **CODED × Cambridge Judge Business School** workshop project.
This repo is a *template*: the infrastructure, design system, auth, and a seeded database
already exist. The student's job is to **write good requirements** (PRDs, tickets, personas)
and have you build features quickly and on-brand.

Your job: implement what the requirements ask for **without breaking the shared baseline**.

## Golden rules

1. **Maintain the style — do NOT redesign.** Colours, fonts, spacing, and components come from the
   design system. Reuse `src/components/ui/*` and the tokens in `src/app/globals.css`. Never
   introduce new fonts or a new colour palette. **Keep new screens on-brand by default; only
   customise the look when the student explicitly asks.** See `.claude/memory/design-system.md`.
2. **The footer is owner-maintained.** `src/components/site/Footer.tsx` is shared across the
   cohort, so treat changes as deliberate, not casual. Edit it when the facilitator/repo owner
   asks; otherwise leave it alone. See `.claude/memory/footer-locked.md`.
3. **Reuse the baseline.** Auth (`src/lib/auth.ts`), the DB client (`src/lib/db.ts`), and the
   AI helper (`src/lib/ai.ts`) are done. Import them — don't reinvent them.
4. **Stay inside the architecture.** New data → a Prisma model + `npm run db:push`. New screen →
   a folder under `src/app/`. New server logic → a route handler under `src/app/api/`. Follow the
   feature-folder conventions in `.claude/memory/scalable-structure.md` so the codebase scales.
5. **Keep it simple.** This is SQLite + server components. Prefer server components and server
   actions/route handlers over client state. Add a `"use client"` component only when you need
   interactivity (like `SignInCard.tsx`).

## Architecture at a glance

| Concern        | Where                                   | Notes                                            |
|----------------|-----------------------------------------|--------------------------------------------------|
| Pages / routes | `src/app/<route>/page.tsx`              | App Router, server components by default         |
| API endpoints  | `src/app/api/<name>/route.ts`           | `POST`/`GET` handlers                            |
| Database       | `prisma/schema.prisma` → `npm run db:push` | SQLite at `prisma/dev.db`                      |
| Seed data      | `prisma/seed.ts` → `npm run db:seed`    | Students, staff, example electives               |
| DB access      | `import { db } from "@/lib/db"`         | Prisma client singleton                          |
| Auth           | `import { getCurrentUser } from "@/lib/auth"` | Signed-cookie session; CJBS ID + password  |
| AI / LLM       | `import { chat } from "@/lib/ai"`       | OpenRouter, key in `.env`                         |
| Supabase (opt) | `import { getSupabase } from "@/lib/supabase"` | Off by default; `npm run connect:supabase` |
| UI primitives  | `src/components/ui/*`                    | `Button`, `Card`, `Input`, `Label`, `Badge`, `Avatar`, `PageHeader`, `EmptyState`, `Stat` |
| Brand layout   | `src/components/site/*`                  | `Header`, `Footer` (locked), `CambridgeLogo`     |

## Recipes (how to add things)

**Add a data model**
```prisma
// prisma/schema.prisma
model Application {
  id        String   @id @default(cuid())
  student   Student  @relation(fields: [studentId], references: [id])
  studentId String
  status    String   @default("draft")
  createdAt DateTime @default(now())
}
```
Then: `npm run db:push` (and add rows in `prisma/seed.ts` + `npm run db:seed` if you want demo data).

**Add a page**
```tsx
// src/app/applications/page.tsx
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return null;
  const apps = await db.application.findMany({ where: { studentId: user.id } });
  // ...render with <Card>, <Badge>, etc.
}
```

**Add an API route** → `src/app/api/applications/route.ts` exporting `POST`/`GET`.

**Gate a page to signed-in users**
```tsx
const user = await getCurrentUser();
if (!user) redirect("/login");
```

## What's already built (don't rebuild)

- Branded **landing page** (`src/app/page.tsx`), **login** (`/login`), **dashboard** (`/dashboard`).
- **Ready sign-in** (`SignInCard.tsx`) with demo credentials shown.
- **Seeded community**: 12 students + 5 staff (password `student1234` / `staff1234`).
- **Example domain**: Elective Selections (`Elective`, `ElectiveSelection`) — a reference slice
  you can delete when the student's real project begins.

## The workshop, not the code

The point of this exercise is **Scrum and product thinking**, not raw coding. When a student gives
you vague work, push back like a good engineer: ask for the user story, acceptance criteria, and
which persona it serves. The templates in `docs/` and the `/prd`, `/ticket`, `/persona` commands
exist for exactly this.
