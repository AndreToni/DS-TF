import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SidebarSwitcherProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** Leading icon, wrapped in a small square chip. Ignored if `avatar` is set. */
  icon?: ReactNode;
  /** Leading visual — pass a real `Avatar` for a person (the user-menu
   * trigger); use `icon` instead for a team/workspace swatch. */
  avatar?: ReactNode;
  title: ReactNode;
  /** e.g. "@handle". */
  subtitle?: ReactNode;
  /** `"sort"` (up/down arrows — team/workspace switcher) \| `"kebab"` (⋮ —
   * compact user-menu row) \| `"none"`. @default "sort" */
  trailingIcon?: "sort" | "kebab" | "none";
  /** Outlined "active" look — e.g. while its dropdown is open. */
  selected?: boolean;
  className?: string;
}

/**
 * DS-TF SidebarSwitcher — the trigger row for a sidebar's workspace/team
 * switcher (top) or account menu (bottom): icon/avatar + title + subtitle +
 * a trailing sort or "⋮" icon. A plain `<button>` — wrap it in a
 * `FlyoutMenuTrigger asChild` to open a dropdown (`FlyoutMenuContent` +
 * `FlyoutMenuItem`s), matching the "Sidebar Components" pattern from the
 * design reference. Not a standalone dropdown itself, so it composes with
 * the existing `FlyoutMenu` instead of duplicating its popover logic.
 *
 * @example
 * <FlyoutMenu>
 *   <FlyoutMenuTrigger asChild>
 *     <SidebarSwitcher icon={<TeamIcon />} title="Google Team" subtitle="@google" />
 *   </FlyoutMenuTrigger>
 *   <FlyoutMenuContent align="start" size="sm">
 *     <FlyoutMenuItem icon={<TwitterIcon />} title="Twitter" description="@twitter" />
 *     <FlyoutMenuItem icon={<GoogleIcon />} title="Google" description="@google" />
 *   </FlyoutMenuContent>
 * </FlyoutMenu>
 *
 * <FlyoutMenu>
 *   <FlyoutMenuTrigger asChild>
 *     <SidebarSwitcher avatar={<Avatar size="sm" initials="KP" />} title="Kianna Press" subtitle="@kianna" trailingIcon="kebab" />
 *   </FlyoutMenuTrigger>
 *   <FlyoutMenuContent align="start" size="sm">
 *     <FlyoutMenuItem title="Invite Members" />
 *     <FlyoutMenuItem title="Preferences" />
 *     <FlyoutMenuItem title="Log Out" />
 *   </FlyoutMenuContent>
 * </FlyoutMenu>
 */
export const SidebarSwitcher = forwardRef<HTMLButtonElement, SidebarSwitcherProps>(
  ({ icon, avatar, title, subtitle, trailingIcon = "sort", selected, className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      data-selected={selected ? "true" : undefined}
      className={cn(
        "ds-tf-sidebar-switcher flex w-full items-center gap-2.5 rounded-lg border-[1.5px] border-transparent px-2.5 py-2 text-left font-sans outline-none transition-colors hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg",
        selected && "border-accent-primary bg-white",
        className
      )}
      {...rest}
    >
      {avatar}
      {!avatar && icon && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-medium text-ink-secondary [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-ink-primary">{title}</span>
        {subtitle && <span className="block truncate text-xs text-ink-secondary">{subtitle}</span>}
      </span>
      {trailingIcon !== "none" && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-ink-secondary">
          {trailingIcon === "sort" ? <SortIcon /> : <KebabIcon />}
        </span>
      )}
    </button>
  )
);

SidebarSwitcher.displayName = "SidebarSwitcher";

function SortIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KebabIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export interface SidebarRailButtonProps {
  icon: ReactNode;
  /** aria-label — the rail is icon-only, so this is the only accessible name. */
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * DS-TF SidebarRailButton — a single icon-only square button for the
 * collapsed "rail" variant of a sidebar (icons stacked vertically, no
 * labels). Stack several inside a plain `<div className="flex flex-col
 * gap-1">` — there's no dedicated rail container, since it's just a
 * narrower composition of the same buttons.
 */
export const SidebarRailButton = forwardRef<HTMLButtonElement, SidebarRailButtonProps>(
  ({ icon, label, selected, onClick, className }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-current={selected ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "ds-tf-sidebar-rail-btn flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-secondary outline-none transition-colors hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg [&_svg]:h-[18px] [&_svg]:w-[18px]",
        selected && "bg-accent-bg text-accent-primary",
        className
      )}
    >
      {icon}
    </button>
  )
);

SidebarRailButton.displayName = "SidebarRailButton";
