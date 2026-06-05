// ============================================================================
//  🔒 LOCKED SHARED FOOTER — do not edit per-project.
//  Every website built from this template shares this footer so the workshop
//  cohort stays visually consistent. See .claude/memory/footer-locked.md.
//  If you genuinely need a change, raise it with the workshop facilitator.
// ============================================================================
import Image from "next/image";
import { CambridgeLogo } from "@/components/site/CambridgeLogo";

const columns = [
  {
    title: "Programmes",
    links: ["MBA", "Executive MBA", "Master of Finance", "PhD", "Executive Education"],
  },
  {
    title: "For Students",
    links: ["Electives", "Careers", "Onboarding", "Community", "Student Services"],
  },
  {
    title: "About",
    links: ["The School", "Faculty & Research", "Insights", "News Room", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-cjbs-line bg-cjbs-paper">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <CambridgeLogo size="lg" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cjbs-muted">
              Trumpington Street, Cambridge CB2 1AG, United Kingdom
            </p>

            {/* CODED workshop attribution — shown on every site cloned from this template */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cjbs-line bg-white px-3.5 py-2">
              <span className="flex h-2 w-2 rounded-full bg-cjbs-yellow" />
              <span className="text-sm font-medium text-cjbs-ink">Built in a</span>
              <Image src="/coded-logo.svg" alt="CODED" width={72} height={22} className="inline-block translate-y-px" />
              <span className="text-sm font-medium text-cjbs-ink">workshop</span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-cjbs-ink">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-cjbs-muted transition-colors hover:text-cjbs-ink">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cjbs-line pt-6 text-xs text-cjbs-muted sm:flex-row sm:items-center">
          <p>© {2026} University of Cambridge Judge Business School · Built in a CODED workshop</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-cjbs-ink">Privacy</a>
            <a href="#" className="hover:text-cjbs-ink">Accessibility</a>
            <a href="#" className="hover:text-cjbs-ink">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
