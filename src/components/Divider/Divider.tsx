import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import * as RadixSeparator from "@radix-ui/react-separator";
import { cn } from "../../lib/cn";
import "./Divider.css";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Content rendered on the line (label text, an icon badge, a Button — anything). Omit for a plain rule. */
  children?: ReactNode;
  /** `"center"` (default) surrounds children with line on both sides; `"start"` puts the line only after the content. */
  align?: "center" | "start";
}

/**
 * DS-TF Divider — separates sections of content. Built on
 * `@radix-ui/react-separator` for correct `role="separator"` semantics.
 * With no children it's a plain rule; pass any node (text, an icon, a
 * `<Button>`) to render it inline on the line.
 *
 * @example
 * <Divider />
 * <Divider>OR</Divider>
 * <Divider align="start">SECTION</Divider>
 * <Divider><Button size="sm" variant="outlined">See more</Button></Divider>
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, children, align = "center", ...props }, ref) => {
    if (!children) {
      return (
        <RadixSeparator.Root
          ref={ref}
          orientation="horizontal"
          className={cn("ds-tf-divider-line h-px w-full", className)}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cn("flex w-full items-center gap-3.5", className)} {...props}>
        {align === "center" && (
          <RadixSeparator.Root orientation="horizontal" className="ds-tf-divider-line h-px flex-1" />
        )}
        <span className="whitespace-nowrap text-xs font-semibold text-ink-secondary font-sans">
          {children}
        </span>
        <RadixSeparator.Root orientation="horizontal" className="ds-tf-divider-line h-px flex-1" />
      </div>
    );
  }
);

Divider.displayName = "Divider";
