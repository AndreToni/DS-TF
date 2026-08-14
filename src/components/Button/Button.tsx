import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import "./Button.css";

export const buttonVariants = cva(
  "ds-tf-btn inline-flex items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap border border-transparent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-bg disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-accent-primary text-white hover:bg-[#1D4FD1]",
        secondary: "bg-action-medium text-white hover:bg-action-light",
        outlined: "bg-transparent border-line-dark text-ink-primary hover:bg-surface-medium",
        transparent: "bg-transparent text-ink-primary hover:bg-surface-medium",
        destructive: "bg-error-primary text-white hover:bg-error-medium",
      },
      size: {
        lg: "h-12 px-5 text-button-lg rounded-lg",
        md: "h-10 px-4 text-button-md rounded-md",
        sm: "h-8 px-3 text-button-sm rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Icon rendered before the label. */
  leadIcon?: ReactNode;
  /** Icon rendered after the label. */
  tailIcon?: ReactNode;
}

/**
 * DS-TF Button — contained action with 5 visual styles (primary,
 * secondary, outlined, transparent, destructive) and 3 sizes.
 *
 * @example
 * <Button variant="primary" size="md" leadIcon={<SendIcon />}>Send</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leadIcon, tailIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {leadIcon}
        {children}
        {tailIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
