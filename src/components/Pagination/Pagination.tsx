import { forwardRef, type ReactNode } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Button } from "../Button/Button";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* Windowing helper                                                       */
/* ---------------------------------------------------------------------- */

function range(start: number, end: number): number[] {
  if (end < start) return [];
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export type PaginationItem = { type: "page"; value: number } | { type: "ellipsis"; from: number; to: number };

/**
 * Computes the windowed page list for `Pagination`: `boundaryCount` pages
 * at each end, a `siblingCount`-wide window around `page`, and an
 * `"ellipsis"` item (carrying the hidden page range, for the jump-to
 * popover) wherever there's a gap.
 */
export function getPaginationItems(page: number, totalPages: number, siblingCount = 1, boundaryCount = 1): PaginationItem[] {
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3;
  if (totalPages <= totalNumbers) {
    return range(1, totalPages).map((value) => ({ type: "page" as const, value }));
  }

  const leftSibling = Math.max(page - siblingCount, boundaryCount + 2);
  const rightSibling = Math.min(page + siblingCount, totalPages - boundaryCount - 1);

  const showLeftEllipsis = leftSibling > boundaryCount + 2;
  const showRightEllipsis = rightSibling < totalPages - boundaryCount - 1;

  const items: PaginationItem[] = [];
  range(1, boundaryCount).forEach((value) => items.push({ type: "page", value }));

  if (showLeftEllipsis) {
    items.push({ type: "ellipsis", from: boundaryCount + 1, to: leftSibling - 1 });
  } else {
    range(boundaryCount + 1, leftSibling - 1).forEach((value) => items.push({ type: "page", value }));
  }

  range(leftSibling, rightSibling).forEach((value) => items.push({ type: "page", value }));

  if (showRightEllipsis) {
    items.push({ type: "ellipsis", from: rightSibling + 1, to: totalPages - boundaryCount });
  } else {
    range(rightSibling + 1, totalPages - boundaryCount).forEach((value) => items.push({ type: "page", value }));
  }

  range(totalPages - boundaryCount + 1, totalPages).forEach((value) => items.push({ type: "page", value }));

  return items;
}

/* ---------------------------------------------------------------------- */
/* Pagination — numbered                                                  */
/* ---------------------------------------------------------------------- */

export interface PaginationProps {
  /** Current page, 1-indexed. */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Page numbers shown on each side of `page` before collapsing into "...". @default 1 */
  siblingCount?: number;
  /** Page numbers always shown at the very start/end. @default 1 */
  boundaryCount?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * DS-TF Pagination — numbered page list with prev/next arrows. Collapses
 * into a "..." once `totalPages` exceeds the `siblingCount`/`boundaryCount`
 * window; clicking "..." opens a scrollable popover (built on the same
 * `@radix-ui/react-popover` as `FlyoutMenu`) listing every hidden page
 * number to jump straight to — matching the page-jump dropdown drawn next
 * to the ellipsis in the design reference.
 *
 * @example
 * const [page, setPage] = useState(2);
 * <Pagination page={page} totalPages={40} onPageChange={setPage} />
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ page, totalPages, onPageChange, siblingCount = 1, boundaryCount = 1, disabled, className }, ref) => {
    const items = getPaginationItems(page, totalPages, siblingCount, boundaryCount);

    return (
      <nav ref={ref} aria-label="Pagination" className={cn("ds-tf-pagination flex items-center gap-1 font-sans", className)}>
        <PageArrowButton direction="prev" disabled={disabled || page <= 1} onClick={() => onPageChange(page - 1)} />
        {items.map((item, i) =>
          item.type === "ellipsis" ? (
            <PaginationEllipsis key={`e-${i}`} from={item.from} to={item.to} onSelect={onPageChange} disabled={disabled} />
          ) : (
            <button
              key={item.value}
              type="button"
              aria-current={item.value === page ? "page" : undefined}
              disabled={disabled}
              onClick={() => onPageChange(item.value)}
              className={cn(
                "ds-tf-pagination-page flex h-8 min-w-[32px] items-center justify-center rounded-md px-1.5 text-[13px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-bg disabled:pointer-events-none disabled:opacity-40",
                item.value === page ? "bg-accent-primary text-white" : "text-ink-primary hover:bg-surface-medium"
              )}
            >
              {item.value}
            </button>
          )
        )}
        <PageArrowButton direction="next" disabled={disabled || page >= totalPages} onClick={() => onPageChange(page + 1)} />
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

function PaginationEllipsis({
  from,
  to,
  onSelect,
  disabled,
}: {
  from: number;
  to: number;
  onSelect: (page: number) => void;
  disabled?: boolean;
}) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button
          type="button"
          aria-label={`Show pages ${from} to ${to}`}
          disabled={disabled}
          className="ds-tf-pagination-ellipsis flex h-8 min-w-[32px] items-center justify-center rounded-md text-[13px] font-semibold text-ink-secondary outline-none transition-colors hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg disabled:pointer-events-none disabled:opacity-40"
        >
          ···
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          sideOffset={6}
          className="ds-tf-pagination-ellipsis-content z-50 max-h-48 overflow-y-auto rounded-lg border border-line-light bg-white p-1 shadow-lg"
        >
          {range(from, to).map((value) => (
            <RadixPopover.Close asChild key={value}>
              <button
                type="button"
                onClick={() => onSelect(value)}
                className="flex h-8 w-10 items-center justify-center rounded-md text-[13px] font-semibold text-ink-primary outline-none hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg"
              >
                {value}
              </button>
            </RadixPopover.Close>
          ))}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

function PageArrowButton({
  direction,
  onClick,
  disabled,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "ds-tf-pagination-arrow flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line-light text-ink-primary outline-none transition-colors hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg disabled:pointer-events-none disabled:opacity-40",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        {direction === "prev" ? (
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* PaginationSummary — "Showing X to Y of Z results." / "Page X of Y"     */
/* ---------------------------------------------------------------------- */

export interface PaginationSummaryProps {
  /** Pass `from`/`to`/`total` for "Showing X to Y of Z results." */
  from?: number;
  to?: number;
  total?: number;
  /** Pass `page`/`totalPages` for "Page X of Y" instead. */
  page?: number;
  totalPages?: number;
  className?: string;
}

/**
 * DS-TF PaginationSummary — the small result-count / page-count label
 * shown alongside `Pagination`/`SimplePagination` in the design reference.
 * Pass `from`/`to`/`total` for "Showing X to Y of Z results.", or
 * `page`/`totalPages` for "Page X of Y".
 */
export function PaginationSummary({ from, to, total, page, totalPages, className }: PaginationSummaryProps) {
  return (
    <span className={cn("ds-tf-pagination-summary font-sans text-[13px] text-ink-secondary", className)}>
      {page != null && totalPages != null ? (
        <>
          Page <strong className="font-semibold text-ink-primary">{page}</strong> of{" "}
          <strong className="font-semibold text-ink-primary">{totalPages}</strong>
        </>
      ) : (
        <>
          Showing <strong className="font-semibold text-ink-primary">{from}</strong> to{" "}
          <strong className="font-semibold text-ink-primary">{to}</strong> of{" "}
          <strong className="font-semibold text-ink-primary">{total}</strong> results.
        </>
      )}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* SimplePagination — Previous / Next                                     */
/* ---------------------------------------------------------------------- */

export interface SimplePaginationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
  /** `"text"` — real `Button`s ("Previous"/"Next"). `"icon"` — compact chevron-only squares. @default "text" */
  variant?: "text" | "icon";
  /** Merges Previous/Next into one connected, shared-border control instead of two separately-rounded buttons. */
  grouped?: boolean;
  className?: string;
}

/**
 * DS-TF SimplePagination — just the Previous/Next control from the
 * "Simple Pagination" pattern. Reuses the real `Button` (`variant="outlined"`)
 * for `variant="text"`. Pair freely with a `PaginationSummary` on either
 * side — layout (label left/center/right, buttons grouped or separate) is
 * left entirely to your own flex/grid composition, matching every
 * permutation shown in the design reference.
 *
 * @example
 * <div className="flex items-center justify-between">
 *   <SimplePagination onPrevious={prev} onNext={next} previousDisabled={page === 1} nextDisabled={page === totalPages} />
 *   <PaginationSummary from={1} to={10} total={20} />
 * </div>
 */
export function SimplePagination({
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
  previousLabel = "Previous",
  nextLabel = "Next",
  variant = "text",
  grouped,
  className,
}: SimplePaginationProps) {
  if (variant === "icon") {
    return (
      <div className={cn("ds-tf-simple-pagination inline-flex items-center font-sans", !grouped && "gap-2", className)}>
        <PageArrowButton direction="prev" onClick={onPrevious ?? (() => {})} disabled={previousDisabled} className={grouped ? "rounded-r-none" : undefined} />
        <PageArrowButton direction="next" onClick={onNext ?? (() => {})} disabled={nextDisabled} className={grouped ? "-ml-px rounded-l-none" : undefined} />
      </div>
    );
  }

  return (
    <div className={cn("ds-tf-simple-pagination inline-flex items-center font-sans", !grouped && "gap-2", className)}>
      <Button type="button" variant="outlined" size="md" onClick={onPrevious} disabled={previousDisabled} className={grouped ? "rounded-r-none" : undefined}>
        {previousLabel}
      </Button>
      <Button type="button" variant="outlined" size="md" onClick={onNext} disabled={nextDisabled} className={grouped ? "-ml-px rounded-l-none" : undefined}>
        {nextLabel}
      </Button>
    </div>
  );
}
