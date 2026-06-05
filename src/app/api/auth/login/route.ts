import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { cjbsId, password } = await req.json().catch(() => ({}));
  if (!cjbsId || !password) {
    return NextResponse.json({ error: "CJBS ID and password are required." }, { status: 400 });
  }

  const user = await authenticate(cjbsId, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid CJBS ID or password." }, { status: 401 });
  }

  await createSession(user);
  return NextResponse.json({ ok: true, user });
}
