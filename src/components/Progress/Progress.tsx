import { type ReactNode } from "react";
import { type ChartTone, barToneClass, lineToneVar } from "../Chart/Chart";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* ProgressBar — linear                                                   */
/* ---------------------------------------------------------------------- */

export type ProgressLabelPosition = "none" | "trailing" | "top" | "bottom-start" | "bottom-end";

export interface ProgressBarProps {
  /** 0-100. Values outside that range are clamped. */
  value: number;
  /** Same 6-tone system as `Badge`/`Alert`/`BarChart`. @default "accent" */
  tone?: ChartTone;
  /** Where the "X%" text renders — inline to the right (`"trailing"`), a
   * floating chip above the fill point (`"top"`), or below the track,
   * left/right-aligned (`"bottom-start"` / `"bottom-end"`). @default "none" */
  label?: ProgressLabelPosition;
  /** Overrides the auto "`value`%" text. */
  formatLabel?: (value: number) => string;
  className?: string;
}

/**
 * DS-TF ProgressBar — a linear progress track matching the "Progress Bars"
 * pattern from the design reference. Same 6-tone system as `BarChart`
 * (reuses its tone → color map directly, not a redefinition).
 *
 * **Scope note:** the `"top"` floating label is a plain positioned chip —
 * no connecting pointer triangle, and it isn't edge-clamped (it can run
 * past the track at 0%/100%).
 *
 * @example
 * <ProgressBar value={65} />
 * <ProgressBar value={60} tone="success" label="trailing" />
 * <ProgressBar value={60} label="top" />
 * <ProgressBar value={80} label="bottom-end" />
 */
export function ProgressBar({ value, tone = "accent", label = "none", formatLabel, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  const text = formatLabel ? formatLabel(pct) : `${Math.round(pct)}%`;

  return (
    <div className={cn("ds-tf-progress-bar w-full font-sans", className)}>
      {label === "top" && (
        <div className="relative h-6">
          <span
            className="ds-tf-progress-bar-bubble absolute bottom-0 -translate-x-1/2 whitespace-nowrap rounded-md border border-line-light bg-white px-2 py-0.5 text-xs font-semibold text-ink-primary shadow-sm"
            style={{ left: `${pct}%` }}
          >
            {text}
          </span>
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-medium">
          <div
            className={cn("ds-tf-progress-bar-fill h-full rounded-full transition-[width] duration-300", barToneClass[tone])}
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        {label === "trailing" && <span className="shrink-0 text-xs font-semibold text-ink-secondary">{text}</span>}
      </div>
      {(label === "bottom-start" || label === "bottom-end") && (
        <div className={cn("mt-1.5 text-xs font-semibold text-ink-secondary", label === "bottom-end" ? "text-right" : "text-left")}>
          {text}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ProgressRing — circular                                                */
/* ---------------------------------------------------------------------- */

export interface ProgressRingProps {
  /** 0-100. Values outside that range are clamped. */
  value: number;
  /** Same 6-tone system as `Badge`/`Alert`/`BarChart`. @default "accent" */
  tone?: ChartTone;
  /** Outer diameter, in px. @default 72 */
  size?: number;
  /** @default `Math.max(3, size * 0.08)` */
  strokeWidth?: number;
  /** Center content. Defaults to "`value`%" — pass your own node (an icon,
   * a different unit) or `null` for a bare ring. */
  children?: ReactNode;
  /** Caption below the ring. */
  label?: ReactNode;
  className?: string;
}

/**
 * DS-TF ProgressRing — a circular progress indicator (SVG stroke-dashoffset,
 * same technique as `LineChart`'s hand-computed SVG). Same 6-tone system as
 * `BarChart`/`ProgressBar` — reuses its tone → color map.
 *
 * @example
 * <ProgressRing value={15} />
 * <ProgressRing value={15} size={140} tone="success" label="Label" />
 */
export function ProgressRing({ value, tone = "accent", size = 72, strokeWidth, children, label, className }: ProgressRingProps) {
  const pct = Math.min(100, Math.max(0, value));
  const sw = strokeWidth ?? Math.max(3, Math.round(size * 0.08));
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const stroke = lineToneVar[tone];

  return (
    <div className={cn("ds-tf-progress-ring inline-flex flex-col items-center gap-2 font-sans", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-background-medium)" strokeWidth={sw} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 300ms" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center font-semibold text-ink-primary"
          style={{ fontSize: Math.max(10, Math.round(size * 0.16)) }}
        >
          {children === undefined ? `${Math.round(pct)}%` : children}
        </div>
      </div>
      {label && <span className="text-xs font-medium text-ink-secondary">{label}</span>}
    </div>
  );
}
