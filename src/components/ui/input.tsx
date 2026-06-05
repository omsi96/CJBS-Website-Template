import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-cjbs-line bg-white px-4 text-[15px] text-cjbs-ink",
        "placeholder:text-cjbs-muted transition-colors",
        "focus-visible:outline-none focus-visible:border-cjbs-ink focus-visible:ring-2 focus-visible:ring-cjbs-yellow/40",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
