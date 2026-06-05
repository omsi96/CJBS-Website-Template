import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Consistent page title block. Use at the top of every screen so all pages
 * in the cohort share the same rhythm.
 *
 *   <PageHeader kicker="MBA · MBA-2026-0142" title="Welcome back, Aisha."
 *               actions={<Button>New</Button>}>
 *     Optional supporting copy.
 *   </PageHeader>
 */
export function PageHeader({
  kicker,
  title,
  actions,
  children,
  className,
}: {
  kicker?: string;
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
      <div>
        {kicker && (
          <p className="font-mono text-xs uppercase tracking-widest text-cjbs-muted">{kicker}</p>
        )}
        <h1 className="mt-1 font-display text-4xl font-extrabold text-cjbs-ink">{title}</h1>
        {children && <p className="mt-2 max-w-xl text-cjbs-muted">{children}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
