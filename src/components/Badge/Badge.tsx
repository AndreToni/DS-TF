import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import "./Badge.css";

type Tone = "neutral" | "accent" | "info" | "success" | "warning" | "error";
type Appearance = "filled" | "subtle" | "outline";

const toneAppearanceClass: Record<Tone, Record<Appearance, string>> = {
  neutral: {
    filled: "bg-ink-primary text-white",
    subtle: "bg-surface-medium text-ink-primary",
    outline: "border border-line-dark text-ink-primary bg-transparent",
  },
  accent: {
    filled: "bg-accent-primary text-white",
    subtle: "bg-accent-bg text-accent-primary",
    outline: "border border-accent-primary text-accent-primary bg-transparent",
  },
  info: {
    filled: "bg-info-primary text-white",
    subtle: "bg-info-light text-info-medium",
    outline: "border border-info-primary text-info-medium bg-transparent",
  },
  success: {
    filled: "bg-success-primary text-white",
    subtle: "bg-success-light text-success-medium",
    outline: "border border-success-primary text-success-medium bg-transparent",
  },
  warning: {
    filled: "bg-warning-primary text-warning-contrast",
    subtle: "bg-warning-light text-warning-medium",
    outline: "border border-warning-primary text-warning-medium bg-transparent",
  },
  error: {
    filled: "bg-error-primary text-white",
    subtle: "bg-error-light text-error-medium",
    outline: "border border-error-primary text-error-medium bg-transparent",
  },
};

const dotColorClass: Record<Tone, string> = {
  neutral: "bg-ink-secondary",
  accent: "bg-accent-primary",
  info: "bg-info-primary",
  success: "bg-success-primary",
  warning: "bg-warning-medium",
  error: "bg-error-primary",
};

export const badgeVariants = cva(
  "ds-tf-badge inline-flex items-center gap-1.5 rounded-full font-sans font-semibold whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "h-5 px-2.5 text-[11px]",
        md: "h-6 px-[11px] text-xs",
        lg: "h-7 px-[13px] text-[13px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Semantic color role. @default "neutral" */
  tone?: Tone;
  /** Visual weight. @default "subtle" */
  appearance?: Appearance;
  /** Shows a small colored dot before the label (e.g. status indicators). */
  dot?: boolean;
}

/**
 * DS-TF Badge — compact status/category label. 6 tones × 3 appearances × 3 sizes.
 *
 * @example
 * <Badge tone="success" appearance="subtle" dot>Online</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size, tone = "neutral", appearance = "subtle", dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ size }), toneAppearanceClass[tone][appearance], className)}
        {...props}
      >
        {dot && <span className={cn("ds-tf-badge__dot", dotColorClass[tone])} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
