// ============================================================================
//  CambridgeLogo — the official-style University of Cambridge / Judge Business
//  School lockup: the heraldic arms + serif wordmark.
//
//  Reuse this everywhere you need the brand mark (header, footer, auth, emails).
//  The shield art lives at /public/cambridge-arms.svg (faithful heraldic vector).
//
//    <CambridgeLogo />                 → full lockup, medium
//    <CambridgeLogo size="lg" />       → larger
//    <CambridgeLogo shieldOnly />      → just the crest
// ============================================================================
import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: { shield: 28, title: "text-[10px]", sub: "text-[11px]", gap: "gap-2" },
  md: { shield: 36, title: "text-[11px]", sub: "text-sm", gap: "gap-2.5" },
  lg: { shield: 56, title: "text-sm", sub: "text-lg", gap: "gap-3.5" },
} as const;

type Props = {
  size?: keyof typeof SIZES;
  shieldOnly?: boolean;
  className?: string;
};

export function CambridgeLogo({ size = "md", shieldOnly = false, className }: Props) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-center", s.gap, className)}>
      <Image
        src="/cambridge-arms.svg"
        alt="University of Cambridge — Judge Business School"
        width={Math.round(s.shield * 0.855)}
        height={s.shield}
        priority
      />
      {!shieldOnly && (
        <span className="font-serif leading-tight">
          <span className={cn("block font-bold uppercase tracking-[0.12em] text-cjbs-ink", s.title)}>
            University of Cambridge
          </span>
          <span className={cn("block text-cjbs-muted", s.sub)}>Judge Business School</span>
        </span>
      )}
    </span>
  );
}
