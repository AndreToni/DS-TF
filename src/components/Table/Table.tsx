import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { Checkbox, type CheckboxProps } from "../Checkbox/Checkbox";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* Density context — same pattern as Breadcrumbs' appearance/size context */
/* ---------------------------------------------------------------------- */

const TableDensityContext = createContext<{ dense: boolean }>({ dense: false });

/* ---------------------------------------------------------------------- */
/* Table — root                                                           */
/* ---------------------------------------------------------------------- */

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Tighter cell padding, matching the "Dense Cell" pattern — flows down
   * to every `TableCell`/`TableHeaderCell` automatically (same context
   * mechanism as `Breadcrumbs`' `appearance`/`size`). A single cell can
   * still override it with its own `dense` prop. */
  dense?: boolean;
  children: ReactNode;
}

/**
 * DS-TF Table — the "Base Table Cell Component" system from the design
 * reference: a bordered, rounded wrapper around a real `<table>`, built
 * from small swappable cell components (`TableHeaderCell`, `TableCell`,
 * `TableCheckboxCell`, `TableGroupRow`) instead of one big data-driven
 * component — matching the reference's own notes about swapping a cell's
 * "slot component" without breaking the row around it.
 *
 * Row-hover actions, sortable headers, avatars, badges, and pagination are
 * all composition: reuse `Avatar`, `Badge`, `Button`, `FilterButton`,
 * `SimplePagination`/`PaginationSummary`, and `Card`/`SectionHeader` (for
 * the "Card Tables" pattern) — no bespoke versions of any of those live
 * inside `Table`.
 *
 * @example
 * <Table>
 *   <TableHeader>
 *     <tr>
 *       <TableCheckboxCell as="th" checked={allChecked} onCheckedChange={toggleAll} />
 *       <TableHeaderCell sortable sortDirection="asc">Name</TableHeaderCell>
 *       <TableHeaderCell>Status</TableHeaderCell>
 *     </tr>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow selected>
 *       <TableCheckboxCell checked />
 *       <TableCell>
 *         <div className="flex items-center gap-2.5">
 *           <Avatar size="sm" initials="CW" />
 *           <div><p className="font-semibold">Carla Westervelt</p><p className="text-xs text-ink-secondary">@carla</p></div>
 *         </div>
 *       </TableCell>
 *       <TableCell><Badge tone="success" appearance="subtle">Active</Badge></TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ dense = false, className, children, ...props }, ref) => (
    <TableDensityContext.Provider value={{ dense }}>
      <div className="ds-tf-table-wrap w-full overflow-x-auto rounded-xl border border-line-light bg-white">
        <table ref={ref} className={cn("ds-tf-table w-full border-collapse text-left font-sans text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    </TableDensityContext.Provider>
  )
);

Table.displayName = "Table";

/* ---------------------------------------------------------------------- */
/* TableHeader / TableBody — thin thead/tbody wrappers                    */
/* ---------------------------------------------------------------------- */

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <thead ref={ref} className={cn("ds-tf-table-header bg-surface-light", className)} {...props}>
      {children}
    </thead>
  )
);

TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn("ds-tf-table-body divide-y divide-line-light", className)} {...props}>
      {children}
    </tbody>
  )
);

TableBody.displayName = "TableBody";

/* ---------------------------------------------------------------------- */
/* TableRow                                                                */
/* ---------------------------------------------------------------------- */

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Tinted background, e.g. for a selected row. */
  selected?: boolean;
}

/**
 * DS-TF TableRow — adds the `ds-tf-table-row` class (a `group` for
 * hover-reveal children, e.g. `<span className="opacity-0
 * group-hover:opacity-100">Edit</span>`) plus a `selected` tint. No
 * built-in selection state — pass `selected` from your own row-selection
 * logic (e.g. paired with a `TableCheckboxCell`).
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected, className, children, ...props }, ref) => (
    <tr
      ref={ref}
      data-selected={selected ? "true" : undefined}
      className={cn(
        "ds-tf-table-row group transition-colors hover:bg-surface-light",
        selected && "bg-accent-bg hover:bg-accent-bg",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
);

TableRow.displayName = "TableRow";

/* ---------------------------------------------------------------------- */
/* TableHeaderCell                                                         */
/* ---------------------------------------------------------------------- */

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  /** Shows a sort arrow and makes the header a clickable `<button>`. */
  sortable?: boolean;
  /** `"asc"` \| `"desc"` rotates/highlights the arrow; omit for the neutral (unsorted) look. */
  sortDirection?: "asc" | "desc";
  onSort?: () => void;
  dense?: boolean;
  children?: ReactNode;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ align = "left", sortable, sortDirection, onSort, dense, className, children, ...props }, ref) => {
    const { dense: contextDense } = useContext(TableDensityContext);
    const isDense = dense ?? contextDense;

    return (
      <th
        ref={ref}
        className={cn(
          "ds-tf-table-header-cell whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-ink-secondary",
          isDense ? "px-3 py-2" : "px-4 py-3",
          align === "center" && "text-center",
          align === "right" && "text-right",
          className
        )}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            onClick={onSort}
            className={cn(
              "ds-tf-table-sort inline-flex items-center gap-1 uppercase tracking-wide text-ink-secondary outline-none hover:text-ink-primary focus-visible:ring-2 focus-visible:ring-accent-bg",
              sortDirection && "text-ink-primary"
            )}
          >
            {children}
            <SortIcon direction={sortDirection} />
          </button>
        ) : (
          children
        )}
      </th>
    );
  }
);

TableHeaderCell.displayName = "TableHeaderCell";

function SortIcon({ direction }: { direction?: "asc" | "desc" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-3.5 w-3.5 shrink-0", direction === "desc" && "rotate-180")}>
      <path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* TableCell                                                                */
/* ---------------------------------------------------------------------- */

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  dense?: boolean;
  children?: ReactNode;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = "left", dense, className, children, ...props }, ref) => {
    const { dense: contextDense } = useContext(TableDensityContext);
    const isDense = dense ?? contextDense;

    return (
      <td
        ref={ref}
        className={cn(
          "ds-tf-table-cell align-middle text-ink-primary",
          isDense ? "px-3 py-2" : "px-4 py-3.5",
          align === "center" && "text-center",
          align === "right" && "text-right",
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

/* ---------------------------------------------------------------------- */
/* TableCheckboxCell — a td/th wrapping the real Checkbox                  */
/* ---------------------------------------------------------------------- */

export interface TableCheckboxCellProps extends Omit<CheckboxProps, "className"> {
  /** Renders a `<th>` instead of `<td>` — for the header row's "select all". */
  as?: "td" | "th";
  className?: string;
}

/**
 * DS-TF TableCheckboxCell — the row-select checkbox column, wrapping the
 * real `Checkbox` (not a bespoke checkbox mark) in a narrow, unpadded cell.
 */
export const TableCheckboxCell = forwardRef<HTMLButtonElement, TableCheckboxCellProps>(
  ({ as = "td", className, ...checkboxProps }, ref) => {
    const Comp = as;
    return (
      <Comp className="ds-tf-table-checkbox-cell w-10 py-3 pl-4 pr-2 align-middle">
        <Checkbox ref={ref} className={className} {...checkboxProps} />
      </Comp>
    );
  }
);

TableCheckboxCell.displayName = "TableCheckboxCell";

/* ---------------------------------------------------------------------- */
/* TableGroupRow — a full-width section label row                         */
/* ---------------------------------------------------------------------- */

export interface TableGroupRowProps {
  label: ReactNode;
  /** Total column count, so the label cell can `colSpan` the full width. */
  colSpan: number;
  className?: string;
}

/**
 * DS-TF TableGroupRow — a full-width row with an uppercase section label
 * (e.g. "Design Team", "Engineering"), matching the grouped-rows table in
 * the design reference. Pair with real `NavGroup`-style organization —
 * this only covers the table-row version.
 */
export function TableGroupRow({ label, colSpan, className }: TableGroupRowProps) {
  return (
    <tr className="ds-tf-table-group-row">
      <td colSpan={colSpan} className={cn("bg-surface-light px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-secondary", className)}>
        {label}
      </td>
    </tr>
  );
}
