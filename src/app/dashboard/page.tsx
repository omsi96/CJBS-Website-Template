import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // ---- EXAMPLE DOMAIN: pull this student's elective selections + the catalogue.
  // This whole block is illustrative. Delete it and build your own project here.
  const selections =
    user.role === "student"
      ? await db.electiveSelection.findMany({
          where: { studentId: user.id },
          include: { elective: true },
        })
      : [];
  const electives = await db.elective.findMany({ orderBy: { code: "asc" } });
  const chosen = new Set(selections.map((s) => s.electiveId));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Greeting */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cjbs-muted">
            {user.role === "staff" ? user.department : `${user.program} · ${user.cjbsId}`}
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold text-cjbs-ink">
            Welcome back, {user.name.split(" ")[0]}.
          </h1>
          <p className="mt-2 max-w-xl text-cjbs-muted">
            This dashboard is your project&apos;s home. Below is the <strong>Elective Selections</strong>{" "}
            example — a working vertical slice (schema → seed → page) you can study, then replace.
          </p>
        </div>
        <form action="/api/auth/logout" method="post">
          <Button variant="outline" size="sm">Sign out</Button>
        </form>
      </div>

      {/* Example: my selections */}
      {user.role === "student" && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold text-cjbs-ink">Your electives</h2>
          {selections.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-cjbs-muted">
                You haven&apos;t selected any electives yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {selections.map((s) => (
                <Card key={s.id}>
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="text-lg">{s.elective.title}</CardTitle>
                    <Badge tone={s.status === "confirmed" ? "green" : "yellow"}>{s.status}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-xs text-cjbs-muted">
                      {s.elective.code} · {s.elective.term} · {s.elective.schedule}
                    </p>
                    <p className="mt-2 text-sm text-cjbs-muted">{s.elective.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Example: catalogue */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl font-bold text-cjbs-ink">Elective catalogue</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {electives.map((e) => (
            <Card key={e.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col pt-6">
                <div className="flex items-center justify-between">
                  <Badge tone="neutral">{e.code}</Badge>
                  {chosen.has(e.id) && <Badge tone="green">selected</Badge>}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-cjbs-ink">{e.title}</h3>
                <p className="mt-1 font-mono text-xs text-cjbs-muted">
                  {e.department} · {e.faculty}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cjbs-muted">{e.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-cjbs-muted">
                  <span>{e.term} · {e.schedule}</span>
                  <span>{e.credits} credits · cap {e.capacity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <p className="mt-12 rounded-xl border border-dashed border-cjbs-line bg-cjbs-paper p-4 text-sm text-cjbs-muted">
        🧭 <strong className="text-cjbs-ink">Next step:</strong> open{" "}
        <code className="font-mono text-cjbs-crimson">docs/WORKSHOP-GUIDE.md</code> and{" "}
        <code className="font-mono text-cjbs-crimson">docs/PROJECT-IDEAS.md</code>, pick your project,
        and write your first PRD with <code className="font-mono">/prd</code>.
      </p>
    </div>
  );
}
