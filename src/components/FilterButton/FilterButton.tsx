import { forwardRef, type ReactNode } from "react";
import { Badge } from "../Badge/Badge";
import { cn } from "../../lib/cn";

export type FilterButtonVariant = "filter" | "add" | "date" | "sort";

const defaultTrailingIcon: Record<FilterButtonVariant, ReactNode> = {
  filter: <FunnelIcon />,
  add: <PlusCircleIcon />,
  date: <ClockIcon />,
  sort: <SortIcon />,
};

export interface FilterButtonProps {
  children: ReactNode;
  /** Picks a sensible default trailing icon (funnel/plus-circle/clock/sort arrows). Ignored if `trailingIcon` is set. @default "filter" */
  variant?: FilterButtonVariant;
  /** Leading content — e.g. a small person icon once a value is chosen (see "Sort by Name"). */
  icon?: ReactNode;
  /** Overrides the `variant`'s default trailing icon. Ignored when `onClear` is set (the "×" takes over that spot). */
  trailingIcon?: ReactNode;
  /** Applied-filter count — renders as a real `Badge` before the label (see "3 Filters"). */
  count?: number;
  /** Shows a separate "×" clear button at the end instead of the trailing icon; called when clicked. */
  onClear?: () => void;
  /** Outlined "active" look — e.g. while this filter's dropdown is open. */
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * DS-TF FilterButton — a compact button/chip for filter bars: "Filter",
 * "Add Filter", "Select Dates", "Sort" (empty state), and the applied state
 * once a value or count is set (e.g. "Sort by Name" + a "×" to clear, or a
 * "3" count `Badge`), matching the "Filter Button" pattern from the design
 * reference.
 *
 * When `onClear` is passed, the "×" is a real separate `<button>` next to
 * the main trigger (not nested inside it) — both are independently
 * clickable/focusable, valid HTML, no nested-interactive-element hacks.
 *
 * @example
 * <FilterButton variant="filter">Filter</FilterButton>
 * <FilterButton variant="add">Add Filter</FilterButton>
 * <FilterButton variant="date" selected>Select Dates</FilterButton>
 * <FilterButton icon={<UserIcon />} onClear={() => setSort(null)}>Sort by Name</FilterButton>
 * <FilterButton count={3}>Filters</FilterButton>
 */
export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ children, variant = "filter", icon, trailingIcon, count, onClear, selected, disabled, onClick, className }, ref) => {
    const showClear = !!onClear;

    return (
      <div
        className={cn(
          "ds-tf-filter-btn inline-flex h-9 items-center gap-1.5 rounded-lg border-[1.5px] bg-surface-medium pl-3 font-sans text-sm font-semibold text-ink-primary transition-colors",
          showClear ? "pr-1.5" : "pr-3",
          selected ? "border-accent-primary bg-white" : "border-transparent hover:bg-line-light",
          disabled && "pointer-events-none opacity-40",
          className
        )}
      >
        {count != null && (
          <Badge tone="accent" appearance="filled" size="sm" className="h-5 min-w-[20px] shrink-0 justify-center rounded-full px-0">
            {count}
          </Badge>
        )}
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          onClick={onClick}
          aria-pressed={selected || undefined}
          className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-transparent text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-bg"
        >
          {icon && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center text-ink-secondary [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
          )}
          <span className="truncate">{children}</span>
          {!showClear && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center text-ink-secondary [&_svg]:h-4 [&_svg]:w-4">
              {trailingIcon ?? defaultTrailingIcon[variant]}
            </span>
          )}
        </button>
        {showClear && (
          <button
            type="button"
            aria-label="Limpar"
            disabled={disabled}
            onClick={onClear}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-ink-secondary outline-none hover:bg-line-light focus-visible:ring-2 focus-visible:ring-accent-bg"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

FilterButton.displayName = "FilterButton";

function FunnelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16l-6 7.5V19l-4 2v-8.5L4 5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function PlusCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M8 5v14M8 5l-3 3M8 5l3 3M16 19V5M16 19l-3-3M16 19l3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
