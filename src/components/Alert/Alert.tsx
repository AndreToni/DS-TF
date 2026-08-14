import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type AlertTone = "neutral" | "info" | "warning" | "error" | "success";
export type AlertAppearance = "plain" | "subtle" | "filled";

/* ---------------------------------------------------------------------- */
/* Shared tone → class maps (same "tone × appearance" system as Badge)    */
/* ---------------------------------------------------------------------- */

const toneAppearanceClass: Record<AlertTone, Record<AlertAppearance, string>> = {
  neutral: {
    plain: "bg-white border border-line-light text-ink-primary",
    subtle: "bg-surface-medium border border-transparent text-ink-primary",
    filled: "bg-ink-primary border border-transparent text-white",
  },
  info: {
    plain: "bg-white border border-line-light text-ink-primary",
    subtle: "bg-info-light border border-transparent text-info-medium",
    filled: "bg-info-primary border border-transparent text-white",
  },
  warning: {
    plain: "bg-white border border-line-light text-ink-primary",
    subtle: "bg-warning-light border border-transparent text-warning-medium",
    filled: "bg-warning-primary border border-transparent text-warning-contrast",
  },
  error: {
    plain: "bg-white border border-line-light text-ink-primary",
    subtle: "bg-error-light border border-transparent text-error-medium",
    filled: "bg-error-primary border border-transparent text-white",
  },
  success: {
    plain: "bg-white border border-line-light text-ink-primary",
    subtle: "bg-success-light border border-transparent text-success-medium",
    filled: "bg-success-primary border border-transparent text-white",
  },
};

const toneIconClass: Record<AlertTone, Record<AlertAppearance, string>> = {
  neutral: { plain: "text-ink-secondary", subtle: "text-ink-secondary", filled: "text-white" },
  info: { plain: "text-info-primary", subtle: "text-info-medium", filled: "text-white" },
  warning: { plain: "text-warning-medium", subtle: "text-warning-medium", filled: "text-warning-contrast" },
  error: { plain: "text-error-primary", subtle: "text-error-medium", filled: "text-white" },
  success: { plain: "text-success-primary", subtle: "text-success-medium", filled: "text-white" },
};

function defaultToneIcon(tone: AlertTone) {
  switch (tone) {
    case "warning":
      return <WarningIcon />;
    case "error":
      return <ErrorIcon />;
    case "success":
      return <SuccessIcon />;
    default:
      return <InfoIcon />;
  }
}

/* ---------------------------------------------------------------------- */
/* Alert — compact single-line banner                                     */
/* ---------------------------------------------------------------------- */

export interface AlertProps {
  /** Semantic color role. @default "neutral" */
  tone?: AlertTone;
  /** `"plain"` (white, bordered) \| `"subtle"` (tinted background — default) \| `"filled"` (solid background). */
  appearance?: AlertAppearance;
  /** Leading icon. Defaults to a tone-appropriate icon (info/warning/error/success) if omitted. */
  icon?: ReactNode;
  /** Bold leading text. */
  message: ReactNode;
  /** Muted text after `message`, same line. */
  description?: ReactNode;
  /** Trailing slot — a "Details →" link, a close button, or both. Fully free. */
  action?: ReactNode;
  className?: string;
}

/**
 * DS-TF Alert — a compact, single-line status banner: icon + bold
 * message + optional muted description, with a free trailing action slot.
 * For a multi-line card with a title, description paragraph, and a footer,
 * use `RichAlert` instead.
 *
 * @example
 * <Alert tone="info" message="Message" description="Optional description text." action={<a href="#">Details →</a>} />
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ tone = "neutral", appearance = "subtle", icon, message, description, action, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ds-tf-alert flex items-center gap-2.5 rounded-lg px-4 py-3 font-sans",
          toneAppearanceClass[tone][appearance],
          className
        )}
      >
        <span className={cn("flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:h-4 [&_svg]:w-4", toneIconClass[tone][appearance])}>
          {icon ?? defaultToneIcon(tone)}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] leading-tight">
          <span className="font-semibold">{message}</span>
          {description && <span className="ml-1.5 opacity-80">{description}</span>}
        </span>
        {action && <span className="flex shrink-0 items-center gap-3 text-[13px] font-semibold">{action}</span>}
      </div>
    );
  }
);

Alert.displayName = "Alert";

/* ---------------------------------------------------------------------- */
/* RichAlert — multi-line card with title, description, and a footer      */
/* ---------------------------------------------------------------------- */

export interface RichAlertProps {
  /** Semantic color role. @default "neutral" */
  tone?: AlertTone;
  /** `"plain"` (white, bordered) \| `"subtle"` (tinted background — default) \| `"filled"` (solid background). */
  appearance?: AlertAppearance;
  /** Leading icon. Defaults to a tone-appropriate icon if omitted. */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Shows a "×" close button that calls this when clicked. Omit to hide it. */
  onDismiss?: () => void;
  /** Footer row — e.g. two `Button`s, or "Details →" + "Dismiss" links. */
  footer?: ReactNode;
  className?: string;
}

/**
 * DS-TF RichAlert — a card-style alert with an icon, an optional close
 * button, a bold title, a description paragraph, and a free-form footer
 * (buttons or links).
 *
 * @example
 * <RichAlert
 *   tone="error"
 *   title="System Alert with Button Row"
 *   description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 *   onDismiss={() => setOpen(false)}
 *   footer={<><a href="#">Details →</a><button>Dismiss</button></>}
 * />
 */
export const RichAlert = forwardRef<HTMLDivElement, RichAlertProps>(
  ({ tone = "neutral", appearance = "subtle", icon, title, description, onDismiss, footer, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ds-tf-rich-alert flex flex-col gap-3 rounded-xl p-4 font-sans",
          toneAppearanceClass[tone][appearance],
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5", toneIconClass[tone][appearance])}>
            {icon ?? defaultToneIcon(tone)}
          </span>
          {onDismiss && (
            <button
              type="button"
              aria-label="Dismiss"
              onClick={onDismiss}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded [&_svg]:h-3 [&_svg]:w-3 hover:opacity-70",
                toneIconClass[tone][appearance]
              )}
            >
              <CloseIcon />
            </button>
          )}
        </div>
        <div>
          <p className="text-[14px] font-semibold leading-snug">{title}</p>
          {description && <p className="mt-1 text-[13px] leading-relaxed opacity-80">{description}</p>}
        </div>
        {footer && <div className="flex flex-wrap items-center gap-3">{footer}</div>}
      </div>
    );
  }
);

RichAlert.displayName = "RichAlert";

/* ---------------------------------------------------------------------- */
/* Default tone icons                                                     */
/* ---------------------------------------------------------------------- */

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M10.3 4.6a2 2 0 013.4 0l7.9 13.2A2 2 0 0119.9 21H4.1a2 2 0 01-1.7-3.2l7.9-13.2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 9.5v4M12 16.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 12.5l2.3 2.3L15.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
