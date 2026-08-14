import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* Card — bordered container with free header/body/footer slots           */
/* ---------------------------------------------------------------------- */

export interface CardProps {
  /** Top row — typically a `CardHeader`, but any node works (or omit for a headerless card). */
  header?: ReactNode;
  /** Bottom row — typically a `CardFooter`, but any node works (or omit for a footerless card). */
  footer?: ReactNode;
  /** Main content slot ("Content Slot" in the design reference). */
  children?: ReactNode;
  /** Constrains the card width. Omit to fill the parent. `"sm"` (320px) \| `"md"` (440px) \| `"lg"` (600px). */
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * DS-TF Card — a bordered container with optional `header` and `footer`
 * slots around a free `children` content area, matching the "Card
 * Components" pattern from the design reference. The card itself has no
 * hard-coded title, button, or badge markup — everything is a free slot,
 * matching the "Content Slots" philosophy from the design reference's own
 * notes: swap in whatever you need (a search `TextField` + `Button` in the
 * header, `Button`s or pagination text in the footer) and it updates
 * everywhere automatically when those components change.
 *
 * @example
 * <Card
 *   header={<CardHeader title="Card Header" description="Description Text" action={<Button size="sm">Primary</Button>} />}
 *   footer={<CardFooter><Button variant="secondary">Cancel</Button><Button>Save</Button></CardFooter>}
 * >
 *   Content Slot
 * </Card>
 *
 * @example
 * // With a leading icon (e.g. a stat card)
 * <Card header={<CardHeader icon={<ActivityIcon tone="accent"><UsersIcon /></ActivityIcon>} title="New Users" />}>
 *   ...
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ header, footer, children, size, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ds-tf-card flex flex-col overflow-hidden rounded-xl border border-line-light bg-white font-sans shadow-sm",
          size === "sm" && "w-[320px]",
          size === "md" && "w-[440px]",
          size === "lg" && "w-[600px]",
          className
        )}
      >
        {header}
        {children && <div className="ds-tf-card-body flex-1 px-5 py-4">{children}</div>}
        {footer}
      </div>
    );
  }
);

Card.displayName = "Card";

/* ---------------------------------------------------------------------- */
/* CardHeader — title + description + a free right-aligned action slot    */
/* ---------------------------------------------------------------------- */

export interface CardHeaderProps {
  /** Leading icon — e.g. an `ActivityIcon` circle, matching the "New Users" stat cards. */
  icon?: ReactNode;
  title: ReactNode;
  /** Muted line under the title (matches "Description Text" in the design reference). */
  description?: ReactNode;
  /** Right-aligned free slot — a search `TextField` + `Button`, a `Badge` + "⋯" menu button, or anything else. */
  action?: ReactNode;
  /** Shows a "×" close button after `action` — matches the dismissible "Small Card Header" variant. */
  onDismiss?: () => void;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ icon, title, description, action, onDismiss, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ds-tf-card-header flex items-center justify-between gap-3 border-b border-line-light px-5 py-4",
          className
        )}
      >
        <div className={cn("flex min-w-0 items-center", icon ? "gap-2.5" : "")}>
          {icon}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-primary">{title}</p>
            {description && <p className="mt-0.5 truncate text-xs text-ink-secondary">{description}</p>}
          </div>
        </div>
        {(action || onDismiss) && (
          <div className="flex shrink-0 items-center gap-2">
            {action}
            {onDismiss && (
              <button
                type="button"
                aria-label="Fechar"
                onClick={onDismiss}
                className="ds-tf-card-close flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-medium"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

/* ---------------------------------------------------------------------- */
/* CardFooter — a free row, right-aligned by default                      */
/* ---------------------------------------------------------------------- */

export interface CardFooterProps {
  /** Free content — `Button`s, a link, pagination text, anything. */
  children?: ReactNode;
  /** `"end"` (default): content right-aligned, e.g. "Cancel"/"Save". `"between"`: spread to the edges, e.g. "Previous"/"Next" on the left and result count + actions on the right. */
  justify?: "end" | "between";
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, justify = "end", className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ds-tf-card-footer flex items-center gap-2 border-t border-line-light px-5 py-4",
          justify === "end" ? "justify-end" : "justify-between",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
