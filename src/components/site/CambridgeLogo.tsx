// ============================================================================
//  CambridgeLogo — the official University of Cambridge / Judge Business School
//  lockup: the heraldic arms + serif wordmark, as a single brand asset.
//
//  Reuse this everywhere you need the brand mark (header, footer, auth, emails).
//  The official artwork lives at /public/cambridge-logo.png.
//
//    <CambridgeLogo />                 → full lockup, medium
//    <CambridgeLogo size="lg" />       → larger
//    <CambridgeLogo shieldOnly />      → just the crest
// ============================================================================
import Image from "next/image";
import { cn } from "@/lib/utils";

// Natural dimensions of the official artwork (public/cambridge-logo.png).
const LOGO_W = 403;
const LOGO_H = 112;
const RATIO = LOGO_W / LOGO_H;

// Heights (px) for the full lockup; shieldOnly uses the height as a square crest.
const SIZES = {
  sm: 28,
  md: 38,
  lg: 60,
} as const;

type Props = {
  size?: keyof typeof SIZES;
  shieldOnly?: boolean;
  className?: string;
};

export function CambridgeLogo({ size = "md", shieldOnly = false, className }: Props) {
  const h = SIZES[size];

  if (shieldOnly) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src="/cambridge-arms.svg"
          alt="University of Cambridge — Judge Business School"
          width={Math.round(h * 0.855)}
          height={h}
          priority
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/cambridge-logo.png"
        alt="University of Cambridge — Judge Business School"
        width={Math.round(h * RATIO)}
        height={h}
        priority
      />
    </span>
  );
}
