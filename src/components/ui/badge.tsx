import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "yellow" | "crimson" | "green";

const tones: Record<Tone, string> = {
  neutral: "bg-cjbs-paper text-cjbs-muted border-cjbs-line",
  yellow: "bg-cjbs-yellow/20 text-cjbs-ink border-cjbs-yellow/40",
  crimson: "bg-cjbs-crimson/10 text-cjbs-crimson border-cjbs-crimson/20",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold font-mono uppercase tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
