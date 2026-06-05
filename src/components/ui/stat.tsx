import { cn } from "@/lib/utils";

/** Big-number stat (the crimson figures used on the landing page). */
export function Stat({
  value,
  label,
  className,
}: {
  value: string | number;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="font-display text-4xl font-extrabold text-cjbs-crimson">{value}</div>
      <p className="mt-2 text-sm text-cjbs-muted">{label}</p>
    </div>
  );
}
