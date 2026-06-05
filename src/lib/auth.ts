// ============================================================================
//  Auth — lightweight signed-cookie sessions. No NextAuth, no passwords table.
// ----------------------------------------------------------------------------
//  The session is a small JSON payload (who you are) signed with SESSION_SECRET
//  using an HMAC so it can't be tampered with. Good enough for a workshop;
//  swap for a real auth provider in production.
//
//  Use it like this:
//    import { getCurrentUser } from "@/lib/auth";
//    const user = await getCurrentUser();      // null if signed out
//    if (!user) redirect("/login");
// ============================================================================
import { cookies } from "next/headers";
import crypto from "crypto";
import { db } from "@/lib/db";

const COOKIE_NAME = "cjbs_session";
const SECRET = process.env.SESSION_SECRET ?? "dev-secret";

export type SessionUser = {
  id: string;
  name: string;
  role: "student" | "staff";
  cjbsId: string;
  program?: string;
  department?: string;
  avatarInitials: string;
};

function sign(payload: string): string {
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

function verify(token: string): SessionUser | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const payload = Buffer.from(body, "base64url").toString();
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  if (sig !== expected) return null;
  try {
    return JSON.parse(payload) as SessionUser;
  } catch {
    return null;
  }
}

/** Validate credentials against the seeded users. Returns a session or null. */
export async function authenticate(loginId: string, password: string): Promise<SessionUser | null> {
  const id = loginId.trim();

  const student = await db.student.findUnique({ where: { cjbsId: id } });
  if (student && student.password === password) {
    return {
      id: student.id,
      name: student.name,
      role: "student",
      cjbsId: student.cjbsId,
      program: student.program,
      avatarInitials: student.avatarInitials,
    };
  }

  const staff = await db.staff.findUnique({ where: { staffId: id } });
  if (staff && staff.password === password) {
    return {
      id: staff.id,
      name: staff.name,
      role: "staff",
      cjbsId: staff.staffId,
      department: staff.department,
      avatarInitials: staff.avatarInitials,
    };
  }

  return null;
}

/** Write the session cookie (call from a route handler / server action). */
export async function createSession(user: SessionUser) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, sign(JSON.stringify(user)), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

/** Clear the session cookie. */
export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

/** Read the current user from the cookie. Returns null when signed out. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verify(token);
}
