// Example AI endpoint. POST { messages: [{role, content}] } → { reply }.
// Powered by OpenRouter via src/lib/ai.ts. Delete or adapt for your project.
import { NextResponse } from "next/server";
import { chat, type ChatMessage } from "@/lib/ai";

export async function POST(req: Request) {
  const { messages } = (await req.json().catch(() => ({}))) as { messages?: ChatMessage[] };
  if (!messages?.length) {
    return NextResponse.json({ error: "Provide a `messages` array." }, { status: 400 });
  }
  try {
    const reply = await chat(messages);
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
