import type { MouseEventHandler, ReactNode } from "react";
import { Badge, type BadgeTone } from "../Badge/Badge";
import { cn } from "../../lib/cn";
import "./NavItem.css";

export interface NavItemProps {
  icon?: ReactNode;
  label: ReactNode;
  /** Small count badge on the right (e.g. unread count). */
  count?: number | string;
  /** Tone for the `count` badge — e.g. `"error"` for an urgent/unread count. @default "neutral" */
  countTone?: BadgeTone;
  /** Muted keyboard-shortcut chip on the right (e.g. `"⌘1"`) — a plain key
   * cap, visually distinct from the colored `count` badge. Ignored if
   * `count` is also set (they'd collide in the same trailing slot). */
  shortcut?: ReactNode;
  /** Small "New" tag next to the label. */
  isNew?: boolean;
  /** Secondary line under the label — switches to the "mega item" layout (icon top-aligned, description below label). */
  description?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  /** Shows a chevron that toggles `expanded` — for collapsible groups. */
  expandable?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** `"default"` (subtle tinted background + accent text when selected) | `"pill"` (solid accent background, matches the "Pill Menu" variant). */
  appearance?: "default" | "pill";
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  /** Nested `NavItem`s, indented — rendered when `expandable` and `expanded` are both true. */
  children?: ReactNode;
}

/**
 * DS-TF NavItem — a single row in a navigation list/sidebar. Renders as
 * an `<a>` when `href` is passed, otherwise a `<button>`. Compose several
 * inside a `NavGroup` (optional section header) and a `NavMenu` (sidebar
 * container).
 *
 * @example
 * <NavItem icon={<HomeIcon />} label="Dashboard" selected />
 * <NavItem label="Notifications" count={4} />
 * <NavItem icon={<SearchIcon />} label="Quick Search" shortcut="⌘1" />
 * <NavItem
 *   icon={<TeamIcon />}
 *   label="Team"
 *   isNew
 *   description="Learn more about our team and our mission."
 * />
 * <NavItem label="Projects" expandable expanded={open} onExpandedChange={setOpen}>
 *   <NavItem label="Sub item" />
 * </NavItem>
 */
export function NavItem({
  icon,
  label,
  count,
  countTone = "neutral",
  shortcut,
  isNew,
  description,
  selected,
  disabled,
  expandable,
  expanded,
  onExpandedChange,
  appearance = "default",
  href,
  onClick,
  className,
  children,
}: NavItemProps) {
  const isMega = !!description;
  const Comp = href ? "a" : "button";

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
    if (expandable) onExpandedChange?.(!expanded);
  };

  return (
    <div className="ds-tf-nav-item-wrap">
      <Comp
        href={href}
        type={href ? undefined : "button"}
        disabled={!href && disabled ? true : undefined}
        aria-disabled={href && disabled ? true : undefined}
        aria-current={selected ? "page" : undefined}
        onClick={handleClick}
        data-selected={selected ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-appearance={appearance}
        className={cn(
          "ds-tf-nav-item flex w-full items-center gap-2.5 rounded-lg font-sans text-sm text-ink-primary no-underline",
          isMega ? "items-start px-3 py-2.5" : "px-3 py-2",
          disabled && "pointer-events-none opacity-40",
          className
        )}
      >
        {icon && (
          <span
            className={cn(
              "ds-tf-nav-item-icon flex h-5 w-5 shrink-0 items-center justify-center text-ink-secondary",
              isMega && "mt-0.5"
            )}
          >
            {icon}
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
          <span className="flex items-center gap-1.5">
            <span className="truncate font-medium">{label}</span>
            {isNew && (
              <Badge
                tone="accent"
                appearance="subtle"
                size="sm"
                className="ds-tf-nav-item-new h-auto px-1.5 py-px text-[10px] uppercase tracking-wide"
              >
                New
              </Badge>
            )}
          </span>
          {description && (
            <span className="ds-tf-nav-item-desc text-left text-xs leading-snug text-ink-secondary">
              {description}
            </span>
          )}
        </span>
        {count != null && (
          <Badge
            tone={countTone}
            appearance="subtle"
            size="sm"
            className={cn(
              "ds-tf-nav-item-count h-[18px] min-w-[18px] px-[5px] text-[11px]",
              selected && appearance === "pill" && "bg-white/25 text-white"
            )}
          >
            {count}
          </Badge>
        )}
        {count == null && shortcut && (
          <span className="ds-tf-nav-item-shortcut shrink-0 rounded-md bg-surface-medium px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink-secondary">
            {shortcut}
          </span>
        )}
        {expandable && <ChevronIcon expanded={!!expanded} />}
      </Comp>
      {expandable && expanded && children && (
        <div className="ds-tf-nav-item-children relative flex flex-col gap-0.5 py-0.5 pl-7">
          <div className="ds-tf-nav-item-connector absolute bottom-1 left-[19px] top-0 w-px bg-line-light" />
          {children}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("ds-tf-nav-item-chevron h-4 w-4 shrink-0", expanded && "rotate-180")}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
