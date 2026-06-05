# Scalable Structure — how to grow this codebase without making a mess

The baseline is deliberately small. As features land, follow these conventions so the project
stays easy to navigate at 5 features or 50. **Reuse before you create.**

## The golden order (check before writing new code)

1. **Can an existing component do it?** Reuse `src/components/ui/*` and `src/components/site/*`.
2. **Can an existing lib do it?** `@/lib/db`, `@/lib/auth`, `@/lib/ai`, `@/lib/supabase`.
3. **Only then** create something new — and put it in the right place (below).

## Where things go

```
src/
  app/
    <feature>/                 # one folder per feature area (e.g. electives, admissions)
      page.tsx                 # the screen (server component by default)
      [id]/page.tsx            # detail routes via dynamic segments
      _components/             # components used ONLY by this feature (underscore = private)
      actions.ts               # server actions ("use server") for this feature's mutations
    api/<feature>/route.ts     # HTTP endpoints when you need fetch() / webhooks
  components/
    ui/                        # SHARED, generic primitives (Button, Card, Avatar, …)
    site/                      # SHARED brand chrome (Header, Footer 🔒, CambridgeLogo)
  lib/
    <feature>.ts               # data-access + business logic for a feature (queries, helpers)
    db.ts · auth.ts · ai.ts · supabase.ts   # shared infra — already built
prisma/
  schema.prisma                # one model block per entity; group a feature's models together
```

### Rules of thumb
- **Co-locate first.** A component used by one screen lives in that route's `_components/`.
  Promote it to `src/components/ui/` only when a *second* feature needs it.
- **Keep queries out of components.** Put DB reads/writes in `src/lib/<feature>.ts` (or a server
  action), and call them from the page. Pages stay about layout; libs stay about data.
- **Server by default.** Fetch in server components. Add `"use client"` only for interactivity.
- **Mutations** → a server action in `actions.ts` *or* an API route. Don't mutate from a client fetch
  unless you need an external caller.
- **Naming:** folders/routes `kebab-case`; components `PascalCase`; lib files `kebab-case`.

## Adding a feature — the repeatable recipe

1. **Model** the data in `prisma/schema.prisma` → `npm run db:push` (+ `seed.ts` for demo rows).
2. **Data layer**: `src/lib/<feature>.ts` exporting typed query/mutation functions.
3. **Screen**: `src/app/<feature>/page.tsx`, gated with `getCurrentUser()`, composed from `ui/`.
4. **Feature parts**: anything reused within the feature → `src/app/<feature>/_components/`.
5. **Mutations**: `actions.ts` (server actions) or `src/app/api/<feature>/route.ts`.

Following this, every feature looks the same, so the next ticket is fast to place and review.

## Do NOT

- Introduce a new design language, font, colour, or UI kit (see `design-system.md`).
- Edit the locked footer (`footer-locked.md`).
- Put data-fetching logic inside shared `ui/` components.
- Reach into `prisma/dev.db` directly — always go through `@/lib/db`.
