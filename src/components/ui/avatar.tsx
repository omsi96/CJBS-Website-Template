import { cn } from "@/lib/utils";

const sizes = { sm: "h-8 w-8 text-[11px]", md: "h-10 w-10 text-xs", lg: "h-14 w-14 text-base" };

/** Initials avatar in brand crimson. Pass `initials` (e.g. "AA"). */
export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-cjbs-crimson font-bold text-white",
        sizes[size],
        className
      )}
    >
      {initials}
    </span>
  );
}
