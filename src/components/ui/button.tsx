import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-cjbs-ink text-white hover:bg-black",
  secondary: "bg-cjbs-yellow text-cjbs-ink hover:brightness-95",
  outline: "border border-cjbs-line bg-white text-cjbs-ink hover:bg-cjbs-paper",
  ghost: "text-cjbs-ink hover:bg-cjbs-paper",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all",
        "disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-cjbs-yellow focus-visible:ring-offset-2",
        "active:translate-y-px",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
