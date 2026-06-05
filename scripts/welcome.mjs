#!/usr/bin/env node
// ============================================================================
//  Printed once after `npm install` finishes. Non-interactive on purpose so it
//  can never hang CI — it just nudges the team toward the next step.
// ============================================================================
import { readFile } from "node:fs/promises";

const b = (s) => `\x1b[1m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const y = (s) => `\x1b[33m${s}\x1b[0m`;
const g = (s) => `\x1b[32m${s}\x1b[0m`;

let env = "";
try {
  env = await readFile(new URL("../.env", import.meta.url), "utf8");
} catch {}

const hasSupabase = /NEXT_PUBLIC_SUPABASE_URL="https?:\/\/.+"/.test(env);
const hasKey = /OPENROUTER_API_KEY="sk-or-v1-(?!REPLACE_ME)/.test(env);

console.log(`
${b("🎓  CODED × Cambridge Judge Business School — template ready")}
${dim("────────────────────────────────────────────────────────────")}

  ${g("✓")} Database seeded (local SQLite) — 12 students + 5 staff
  ${g("✓")} Design system, auth, and landing page wired up

  ${b("Next:")}  npm run dev   ${dim("→ http://localhost:3000")}
  ${dim("Demo login:")} MBA-2026-0142 ${dim("/")} student1234

  ${b("Database:")} ${hasSupabase ? g("Supabase connected ✓") : "local SQLite " + dim("(great default)")}
  ${hasSupabase ? "" : dim("   Optional: ") + y("npm run connect:supabase") + dim("  to use your own Supabase. Keeping SQLite is fine!")}
  ${hasKey ? g("  AI key set ✓") : dim("   AI: add a key to OPENROUTER_API_KEY in .env to enable the assistant.")}

  ${b("Build your project:")} open ${y("docs/WORKSHOP-GUIDE.md")} and ${y("docs/PROJECT-IDEAS.md")}
${dim("────────────────────────────────────────────────────────────")}
`);
