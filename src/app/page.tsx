import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";

const rankings = [
  { stat: "#1", label: "Business & Management research in the UK" },
  { stat: "#1", label: "One-year MBA in the United Kingdom" },
  { stat: "47", label: "Nationalities in the current MBA cohort" },
  { stat: "1990", label: "Founded — part of the University of Cambridge" },
];

const programmes = [
  { name: "MBA", blurb: "A transformative one-year programme for experienced professionals.", term: "12 months" },
  { name: "Master of Finance", blurb: "For finance professionals ready to accelerate into senior roles.", term: "9 months" },
  { name: "Executive MBA", blurb: "Lead while you learn, without stepping away from your career.", term: "20 months" },
  { name: "Executive Education", blurb: "Open and custom programmes for individuals and organisations.", term: "Flexible" },
];

export default async function LandingPage() {
  const user = await getCurrentUser();

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-cjbs-line">
        {/* soft brand wash */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 520px at 88% -10%, rgba(255,199,44,0.22), transparent 60%), radial-gradient(700px 500px at -5% 110%, rgba(163,2,52,0.10), transparent 60%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="animate-rise">
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-cjbs-ink sm:text-6xl">
              Leading business <span className="text-cjbs-crimson">minds</span>.
              <br />
              Built by <span className="text-cjbs-ink underline decoration-cjbs-yellow decoration-[6px] underline-offset-4">you</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cjbs-muted">
              This is your team&apos;s starting point. The infrastructure, design, and a community of
              students are already here. Your job is to decide <em>what to build</em> — write the
              requirements, and ship it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary">Continue your journey →</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="lg" variant="secondary">Sign in to continue →</Button>
                </Link>
              )}
              <a href="#programmes">
                <Button size="lg" variant="outline">Explore programmes</Button>
              </a>
            </div>
          </div>

          {/* Hero card / crest */}
          <div className="animate-rise flex items-center justify-center" style={{ animationDelay: "120ms" }}>
            <Card className="w-full max-w-sm overflow-hidden">
              <div className="flex items-center justify-center bg-cjbs-paper py-10">
                <Image src="/cjbs-shield.svg" alt="CJBS crest" width={96} height={120} />
              </div>
              <CardContent className="pt-6">
                <p className="font-mono text-xs uppercase tracking-widest text-cjbs-muted">The brief</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-cjbs-ink">
                  An app waiting to be built.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cjbs-muted">
                  The landing page, auth, database, and design system are done. Pick a project,
                  write a great PRD, and let Claude do the building.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================== RANKINGS ========================== */}
      <section className="border-b border-cjbs-line bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-6 py-12 md:grid-cols-4">
          {rankings.map((r) => (
            <div key={r.label} className="px-4 text-center">
              <div className="font-display text-4xl font-extrabold text-cjbs-crimson">{r.stat}</div>
              <p className="mt-2 text-sm text-cjbs-muted">{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= PROGRAMMES ========================= */}
      <section id="programmes" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <Badge className="mb-3">Discover</Badge>
            <h2 className="font-display text-3xl font-extrabold text-cjbs-ink sm:text-4xl">
              Programmes & opportunities
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-cjbs-muted md:block">
            These cards are placeholder content — replace them with your project once you start building.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((p) => (
            <Card key={p.name} className="group transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="flex h-full flex-col pt-6">
                <Badge tone="neutral" className="mb-4 self-start">{p.term}</Badge>
                <h3 className="font-display text-xl font-bold text-cjbs-ink">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cjbs-muted">{p.blurb}</p>
                <span className="mt-4 text-sm font-semibold text-cjbs-crimson transition-transform group-hover:translate-x-1">
                  Learn more →
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* =========================== CTA ============================= */}
      <section className="border-y border-cjbs-line bg-cjbs-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-white">Ready to start building?</h2>
            <p className="mt-2 max-w-lg text-cjbs-line">
              Sign in as a seeded student, open <code className="font-mono text-cjbs-yellow">docs/WORKSHOP-GUIDE.md</code>, and run your first sprint.
            </p>
          </div>
          <Link href={user ? "/dashboard" : "/login"}>
            <Button size="lg" variant="secondary">{user ? "Go to dashboard" : "Sign in"} →</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
