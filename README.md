<div align="center">

# CJBS × CODED — Website Template

**A turnkey baseline for the CODED × Cambridge Judge Business School Scrum workshop.**
Fork it, clone it, and build your product on top — the boring parts are already done.

</div>

---

## Why this exists

This workshop teaches **Scrum and product management**, not web development. So the website's
*infrastructure* and *design* are already solved. Your team's job is to **write great requirements**
— personas, PRDs, tickets — and let Claude build the features. Every team starts from the same
polished baseline, so nobody waits hours for scaffolding.

**What's already built for you:**
- 🎨 A Cambridge-branded **landing page**, **design system**, and a **shared locked footer**.
- 🔐 A **ready sign-in** flow with a database **pre-seeded with students & staff** — no account creation.
- 🗄️ **SQLite + Prisma** wired up; add a table in seconds. (Optional **Supabase** in one command.)
- 🤖 **OpenRouter** AI helper ready to call.
- 🧭 **Claude infra** (`CLAUDE.md` + `.claude/memory/`) so Claude already knows the architecture.
- 📋 **Scrum scaffolding**: PRD / ticket / persona templates, a workshop guide, and 9 project ideas.

## Quick start

```bash
npm install      # installs deps AND creates + seeds the database automatically
npm run dev      # → http://localhost:3000
```

> **Database:** runs on local **SQLite** out of the box — nothing to configure. Want your own
> hosted **Supabase** instead? Run `npm run connect:supabase` (optional — keeping SQLite is fine).
> See [`docs/SUPABASE.md`](docs/SUPABASE.md).

Sign in with a seeded account (shown right on the login page):

| Account | CJBS / Staff ID | Password |
|---------|-----------------|----------|
| Student (Aisha, MBA) | `MBA-2026-0142` | `student1234` |
| Student (Chen, MFin) | `MFN-2026-0061` | `student1234` |
| Staff (Rajiv, Careers) | `STAFF-021` | `staff1234` |

## Build your project

1. Read **[`docs/WORKSHOP-GUIDE.md`](docs/WORKSHOP-GUIDE.md)** — the Scrum loop you'll follow.
2. Pick an idea from **[`docs/PROJECT-IDEAS.md`](docs/PROJECT-IDEAS.md)**.
3. Use the slash commands with Claude: `/persona`, `/prd`, `/ticket`.
4. Hand Claude one ticket at a time. Verify against acceptance criteria. Repeat.

The **Elective Selections** feature is included as a worked example (schema → seed → dashboard).
Study it, then replace it with your own project.

## Project structure

```
src/app/        pages + API routes (landing, login, dashboard)
src/components/  ui/ primitives + site/ (Header, Footer 🔒, SignInCard)
src/lib/        db.ts · auth.ts · ai.ts
prisma/         schema.prisma + seed.ts  (SQLite at prisma/dev.db)
docs/           workshop guide, ideas, PRD/ticket/persona templates
.claude/        CLAUDE.md conventions, memory/, and /prd /ticket /persona commands
```

## ⚠️ About the committed `.env` key

This template **intentionally commits `.env`** with an OpenRouter key placeholder so the workshop
works out of the box. **This is a teaching shortcut.** Two things to know:
- Replace `sk-or-v1-REPLACE_ME` in `.env` with a real workshop key (free at
  [openrouter.ai/keys](https://openrouter.ai/keys)).
- **Rotate / delete that key after the workshop.** In a real project, `.env` belongs in
  `.gitignore` and secrets never get committed.

## Tech
Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Prisma · SQLite (+ optional Supabase) · OpenRouter.

---

<div align="center">
Built with <strong>CODED</strong> for <strong>Cambridge Judge Business School</strong>.
</div>
