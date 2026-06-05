// ============================================================================
//  Shared site footer — rendered on every page via src/app/layout.tsx.
// ============================================================================
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
          <p>© {2026} University of Cambridge Judge Business School</p>
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
