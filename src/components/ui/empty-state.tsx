import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Friendly "nothing here yet" panel. Reuse for empty lists.
 *
 *   <EmptyState icon="🗂️" title="No applications yet"
 *               description="Start one to see it here.">
 *     <Button>New application</Button>
 *   </EmptyState>
 */
export function EmptyState({
  icon = "✨",
  title,
  description,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 text-3xl" aria-hidden>
          {icon}
        </div>
        <h3 className="font-display text-lg font-bold text-cjbs-ink">{title}</h3>
        {description && <p className="mt-1 max-w-sm text-sm text-cjbs-muted">{description}</p>}
        {children && <div className="mt-5">{children}</div>}
      </CardContent>
    </Card>
  );
}
