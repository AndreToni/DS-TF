import { forwardRef, type ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import "./Dialog.css";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;
export const DialogDescription = RadixDialog.Description;

export interface DialogContentProps {
  /** Header title. Rendered in a bordered header row when set. If omitted,
   * a visually-hidden title is still rendered (Radix requires one for
   * screen readers) and no header row appears — matches the "Content Slot"
   * (headerless) dialog from the design reference. */
  title?: ReactNode;
  /** Extra header control(s), e.g. a "⋯" menu button — shown next to the
   * close button, only when `title` is set. */
  headerActions?: ReactNode;
  /** Hides the "×" close button (shown by default, top-right corner). */
  hideClose?: boolean;
  /** Rendered as a footer row — e.g. `<><Button variant="secondary">Back</Button><Button>Next</Button></>`, or a single full-width CTA. */
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** `"sm"` (360px) | `"md"` (420px, default) | `"lg"` (560px). */
  size?: "sm" | "md" | "lg";
}

/**
 * DS-TF DialogContent — the modal box itself (Overlay + Portal +
 * Content), built on `@radix-ui/react-dialog`. Use inside a `Dialog` (Root),
 * typically with a `DialogTrigger`:
 *
 * @example
 * <Dialog>
 *   <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
 *   <DialogContent
 *     title="Small Card Header"
 *     headerActions={<button>⋯</button>}
 *     footer={<><Button variant="secondary">Back</Button><Button>Next</Button></>}
 *   >
 *     Content Slot
 *   </DialogContent>
 * </Dialog>
 *
 * For a headerless dialog (just a floating close button, matching the
 * "Content Slot" variant), omit `title`:
 *
 * @example
 * <DialogContent footer={<Button>Next</Button>}>Content Slot</DialogContent>
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ title, headerActions, hideClose, footer, children, className, size = "md" }, ref) => {
    return (
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="ds-tf-dialog-overlay fixed inset-0 z-50" />
        <RadixDialog.Content
          ref={ref}
          aria-describedby={undefined}
          className={cn(
            "ds-tf-dialog-content fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white font-sans shadow-xl",
            size === "sm" && "sm:w-[360px]",
            size === "md" && "sm:w-[420px]",
            size === "lg" && "sm:w-[560px]",
            className
          )}
        >
          {title ? (
            <div className="flex items-center justify-between gap-2 border-b border-line-light px-4 py-3">
              <RadixDialog.Title className="text-sm font-semibold text-ink-primary">{title}</RadixDialog.Title>
              <div className="flex shrink-0 items-center gap-1">
                {headerActions}
                {!hideClose && <CloseButton />}
              </div>
            </div>
          ) : (
            <>
              <RadixDialog.Title className="sr-only">Dialog</RadixDialog.Title>
              {!hideClose && <CloseButton className="absolute right-3 top-3" />}
            </>
          )}
          <div className="ds-tf-dialog-body flex-1 overflow-y-auto px-4 py-4">{children}</div>
          {footer && (
            <div className="flex items-center justify-between gap-2 border-t border-line-light px-4 py-3">
              {footer}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  }
);

DialogContent.displayName = "DialogContent";

function CloseButton({ className }: { className?: string }) {
  return (
    <RadixDialog.Close asChild>
      <button
        type="button"
        aria-label="Close"
        className={cn(
          "ds-tf-dialog-close flex h-6 w-6 items-center justify-center rounded-md text-ink-secondary",
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
