// ============================================================================
//  Supabase (OPTIONAL) — only active if you connected an account.
// ----------------------------------------------------------------------------
//  The template runs perfectly on local SQLite + Prisma (see src/lib/db.ts).
//  Supabase is here for teams who want hosted Postgres, Supabase Auth,
//  Storage, or Realtime. Connect with:   npm run connect:supabase
//
//  Usage (client or server):
//    import { getSupabase } from "@/lib/supabase";
//    const supabase = getSupabase();
//    if (!supabase) { /* not configured — fall back to Prisma */ }
//    const { data } = await supabase.from("my_table").select();
//
//  `isSupabaseEnabled()` lets you branch without throwing.
// ============================================================================
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function isSupabaseEnabled(): boolean {
  return Boolean(url && anonKey);
}

/** Returns a Supabase client, or null if no account is connected yet. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseEnabled()) return null;
  if (!client) client = createClient(url!, anonKey!);
  return client;
}
