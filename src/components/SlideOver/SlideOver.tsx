import { forwardRef, type ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import "./SlideOver.css";

export const SlideOver = RadixDialog.Root;
export const SlideOverTrigger = RadixDialog.Trigger;
export const SlideOverClose = RadixDialog.Close;
export const SlideOverDescription = RadixDialog.Description;

export interface SlideOverContentProps {
  /** Header title, shown left-aligned in a bordered header row. */
  title?: ReactNode;
  /** Extra header control(s) — e.g. a "⋯" overflow menu button — shown at
   * the right edge of the header, next to the close button. */
  headerActions?: ReactNode;
  /** Hides the "×" close button (shown by default, top-right of the header). */
  hideClose?: boolean;
  /** Rendered as a footer row pinned to the bottom — e.g.
   * `<><Button>Save</Button><Button variant="secondary">Cancel</Button></>`. */
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** `"sm"` (320px) | `"md"` (380px, default) | `"lg"` (480px). */
  size?: "sm" | "md" | "lg";
}

/**
 * DS-TF SlideOverContent — a panel that slides in from the right edge
 * of the screen (Overlay + Portal + Content), built on
 * `@radix-ui/react-dialog`. Use inside a `SlideOver` (Root), typically with
 * a `SlideOverTrigger`:
 *
 * @example
 * <SlideOver>
 *   <SlideOverTrigger asChild><Button>Open</Button></SlideOverTrigger>
 *   <SlideOverContent
 *     title="Card Header"
 *     headerActions={<button aria-label="More">⋯</button>}
 *     footer={<><Button>Save</Button><Button variant="secondary">Cancel</Button></>}
 *   >
 *     Content Slot
 *   </SlideOverContent>
 * </SlideOver>
 *
 * **Scope note:** only the right-side slide-in shown in the design
 * reference is implemented — there's no `side="left"`/`"bottom"` prop.
 */
export const SlideOverContent = forwardRef<HTMLDivElement, SlideOverContentProps>(
  ({ title, headerActions, hideClose, footer, children, className, size = "md" }, ref) => {
    return (
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="ds-tf-slideover-overlay fixed inset-0 z-50" />
        <RadixDialog.Content
          ref={ref}
          aria-describedby={undefined}
          className={cn(
            "ds-tf-slideover-content fixed inset-y-0 right-0 z-50 flex w-[calc(100vw-32px)] flex-col overflow-hidden bg-white font-sans shadow-xl",
            size === "sm" && "sm:w-[320px]",
            size === "md" && "sm:w-[380px]",
            size === "lg" && "sm:w-[480px]",
            className
          )}
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-line-light px-4 py-3">
            {title ? (
              <RadixDialog.Title className="text-sm font-semibold text-ink-primary">{title}</RadixDialog.Title>
            ) : (
              <RadixDialog.Title className="sr-only">Slide-over</RadixDialog.Title>
            )}
            <div className="flex shrink-0 items-center gap-1">
              {headerActions}
              {!hideClose && <CloseButton />}
            </div>
          </div>
          <div className="ds-tf-slideover-body flex-1 overflow-y-auto px-4 py-4">{children}</div>
          {footer && (
            <div className="flex shrink-0 items-center gap-2 border-t border-line-light px-4 py-3">{footer}</div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  }
);

SlideOverContent.displayName = "SlideOverContent";

function CloseButton({ className }: { className?: string }) {
  return (
    <RadixDialog.Close asChild>
      <button
        type="button"
        aria-label="Close"
        className={cn(
          "ds-tf-slideover-close flex h-6 w-6 items-center justify-center rounded-md text-ink-secondary",
          className
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </RadixDialog.Close>
  );
}
