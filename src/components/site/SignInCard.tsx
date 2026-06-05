"use client";
// ============================================================================
//  READY sign-in component. Drop it anywhere. It posts to /api/auth/login,
//  sets the session cookie, and redirects to /dashboard.
//  The demo credentials are shown on purpose — this is a teaching template.
// ============================================================================
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO = [
  { cjbsId: "MBA-2026-0142", name: "Aisha Al-Sabah", program: "MBA" },
  { cjbsId: "MFN-2026-0061", name: "Chen Wei", program: "MFin" },
  { cjbsId: "STAFF-021", name: "Rajiv Menon", program: "Staff · Careers" },
];

export function SignInCard() {
  const router = useRouter();
  const [cjbsId, setCjbsId] = useState("MBA-2026-0142");
  const [password, setPassword] = useState("student1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cjbsId, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Invalid CJBS ID or password.");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in to continue</CardTitle>
        <p className="mt-1 text-sm text-cjbs-muted">Use your CJBS ID to pick up where you left off.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="cjbsId">CJBS ID</Label>
            <Input
              id="cjbsId"
              value={cjbsId}
              onChange={(e) => setCjbsId(e.target.value)}
              placeholder="MBA-2026-0142"
              autoComplete="username"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm font-medium text-cjbs-crimson">{error}</p>}

          <Button type="submit" size="lg" variant="secondary" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        {/* Demo credentials — visible by design for the workshop */}
        <div className="mt-6 rounded-xl border border-dashed border-cjbs-line bg-cjbs-paper p-4">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-cjbs-muted">
            Demo accounts · password for all
            <span className="ml-1 rounded bg-cjbs-yellow/30 px-1.5 py-0.5 text-cjbs-ink">student1234</span>
            <span className="text-cjbs-muted"> / staff </span>
            <span className="rounded bg-cjbs-yellow/30 px-1.5 py-0.5 text-cjbs-ink">staff1234</span>
          </p>
          <div className="mt-3 space-y-1.5">
            {DEMO.map((d) => (
              <button
                key={d.cjbsId}
                type="button"
                onClick={() => {
                  setCjbsId(d.cjbsId);
                  setPassword(d.cjbsId.startsWith("STAFF") ? "staff1234" : "student1234");
                }}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-white"
              >
                <span className="font-medium text-cjbs-ink">{d.name}</span>
                <span className="font-mono text-xs text-cjbs-muted">{d.cjbsId} · {d.program}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
