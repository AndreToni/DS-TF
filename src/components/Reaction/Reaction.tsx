import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ReactionProps {
  /** Who reacted — pass an `Avatar size="xs"` (the placeholder circle when
   * no `src`/`initials`) or an emoji `<span>`. Omit for a count-only pill. */
  avatar?: ReactNode;
  count: number;
  /** "You reacted" state — outlined accent border + tinted background. */
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * DS-TF Reaction — a small toggle pill: who reacted (`avatar`) + how many
 * (`count`). A real `<button>` — toggle `selected` from the consumer side
 * on click. Used inside `Message`'s `reactions` slot and freely composable
 * into `ActivityItem`'s `children` for comment threads.
 *
 * @example
 * <Reaction avatar={<Avatar size="xs" />} count={3} />
 * <Reaction count={3} selected onClick={() => setReacted(false)} />
 */
export const Reaction = forwardRef<HTMLButtonElement, ReactionProps>(
  ({ avatar, count, selected, onClick, disabled, className }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected || undefined}
      className={cn(
        "ds-tf-reaction inline-flex h-7 items-center gap-1.5 rounded-full border-[1.5px] bg-surface-medium pr-2.5 font-sans text-xs font-semibold text-ink-primary outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-bg disabled:pointer-events-none disabled:opacity-40",
        avatar ? "pl-1" : "pl-2.5",
        selected ? "border-accent-primary bg-accent-bg text-accent-primary" : "border-transparent hover:bg-line-light",
        className
      )}
    >
      {avatar}
      <span>{count}</span>
    </button>
  )
);

Reaction.displayName = "Reaction";

export interface ReactionAddButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  /** aria-label for the icon-only button. @default "Add reaction" */
  label?: string;
  className?: string;
}

/**
 * DS-TF ReactionAddButton — the small dashed/plain circular "add a new
 * reaction" trigger shown next to a row of `Reaction` pills. Decorative
 * icon only — wire `onClick` to your own emoji picker.
 */
export const ReactionAddButton = forwardRef<HTMLButtonElement, ReactionAddButtonProps>(
  ({ onClick, disabled, label = "Add reaction", className }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "ds-tf-reaction-add flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-line-dark text-ink-secondary outline-none transition-colors hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg disabled:pointer-events-none disabled:opacity-40",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 13.5c.8 1.2 2 2 3.5 2s2.7-.8 3.5-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="9" cy="10" r="0.9" fill="currentColor" />
        <circle cx="15" cy="10" r="0.9" fill="currentColor" />
      </svg>
    </button>
  )
);

ReactionAddButton.displayName = "ReactionAddButton";
