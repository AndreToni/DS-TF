import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SectionHeaderProps {
  /** Small leading icon chip. */
  icon?: ReactNode;
  title: ReactNode;
  /** Muted line under the title. */
  description?: ReactNode;
  /** Rendered above the title/icon row — e.g. a `Breadcrumbs` trail. */
  breadcrumb?: ReactNode;
  /** Rendered as a full-width row below the head, with a top divider —
   * e.g. a `Tabs` list. */
  tabs?: ReactNode;
  /** Right-aligned free actions row — a search `TextField`, `FilterButton`s,
   * a primary `Button`, a `SectionHeaderMenuButton`. Wraps below the title
   * on narrow viewports via normal flex-wrap (no dedicated breakpoint). */
  actions?: ReactNode;
  className?: string;
}

/**
 * DS-TF SectionHeader — the page/section-level header from the design
 * reference (explicitly distinct from `CardHeader`, per its own copy: "It's
 * different form a card header"). Composes existing components for
 * everything — `breadcrumb` takes a real `Breadcrumbs`, `tabs` a real
 * `Tabs`, and `actions` a search `TextField` + `FilterButton`s + a primary
 * `Button`, matching the "Team Members" / "Events" examples.
 *
 * **Scope note:** the data table shown under the "Team Members" example in
 * the design reference is illustrative only — no `Table`/`DataTable`
 * component was built here, it wasn't part of this request.
 *
 * @example
 * <SectionHeader
 *   icon={<DocIcon />}
 *   title="Section Header"
 *   description="This is a section header. It's different form a card header."
 *   actions={<>
 *     <TextField placeholder="Search" leading={<SearchIcon />} className="w-48" />
 *     <FilterButton variant="filter">Filter</FilterButton>
 *     <FilterButton variant="sort">Sort</FilterButton>
 *     <Button size="sm">Primary</Button>
 *     <SectionHeaderMenuButton />
 *   </>}
 *   tabs={<Tabs defaultValue="first"><TabsList><TabsTrigger value="first">First</TabsTrigger>...</TabsList></Tabs>}
 * />
 */
export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ icon, title, description, breadcrumb, tabs, actions, className }, ref) => (
    <div ref={ref} className={cn("ds-tf-section-header flex flex-col gap-3 font-sans", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {breadcrumb && <div className="mb-1.5">{breadcrumb}</div>}
          <div className="flex items-start gap-2.5">
            {icon && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-primary text-white [&_svg]:h-4 [&_svg]:w-4">
                {icon}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-ink-primary">{title}</h2>
              {description && <p className="mt-0.5 text-[13px] leading-snug text-ink-secondary">{description}</p>}
            </div>
          </div>
        </div>
        {actions && <div className="flex flex-shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {tabs && <div className="border-t border-line-light pt-3">{tabs}</div>}
    </div>
  )
);

SectionHeader.displayName = "SectionHeader";

export interface SectionHeaderMenuButtonProps {
  onClick?: () => void;
  /** aria-label for the icon-only button. @default "More" */
  label?: string;
  className?: string;
}

/**
 * DS-TF SectionHeaderMenuButton — the "⋮" overflow trigger shown at the end
 * of a `SectionHeader`'s `actions` row. Same treatment as `CardHeader`'s
 * "×" close button — decorative icon only, wire your own menu to `onClick`.
 */
export const SectionHeaderMenuButton = forwardRef<HTMLButtonElement, SectionHeaderMenuButtonProps>(
  ({ onClick, label = "More", className }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "ds-tf-section-header-menu flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink-secondary outline-none transition-colors hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <circle cx="5" cy="12" r="1.6" fill="currentColor" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <circle cx="19" cy="12" r="1.6" fill="currentColor" />
      </svg>
    </button>
  )
);

SectionHeaderMenuButton.displayName = "SectionHeaderMenuButton";
