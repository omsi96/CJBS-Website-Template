# Auth & Seeded Community

## How sign-in works
- Users log in with a **CJBS ID** (students) or **Staff ID** (staff) + a password.
- `authenticate()` in `src/lib/auth.ts` checks the seeded `Student` / `Staff` rows.
- On success a small signed (HMAC) cookie session is set. Read it anywhere with
  `getCurrentUser()` → `{ id, name, role, cjbsId, program?, department?, avatarInitials }` or `null`.
- `createSession()` / `destroySession()` set/clear the cookie. The login + logout route handlers
  live at `src/app/api/auth/{login,logout}/route.ts`.

> Passwords are stored in plain text **on purpose** — it's a teaching template and the sign-in card
> shows the demo credentials. In a real app, store a bcrypt/argon2 hash and never display them.

## Demo credentials
- **Students** — password `student1234`. Example IDs: `MBA-2026-0142` (Aisha Al-Sabah),
  `MFN-2026-0061` (Chen Wei), `MST-2026-0019` (Omar Haddad).
- **Staff** — password `staff1234`. Example IDs: `STAFF-021` (Rajiv Menon, Careers),
  `STAFF-014` (Dr. Eleanor Vance, MBA Programme Director).

## What's seeded (see `prisma/seed.ts`)
- **12 students** across MBA / MFin / MST / MAcc / EMBA / PhD, cohorts 2024–2026.
- **5 staff** (programme director, careers, admissions, faculty, student experience).
- **8 electives** + a couple of selections for `MBA-2026-0142` (the example domain).

Re-seed anytime with `npm run db:seed`, or rebuild from scratch with `npm run db:reset`.
