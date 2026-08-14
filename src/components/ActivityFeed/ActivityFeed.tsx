import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

/* ---------------------------------------------------------------------- */
/* ActivityFeed — list wrapper                                            */
/* ---------------------------------------------------------------------- */

export interface ActivityFeedProps {
  children?: ReactNode;
  className?: string;
}

/**
 * DS-TF ActivityFeed — a simple `role="feed"` list wrapper that gives
 * its `ActivityItem` children a consistent divider between rows. No state,
 * no portal — just layout.
 *
 * @example
 * <ActivityFeed>
 *   <ActivityItem icon={<ActivityIcon tone="success"><PlusIcon /></ActivityIcon>} name="Dulce Siphron" description="has added you to their team." timestamp="2min ago" />
 *   <ActivityItem icon={<Avatar initials="JB" badge="error" />} name="Jordyn Baptista" description="has made edits to your file." timestamp="2min ago">
 *     <ActivityAttachment name="File Name" size="54 kB" />
 *   </ActivityItem>
 * </ActivityFeed>
 */
export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      role="feed"
      className={cn("ds-tf-activity-feed divide-y divide-line-light font-sans", className)}
    >
      {children}
    </div>
  )
);

ActivityFeed.displayName = "ActivityFeed";

/* ---------------------------------------------------------------------- */
/* ActivityItem — a single row                                            */
/* ---------------------------------------------------------------------- */

export interface ActivityItemProps {
  /** Leading indicator — pass an `ActivityIcon` for a colored type icon
   * (added/edited/commented/removed/...), or an `Avatar` for a
   * person-authored activity like a comment. */
  icon?: ReactNode;
  /** The actor's name, rendered bold on the first line. */
  name: ReactNode;
  /** What happened, e.g. "has commented on your video." — rendered muted,
   * on its own line below `name`. */
  description: ReactNode;
  /** Relative time, e.g. "2min ago" — rendered next to `name`. */
  timestamp?: ReactNode;
  /** Trailing control at the far right of the name/timestamp row — e.g. a
   * "⋯" overflow menu button (see the "Comment" examples in the design
   * reference). */
  headerAction?: ReactNode;
  /** Free-form body below the description — a quoted comment
   * (`<p className="...">`), an `ActivityAttachment`, an actions row
   * (`Reaction`/`Reply`/`Dismiss` buttons or links), or any combination.
   * Omit for a plain one-line log entry. */
  children?: ReactNode;
  className?: string;
}

export const ActivityItem = forwardRef<HTMLDivElement, ActivityItemProps>(
  ({ icon, name, description, timestamp, headerAction, children, className }, ref) => (
    <div ref={ref} className={cn("ds-tf-activity-item flex gap-3 py-4", className)}>
      {icon}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-[13px] font-semibold text-ink-primary">{name}</span>
            {timestamp && <span className="text-xs text-ink-secondary">{timestamp}</span>}
          </div>
          {headerAction}
        </div>
        <p className="text-[13px] leading-snug text-ink-secondary">{description}</p>
        {children && <div className="mt-2.5 flex flex-col items-start gap-2.5">{children}</div>}
      </div>
    </div>
  )
);

ActivityItem.displayName = "ActivityItem";

/* ---------------------------------------------------------------------- */
/* ActivityIcon — colored circle leading indicator                        */
/* ---------------------------------------------------------------------- */

export type ActivityIconTone = "neutral" | "accent" | "info" | "success" | "warning" | "error";

const activityIconToneClass: Record<ActivityIconTone, string> = {
  neutral: "bg-ink-primary text-white",
  accent: "bg-accent-primary text-white",
  info: "bg-info-primary text-white",
  success: "bg-success-primary text-white",
  warning: "bg-warning-primary text-warning-contrast",
  error: "bg-error-primary text-white",
};

export interface ActivityIconProps {
  /** Semantic color role — mirrors `Badge`'s tone system. @default "neutral" */
  tone?: ActivityIconTone;
  children: ReactNode;
  className?: string;
}

/**
 * DS-TF ActivityIcon — the small colored circle used as an
 * `ActivityItem`'s leading indicator for non-person activity types
 * (added, edited, commented, removed, notified, ...). For person-authored
 * activity (e.g. a comment), pass an `Avatar` to `ActivityItem`'s `icon`
 * instead.
 */
export const ActivityIcon = forwardRef<HTMLSpanElement, ActivityIconProps>(
  ({ tone = "neutral", children, className }, ref) => (
    <span
      ref={ref}
      className={cn(
        "ds-tf-activity-icon inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full [&_svg]:h-4 [&_svg]:w-4",
        activityIconToneClass[tone],
        className
      )}
    >
      {children}
    </span>
  )
);

ActivityIcon.displayName = "ActivityIcon";

/* ---------------------------------------------------------------------- */
/* ActivityAttachment — file chip                                         */
/* ---------------------------------------------------------------------- */

export interface ActivityAttachmentProps {
  icon?: ReactNode;
  name: ReactNode;
  size?: ReactNode;
  /** Trailing control, e.g. a "⋯" menu button. */
  action?: ReactNode;
  className?: string;
}

/**
 * DS-TF ActivityAttachment — the file chip shown inside an
 * `ActivityItem`'s body when the activity references a file.
 */
export const ActivityAttachment = forwardRef<HTMLDivElement, ActivityAttachmentProps>(
  ({ icon, name, size, action, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "ds-tf-activity-attachment flex w-full max-w-sm items-center gap-2 rounded-lg border border-line-light bg-surface-light px-3 py-2",
        className
      )}
    >
      {icon ?? <FileIcon className="h-4 w-4 shrink-0 text-ink-secondary" />}
      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink-primary">{name}</span>
      {size && <span className="shrink-0 text-xs text-ink-secondary">{size}</span>}
      {action}
    </div>
  )
);

ActivityAttachment.displayName = "ActivityAttachment";

function FileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
