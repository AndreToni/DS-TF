import { type ReactNode } from "react";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* Steps — connected sequence (horizontal or vertical)                    */
/* ---------------------------------------------------------------------- */

export type StepStatus = "complete" | "current" | "upcoming";

export interface StepItem {
  /** Omit for a labelless circle-only step (see "Steps (Circle)" in the design reference). */
  label?: ReactNode;
  /** Secondary line under `label` — switches to the "mega" layout (used in `orientation="vertical"`). */
  description?: ReactNode;
  /** Overrides the status implied by `currentStep`/its index in `items`. */
  status?: StepStatus;
}

export interface StepsProps {
  items: StepItem[];
  /** 0-indexed. Items before it render `"complete"`, this one `"current"`,
   * items after it `"upcoming"` — unless an item sets its own `status`. */
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  /** Hides the connecting line between step circles. */
  hideConnector?: boolean;
  className?: string;
}

/**
 * DS-TF Steps — a connected step sequence covering "Steps" (horizontal),
 * "Steps (Vertical)" (with `description`, the "mega" layout), "Steps
 * (Circle)" (omit `label` on every item), and the "Bullet Steps B/C"
 * compositions (`orientation="vertical"`/`"horizontal"` with short labels,
 * no description) from the design reference — one data-driven component
 * instead of five near-duplicates. Status per step is computed from
 * `currentStep`'s index, so the connector coloring and checkmarks always
 * stay consistent as `currentStep` changes.
 *
 * **Scope note:** the "Stepper (M)" compact dot-row-with-chevron atom
 * wasn't built as its own component — it reads like a dropdown-style step
 * switcher, out of scope here; approximate it with `BulletSteps` if a
 * simpler progress readout is enough.
 *
 * @example
 * <Steps
 *   currentStep={1}
 *   items={[{ label: "Create Account" }, { label: "Set Up Profile" }, { label: "Upload Product" }]}
 * />
 * <Steps
 *   orientation="vertical"
 *   currentStep={1}
 *   items={[
 *     { label: "Label", description: "Description" },
 *     { label: "Label", description: "Description" },
 *   ]}
 * />
 */
export function Steps({ items, currentStep, orientation = "horizontal", hideConnector, className }: StepsProps) {
  const resolved = items.map((item, i) => item.status ?? (i < currentStep ? "complete" : i === currentStep ? "current" : "upcoming"));

  if (orientation === "vertical") {
    return (
      <ol className={cn("ds-tf-steps flex flex-col font-sans", className)}>
        {items.map((item, i) => {
          const status = resolved[i];
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={cn("relative flex gap-3", !isLast && "pb-6")}>
              {!isLast && !hideConnector && (
                <div
                  className={cn("absolute left-4 top-8 bottom-0 w-px", status === "complete" ? "bg-accent-primary" : "bg-line-light")}
                />
              )}
              <div className="relative z-10 shrink-0">
                <StepCircle status={status} index={i} />
              </div>
              {item.label != null && (
                <div className="pt-1">
                  <div className={cn("text-sm font-semibold", status === "upcoming" ? "text-ink-secondary" : "text-ink-primary")}>
                    {item.label}
                  </div>
                  {item.description && <div className="mt-0.5 text-xs text-ink-secondary">{item.description}</div>}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cn("ds-tf-steps flex items-center font-sans", className)}>
      {items.map((item, i) => {
        const status = resolved[i];
        const isLast = i === items.length - 1;
        return (
          <li key={i} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="flex shrink-0 items-center gap-2">
              <StepCircle status={status} index={i} />
              {item.label != null && (
                <span className={cn("text-sm font-semibold whitespace-nowrap", status === "upcoming" ? "text-ink-secondary" : "text-ink-primary")}>
                  {item.label}
                </span>
              )}
            </div>
            {!isLast && !hideConnector && (
              <div className={cn("mx-3 h-px flex-1", status === "complete" ? "bg-accent-primary" : "bg-line-light")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepCircle({ status, index }: { status: StepStatus; index: number }) {
  return (
    <span
      className={cn(
        "ds-tf-step-circle flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold",
        status === "upcoming" ? "bg-surface-medium text-ink-secondary" : "bg-accent-primary text-white"
      )}
    >
      {status === "complete" ? <CheckIcon /> : index + 1}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* BulletSteps — "Step X of Y" + a row of progress dots                   */
/* ---------------------------------------------------------------------- */

export interface BulletStepsProps {
  totalSteps: number;
  /** 0-indexed. */
  currentStep: number;
  /** Shows the "Step X of Y" caption before the dots. @default true */
  showLabel?: boolean;
  className?: string;
}

/**
 * DS-TF BulletSteps — the minimal "Step 2 of 3" + dot-row progress
 * indicator ("Bullet Steps A" in the design reference) — for onboarding
 * flows/carousels where a full labeled `Steps` sequence would be too much.
 *
 * @example
 * <BulletSteps totalSteps={5} currentStep={1} />
 */
export function BulletSteps({ totalSteps, currentStep, showLabel = true, className }: BulletStepsProps) {
  return (
    <div className={cn("ds-tf-bullet-steps flex items-center gap-3 font-sans", className)}>
      {showLabel && (
        <span className="text-xs font-medium text-ink-secondary">
          Step {currentStep + 1} of {totalSteps}
        </span>
      )}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={cn(
              "ds-tf-bullet-steps-dot rounded-full transition-all",
              i === currentStep ? "h-2 w-5 bg-accent-primary" : "h-2 w-2 bg-line-light"
            )}
          />
        ))}
      </div>
    </div>
  );
}
