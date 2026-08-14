import { useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* Date helpers (no external date library — kept lightweight)             */
/* ---------------------------------------------------------------------- */

export interface DateRange {
  from?: Date;
  to?: Date;
}

export type DatePickerValue = Date | DateRange;

const DEFAULT_WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function isSameDay(a?: Date, b?: Date) {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isToday(d: Date) {
  return isSameDay(d, new Date());
}

/** Monday-first 6-week (42-cell) grid covering `month` plus the leading/trailing days needed to fill whole weeks. */
function buildGrid(month: Date) {
  const first = startOfMonth(month);
  const offset = (first.getDay() + 6) % 7; // JS getDay(): 0=Sun..6=Sat -> 0=Mon..6=Sun
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - offset);
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    cells.push(d);
  }
  return cells;
}

/* ---------------------------------------------------------------------- */
/* DatePicker                                                              */
/* ---------------------------------------------------------------------- */

export interface DatePickerProps {
  /** `"single"` (default): `value`/`onChange` are a plain `Date`. `"range"`: they're a `{ from, to }` object — click once for `from`, again for `to`. */
  mode?: "single" | "range";
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  /** Displayed month (controlled) — any `Date` within that month. */
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  /** Marks today's cell with a small dot. @default true */
  showToday?: boolean;
  /** `Intl`/`toLocaleDateString` locale used for the month/year label. @default "en-US" */
  locale?: string;
  /** Weekday header labels, Monday first. @default ["Mo","Tu","We","Th","Fr","Sa","Su"] */
  weekdayLabels?: string[];
  /** Footer slot — e.g. Confirm/Dismiss `Button`s, or an "Enter Date" `TextField`. Free composition, no built-in markup. Omit for just the calendar grid. */
  footer?: ReactNode;
  className?: string;
}

/**
 * DS-TF DatePicker — a month calendar grid with prev/next navigation,
 * a "today" indicator, and single or range selection, matching the "Date
 * Picker" pattern from the design reference. The footer (Confirm/Dismiss,
 * or an "Enter Date" field) is a free `footer` slot — compose it with real
 * `Button`/`TextField`, nothing is hard-coded.
 *
 * **Scope note:** days from the previous/next month shown to fill the grid
 * are muted and non-interactive (no jump-to-that-month on click); there's
 * no dual-month side-by-side view (render two `DatePicker`s sharing state
 * for that); and day cells are plain buttons (Tab-through + Enter/Space),
 * not a roving-tabindex arrow-key grid.
 *
 * @example
 * const [date, setDate] = useState<Date>();
 * <DatePicker
 *   value={date}
 *   onChange={(v) => setDate(v as Date)}
 *   footer={<><Button size="sm">Confirm</Button><Button size="sm" variant="transparent">Dismiss</Button></>}
 * />
 *
 * @example
 * // Range mode
 * const [range, setRange] = useState<DateRange>({});
 * <DatePicker mode="range" value={range} onChange={(v) => setRange(v as DateRange)} />
 */
export function DatePicker({
  mode = "single",
  value,
  defaultValue,
  onChange,
  month,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  showToday = true,
  locale = "en-US",
  weekdayLabels = DEFAULT_WEEKDAYS,
  footer,
  className,
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState<DatePickerValue | undefined>(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  const seedMonth =
    month ??
    defaultMonth ??
    (currentValue instanceof Date ? currentValue : (currentValue as DateRange | undefined)?.from) ??
    new Date();
  const [internalMonth, setInternalMonth] = useState<Date>(startOfMonth(seedMonth));
  const displayedMonth = month ? startOfMonth(month) : internalMonth;

  const setMonth = (next: Date) => {
    if (month === undefined) setInternalMonth(next);
    onMonthChange?.(next);
  };

  const commit = (next: DatePickerValue) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  function isDisabled(day: Date) {
    if (minDate && day < startOfDay(minDate)) return true;
    if (maxDate && day > startOfDay(maxDate)) return true;
    return false;
  }

  const handleDayClick = (day: Date, outside: boolean) => {
    if (outside || isDisabled(day)) return;
    if (mode === "single") {
      commit(day);
      return;
    }
    const range = (currentValue as DateRange) ?? {};
    if (!range.from || (range.from && range.to)) {
      commit({ from: day, to: undefined });
    } else if (day < range.from) {
      commit({ from: day, to: range.from });
    } else {
      commit({ from: range.from, to: day });
    }
  };

  const cells = buildGrid(displayedMonth);
  const monthLabel = displayedMonth.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const range = mode === "range" ? ((currentValue as DateRange) ?? {}) : undefined;

  return (
    <div
      className={cn(
        "ds-tf-date-picker inline-flex flex-col rounded-xl border border-line-light bg-white p-4 font-sans shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Mês anterior"
          onClick={() => setMonth(addMonths(displayedMonth, -1))}
          className="flex h-7 w-7 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-medium"
        >
          <ChevronIcon direction="left" />
        </button>
        <span className="text-sm font-semibold capitalize text-ink-primary">{monthLabel}</span>
        <button
          type="button"
          aria-label="Próximo mês"
          onClick={() => setMonth(addMonths(displayedMonth, 1))}
          className="flex h-7 w-7 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-medium"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-1">
        {weekdayLabels.map((w, i) => (
          <div key={i} className="flex h-8 items-center justify-center text-xs font-semibold text-ink-secondary">
            {w}
          </div>
        ))}
        {cells.map((day, i) => {
          const outside = day.getMonth() !== displayedMonth.getMonth();
          const disabled = outside || isDisabled(day);
          const selected =
            mode === "single" ? isSameDay(day, currentValue as Date) : isSameDay(day, range?.from) || isSameDay(day, range?.to);
          const inRange = mode === "range" && !!range?.from && !!range?.to && day > range.from! && day < range.to!;
          const today = showToday && isToday(day);

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(day, outside)}
              className={cn(
                "ds-tf-date-picker-day relative flex h-9 w-9 items-center justify-center text-[13px] font-medium text-ink-primary outline-none transition-colors",
                "hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg",
                "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-40",
                outside ? "text-ink-hint" : "rounded-full",
                inRange && "rounded-none bg-accent-bg hover:bg-accent-bg",
                selected && "rounded-full bg-accent-primary text-white hover:bg-accent-primary"
              )}
            >
              {day.getDate()}
              {today && !selected && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent-primary" />}
            </button>
          );
        })}
      </div>

      {footer && <div className="mt-3 flex items-center justify-between gap-2 border-t border-line-light pt-3">{footer}</div>}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
