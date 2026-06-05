# Workshop Guide — Scrum with CJBS x CODED

Welcome. This template exists so you can stop worrying about *how to build* and focus on
**what to build and why**. The infrastructure, design, auth, and a seeded community are done.
Your deliverable is a working product **driven by good requirements**.

You are the **Product Owner + Scrum team**. Claude is your developer. The quality of what you ship
depends almost entirely on the quality of your requirements.

---

## The loop you'll repeat

```
   Persona  →  PRD  →  Backlog of tickets  →  Sprint  →  Review  →  Retro
      ▲                                                              │
      └──────────────────────  refine  ◀─────────────────────────────┘
```

### Step 0 — Pick a project
Open [`PROJECT-IDEAS.md`](PROJECT-IDEAS.md) and choose one. Don't pick the biggest — pick the one
with the clearest first user story.

### Step 1 — Define the persona  ·  `/persona`
Who is this for? A first-year MBA? An admissions officer? Be specific. A vague persona produces
vague software. Template: [`PERSONA-TEMPLATE.md`](PERSONA-TEMPLATE.md).

### Step 2 — Write the PRD  ·  `/prd`
What are we building and why? Problem, goals, the core journey, success metrics, scope.
Template: [`PRD-TEMPLATE.md`](PRD-TEMPLATE.md). Keep every requirement **testable**.

### Step 3 — Build the backlog  ·  `/ticket`
Slice the PRD into small tickets. Each = one user story + acceptance criteria. If a ticket can't be
finished in one sitting, split it. Template: [`TICKET-TEMPLATE.md`](TICKET-TEMPLATE.md).

### Step 4 — Sprint
Hand Claude **one ticket at a time**. Let it build. Good tickets → good output. When Claude asks a
clarifying question, that usually means your requirement had a gap — answer it and update the ticket.

### Step 5 — Review & verify
Run `npm run dev`, open the app, and check the work against the **acceptance criteria** — not your
vibes. Did it meet the Given/When/Then? If not, that's feedback for the next ticket.

### Step 6 — Retro
What made Claude fast? What made it stall? Almost always: clarity of requirements. Adjust and repeat.

---

## Rules of the game
- **Don't ask Claude to design.** The look is locked. Ask for *behaviour and data*.
- **One ticket at a time.** Resist mega-prompts. Small, verifiable slices win.
- **Write acceptance criteria before building.** It's how you (and Claude) know when you're done.
- **The footer is locked** and the design system is fixed — see `.claude/memory/`.

## Getting set up
```bash
npm install      # installs deps, creates dev.db, seeds students/staff/electives
npm run dev      # http://localhost:3000
```
Sign in with `MBA-2026-0142` / `student1234` and explore the example before you start.
