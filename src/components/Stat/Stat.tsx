import { type ReactNode } from "react";
import { type ChartTone } from "../Chart/Chart";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* StatDelta — small inline trend indicator                               */
/* ---------------------------------------------------------------------- */

const deltaToneTextClass: Record<ChartTone, string> = {
  accent: "text-accent-primary",
  neutral: "text-ink-secondary",
  info: "text-info-primary",
  success: "text-success-primary",
  warning: "text-warning-medium",
  error: "text-error-primary",
};

export interface StatDeltaProps {
  /** Picks the default arrow icon and (unless `tone` is set) the color:
   * `"up"` → success, `"down"` → error, `"flat"` → neutral. @default "up" */
  direction?: "up" | "down" | "flat";
  value: ReactNode;
  /** Overrides the tone implied by `direction` — same 6-tone system as `BarChart`. */
  tone?: ChartTone;
  /** Overrides the default arrow icon. */
  icon?: ReactNode;
  className?: string;
}

/**
 * DS-TF StatDelta — the small "↗ 2%" trend indicator from the "Stat
 * Indicator" atom: an arrow icon + value, colored by `tone` (or by
 * `direction` if `tone` is omitted). Plain colored text, not a `Badge` chip
 * — matches the inline look next to a stat's big number in the design
 * reference.
 *
 * @example
 * <StatDelta direction="up" value="2%" />
 * <StatDelta direction="down" value="40%" />
 * <StatDelta direction="up" value="60%" tone="info" />
 */
export function StatDelta({ direction = "up", value, tone, icon, className }: StatDeltaProps) {
  const resolvedTone = tone ?? (direction === "up" ? "success" : direction === "down" ? "error" : "neutral");
  return (
    <span
      className={cn(
        "ds-tf-stat-delta inline-flex items-center gap-1 text-xs font-semibold",
        deltaToneTextClass[resolvedTone],
        className
      )}
    >
      {icon ?? <DeltaArrowIcon direction={direction} />}
      {value}
    </span>
  );
}

function DeltaArrowIcon({ direction }: { direction: "up" | "down" | "flat" }) {
  if (direction === "flat") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 shrink-0">
        <path d="M4 12h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-3 w-3 shrink-0", direction === "down" && "-scale-y-100")}>
      <path d="M5 15L15 5M15 5H7M15 5v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* StatMetric — label + value (+ delta), for multi-metric grids           */
/* ---------------------------------------------------------------------- */

export interface StatMetricProps {
  /** Small uppercase caption, e.g. "TOTAL VIEWS". */
  label: ReactNode;
  value: ReactNode;
  /** e.g. a `StatDelta`. */
  delta?: ReactNode;
  className?: string;
}

/**
 * DS-TF StatMetric — a label/value(/delta) triple for the "Multi-Column
 * Stat" pattern. No grid of its own — arrange a few in your own
 * `grid grid-cols-2` (or any layout) inside a `Card`.
 *
 * @example
 * <div className="grid grid-cols-2 gap-4">
 *   <StatMetric label="Total Views" value="2,860" />
 *   <StatMetric label="Impressions" value="590" delta={<StatDelta direction="up" value="60%" />} />
 * </div>
 */
export function StatMetric({ label, value, delta, className }: StatMetricProps) {
  return (
    <div className={cn("ds-tf-stat-metric flex flex-col gap-1 font-sans", className)}>
      <span className="text-[10.5px] font-bold uppercase tracking-wide text-ink-secondary">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-lg font-semibold text-ink-primary">{value}</span>
        {delta}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* StatCard — the value + delta + trend-chart body                       */
/* ---------------------------------------------------------------------- */

export interface StatCardProps {
  value: ReactNode;
  /** e.g. a `StatDelta`. */
  delta?: ReactNode;
  /** Muted text next to `delta`, e.g. "from yesterday". */
  deltaCaption?: ReactNode;
  /** Trend visualization — pass a `LineChart` (sparkline) or `BarChart`. */
  chart?: ReactNode;
  /** `"stacked"` (value/delta on top, `chart` full-width below — default,
   * matches the "New Users" card) \| `"inline"` (value/delta and a narrow
   * `chart` side by side in one row, matching the compact density
   * variant). */
  layout?: "stacked" | "inline";
  className?: string;
}

/**
 * DS-TF StatCard — deliberately just the stat-specific body (big number,
 * `StatDelta`, trend chart): no icon/title/menu row and no footer of its
 * own, because that's exactly what `CardHeader`/`CardFooter` already do.
 * Compose it as a `Card`'s `children`, matching every "New Users" example
 * in the design reference:
 *
 * @example
 * <Card
 *   header={<CardHeader title="New Users" action={<ActivityIcon tone="accent"><UsersIcon /></ActivityIcon>} />}
 *   footer={<CardFooter className="justify-start"><a href="#">View Report</a><a href="#">Dismiss</a></CardFooter>}
 * >
 *   <StatCard
 *     value="2,860"
 *     delta={<StatDelta direction="up" value="2%" />}
 *     deltaCaption="from yesterday"
 *     chart={<LineChart data={[40, 55, 48, 60, 52, 70, 64]} tone="accent" />}
 *   />
 * </Card>
 */
export function StatCard({ value, delta, deltaCaption, chart, layout = "stacked", className }: StatCardProps) {
  const deltaRow = (delta || deltaCaption) && (
    <span className="flex items-center gap-1.5 text-xs">
      {delta}
      {deltaCaption && <span className="text-ink-secondary">{deltaCaption}</span>}
    </span>
  );

  if (layout === "inline") {
    return (
      <div className={cn("ds-tf-stat-card flex items-center justify-between gap-3 font-sans", className)}>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold leading-none text-ink-primary">{value}</span>
          {deltaRow}
        </div>
        {chart && <div className="ds-tf-stat-card-chart w-24 shrink-0">{chart}</div>}
      </div>
    );
  }

  return (
    <div className={cn("ds-tf-stat-card flex flex-col gap-3 font-sans", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-semibold leading-none text-ink-primary">{value}</span>
        {deltaRow}
      </div>
      {chart && <div className="ds-tf-stat-card-chart w-full overflow-hidden">{chart}</div>}
    </div>
  );
}
