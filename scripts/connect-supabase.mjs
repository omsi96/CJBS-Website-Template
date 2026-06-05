#!/usr/bin/env node
// ============================================================================
//  npm run connect:supabase
//  Friendly prompt to connect your own Supabase project. Writes the keys into
//  .env for you. Press Enter on every question to skip and stay on SQLite.
// ============================================================================
import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ENV_PATH = new URL("../.env", import.meta.url);

const c = {
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
};

function setEnvVar(env, key, value) {
  const line = `${key}="${value}"`;
  const re = new RegExp(`^${key}=.*$`, "m");
  return re.test(env) ? env.replace(re, line) : `${env.trimEnd()}\n${line}\n`;
}

async function main() {
  console.log(`\n${c.bold("🔌 Connect Supabase")} ${c.dim("(optional)")}`);
  console.log(
    c.dim(
      "The app already works on local SQLite. Connect Supabase only if you want\n" +
        "hosted Postgres / Supabase Auth / Storage. Find these at:\n" +
        "  Supabase dashboard → Project Settings → API\n" +
        "Press Enter to skip any field and keep using SQLite.\n"
    )
  );

  const rl = createInterface({ input, output });
  const projectUrl = (await rl.question(c.cyan("Project URL") + c.dim(" (https://xxxx.supabase.co): "))).trim();
  const anonKey = (await rl.question(c.cyan("Anon public key") + c.dim(" (eyJhbGci…): "))).trim();
  await rl.close();

  if (!projectUrl && !anonKey) {
    console.log(`\n${c.yellow("No values entered — staying on local SQLite. That's totally fine. 👍")}\n`);
    return;
  }

  let env = await readFile(ENV_PATH, "utf8");
  if (projectUrl) env = setEnvVar(env, "NEXT_PUBLIC_SUPABASE_URL", projectUrl);
  if (anonKey) env = setEnvVar(env, "NEXT_PUBLIC_SUPABASE_ANON_KEY", anonKey);
  await writeFile(ENV_PATH, env);

  console.log(`\n${c.green("✅ Saved to .env.")} You can now use ${c.bold('import { getSupabase } from "@/lib/supabase"')}.`);
  console.log(
    c.dim(
      "\nWant Supabase Postgres to be your MAIN database (instead of SQLite)?\n" +
        "  1. Add SUPABASE_DATABASE_URL to .env (Settings → Database → Connection string).\n" +
        '  2. In prisma/schema.prisma, set provider = "postgresql" and url = env("SUPABASE_DATABASE_URL").\n' +
        "  3. Run: npm run setup   (pushes the schema + seeds).\n" +
        "See docs/SUPABASE.md for the full walkthrough.\n"
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(0); // never hard-fail; this is optional
});
