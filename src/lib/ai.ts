// ============================================================================
//  AI helper — talk to any model via OpenRouter with one function.
// ----------------------------------------------------------------------------
//  Reads OPENROUTER_API_KEY + OPENROUTER_MODEL from .env (already wired).
//  Use it from a server component, route handler, or server action:
//
//    import { chat } from "@/lib/ai";
//    const reply = await chat([
//      { role: "system", content: "You are a helpful CJBS assistant." },
//      { role: "user", content: "Summarise this elective in one line." },
//    ]);
//
//  See src/app/api/ai/route.ts for a ready HTTP endpoint you can fetch().
// ============================================================================

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function chat(
  messages: ChatMessage[],
  opts: { model?: string; temperature?: number } = {}
): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key || key.includes("REPLACE_ME")) {
    return "⚠️ AI is not configured yet. Add a real OPENROUTER_API_KEY to .env (get one free at https://openrouter.ai/keys).";
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://cc.coded.kw",
      "X-Title": "CJBS x CODED Workshop",
    },
    body: JSON.stringify({
      model: opts.model ?? process.env.OPENROUTER_MODEL ?? "anthropic/claude-3.5-haiku",
      temperature: opts.temperature ?? 0.7,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}
