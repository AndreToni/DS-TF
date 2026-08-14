import { useId, type ReactNode } from "react";
import { Tooltip } from "../Tooltip/Tooltip";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* Shared tone system (same 6 tones as Badge / Alert / ActivityIcon)      */
/* ---------------------------------------------------------------------- */

export type ChartTone = "accent" | "neutral" | "info" | "success" | "warning" | "error";

const barToneClass: Record<ChartTone, string> = {
  accent: "bg-accent-primary",
  neutral: "bg-ink-primary",
  info: "bg-info-primary",
  success: "bg-success-primary",
  warning: "bg-warning-primary",
  error: "bg-error-primary",
};

const lineToneVar: Record<ChartTone, string> = {
  accent: "var(--color-accent-primary)",
  neutral: "var(--color-text-primary)",
  info: "var(--color-info-primary)",
  success: "var(--color-success-primary)",
  warning: "var(--color-warning-medium)",
  error: "var(--color-error-primary)",
};

/* ---------------------------------------------------------------------- */
/* BarChart                                                                */
/* ---------------------------------------------------------------------- */

export interface ChartDatum {
  label: ReactNode;
  value: number;
  /** Shown in the hover tooltip. Defaults to `"<value>%"`. */
  tooltip?: ReactNode;
}

export interface BarChartProps {
  data: ChartDatum[];
  /** Scale reference for bar heights. Defaults to the highest `value` in `data`. */
  max?: number;
  /** Semantic color role — same 6-tone system as `Badge`/`Alert`. @default "accent" */
  tone?: ChartTone;
  /** Plot height in px (excludes labels). @default 160 */
  height?: number;
  className?: string;
}

/**
 * DS-TF BarChart — a simple bar chart: one bar per `data` entry, scaled to
 * `max` (or the tallest value), with a real hover tooltip on each bar (it
 * reuses the `Tooltip` component — no bespoke tooltip markup) and a label
 * underneath, matching the "Bar Graph" pattern from the design reference.
 *
 * @example
 * <BarChart
 *   data={[
 *     { label: "Mon", value: 40 },
 *     { label: "Tue", value: 65 },
 *     { label: "Wed", value: 100, tooltip: "100%" },
 *   ]}
 * />
 */
export function BarChart({ data, max, tone = "accent", height = 160, className }: BarChartProps) {
  const scale = max ?? Math.max(1, ...data.map((d) => d.value));
  return (
    <div className={cn("ds-tf-bar-chart flex items-end gap-2 font-sans", className)} style={{ height }}>
      {data.map((d, i) => {
        const pct = scale > 0 ? Math.max(2, Math.round((d.value / scale) * 100)) : 0;
        return (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <Tooltip content={d.tooltip ?? `${d.value}%`}>
              <div
                tabIndex={0}
                className={cn(
                  "ds-tf-bar-chart-bar w-full rounded-t-md outline-none transition-[height,opacity] hover:opacity-80 focus-visible:ring-2 focus-visible:ring-accent-bg",
                  barToneClass[tone]
                )}
                style={{ height: `${pct}%` }}
              />
            </Tooltip>
            <span className="truncate text-xs text-ink-secondary">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LineChart (sparkline)                                                   */
/* ---------------------------------------------------------------------- */

export interface LineChartProps {
  /** Y values, plotted left to right at equal intervals. */
  data: number[];
  /** Semantic color role — same 6-tone system as `Badge`/`Alert`. @default "accent" */
  tone?: ChartTone;
  /** Fills the area under the line with a soft gradient. @default true */
  filled?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * DS-TF LineChart — a small trend line (sparkline), matching the compact
 * line charts from the design reference. Renders an SVG polyline scaled to
 * fit `data`, with an optional soft gradient fill underneath.
 *
 * @example
 * <LineChart data={[30, 45, 28, 60, 52, 70, 64]} tone="success" />
 */
export function LineChart({ data, tone = "accent", filled = true, width = 160, height = 56, className }: LineChartProps) {
  const gradientId = useId();
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / span) * height;
    return [x, y] as const;
  });
  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
  const stroke = lineToneVar[tone];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("ds-tf-line-chart", className)}
      role="img"
    >
      {filled && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        </>
      )}
      <path d={linePath} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
