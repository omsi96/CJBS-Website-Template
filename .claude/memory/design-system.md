# Design System (LOCKED)

All visual decisions are made. **Do not introduce new colours or fonts.** Reuse tokens + components.

> **Maintain the style by default.** Unless the student *explicitly asks to customise* the look,
> keep every new screen on-brand using the tokens and components below. Match the existing pages.
> If they do ask to customise, change tokens in `globals.css` (one place) — never one-off colours.

## Colours (defined in `src/app/globals.css` as Tailwind tokens)
- `cjbs-yellow` `#FFC72C` — Cambridge Yellow, the house accent (buttons, highlights).
- `cjbs-crimson` `#A30234` — shield crimson (emphasis, stats, links).
- `cjbs-navy` `#0B2545` — deep institutional navy (sparingly).
- `cjbs-ink` `#16181D` — primary text / dark surfaces.
- `cjbs-muted` `#5B5E66` — secondary text.
- `cjbs-line` `#E6E7EA` — borders / hairlines.
- `cjbs-paper` `#F6F6F3` — off-white panels.

Use them as Tailwind classes: `bg-cjbs-yellow`, `text-cjbs-crimson`, `border-cjbs-line`, etc.

## Type
- **Display** (`font-display`): Bricolage Grotesque — headings only.
- **Body** (default): Hanken Grotesk.
- **Mono** (`font-mono`): Space Mono — labels, codes, kickers (uppercase, wide tracking).

Fonts are loaded in `src/app/layout.tsx`. Don't add more.

## Components — reuse these, don't rebuild
`src/components/ui/`:
- `Button` (variants: primary / secondary / outline / ghost; sizes sm / md / lg)
- `Card` (+ `CardHeader` / `CardTitle` / `CardContent` / `CardFooter`)
- `Input`, `Label`
- `Badge` (tones: neutral / yellow / crimson / green)
- `Avatar` (initials, sizes sm / md / lg)
- `PageHeader` (kicker + title + actions — use at the top of every screen)
- `EmptyState` (icon + title + description + optional action — for empty lists)
- `Stat` (big crimson number + label)

`src/components/site/`: `Header`, `Footer` (🔒 locked), `SignInCard`, `CambridgeLogo`.

**Brand mark:** always use `<CambridgeLogo />` for the University of Cambridge / Judge Business
School lockup (real heraldic arms at `/public/cambridge-arms.svg` + serif wordmark). Never paste a
raw `<img>` of the logo — reuse the component so sizing/spacing stays consistent.

When a screen needs a new pattern, compose it from these primitives first. Only add a new file to
`ui/` if the pattern is genuinely shared (see `scalable-structure.md`).

## Voice
Confident, minimal, institution-grade. Short headlines, one-line support copy. Match the existing
landing page tone. When in doubt, fewer words.
