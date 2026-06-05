# Connecting Supabase (optional)

**You do not need this.** The template ships with local **SQLite + Prisma** and works out of the
box — zero setup, no account, perfect for the workshop. Connect Supabase only if your team wants
hosted Postgres, Supabase Auth, Storage, or Realtime.

> Keeping the default SQLite is a perfectly good choice. Skip this whole file if in doubt.

---

## Option A — Use Supabase for Auth / Storage / Realtime (keep SQLite for data)

1. Create a free project at [supabase.com](https://supabase.com).
2. Run the guided prompt:
   ```bash
   npm run connect:supabase
   ```
   Paste your **Project URL** and **anon public key** (Supabase → Project Settings → API).
   These get written into `.env` for you.
3. Use it anywhere:
   ```ts
   import { getSupabase } from "@/lib/supabase";

   const supabase = getSupabase();        // null if not connected
   const { data } = await supabase!.storage.from("avatars").list();
   ```

Your Prisma/SQLite data layer keeps working exactly as before.

---

## Option B — Make Supabase Postgres your MAIN database (replace SQLite)

Do this if you want all your Prisma models to live in hosted Postgres.

1. Get your connection string: Supabase → **Project Settings → Database → Connection string →
   "URI"** (use the **Connection pooling** string for serverless). Add it to `.env`:
   ```env
   SUPABASE_DATABASE_URL="postgresql://postgres.xxxx:[PASSWORD]@aws-0-...pooler.supabase.com:6543/postgres"
   ```
2. In `prisma/schema.prisma`, switch the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("SUPABASE_DATABASE_URL")
   }
   ```
3. Push the schema and seed:
   ```bash
   npm run setup
   ```

That's it — `import { db } from "@/lib/db"` now talks to Supabase Postgres. Everything else
(auth, pages, components) is unchanged.

---

## Switching back to SQLite

Set the provider back to `sqlite` + `url = env("DATABASE_URL")` in `prisma/schema.prisma`, then
`npm run db:reset`. Nothing else needs to change.
