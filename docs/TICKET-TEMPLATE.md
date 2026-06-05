# Ticket — <short title>

> One small, shippable slice. If it can't be finished in one sitting, split it.

## User story
**As a** <persona>
**I want** <capability>
**so that** <benefit>.

## Acceptance criteria
> The definition of done. Write these BEFORE building. Verify against them, not vibes.
- **Given** <context> **when** <action> **then** <observable result>.
- **Given** … **when** … **then** …

## Scope
- In scope: …
- Out of scope: …

## Notes for the developer (Claude)
> Which part of the architecture this touches. Reference `CLAUDE.md`.
- Data: <new/changed Prisma models?>
- Pages/routes: <which `src/app/...`?>
- Reuse: <which existing components / lib helpers?>

## Definition of done
- [ ] Meets every acceptance criterion
- [ ] Uses existing design-system components (no new colours/fonts)
- [ ] Footer untouched
- [ ] Verified in the running app (`npm run dev`)
