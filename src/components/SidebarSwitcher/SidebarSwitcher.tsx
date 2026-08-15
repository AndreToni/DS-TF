import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SidebarSwitcherProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** Leading icon, wrapped in a 44px tinted square chip (e.g.
   * `iconTone="accent"` for a blue swatch, `"success"` for green) —
   * matches the workspace-switcher swatch in the design reference. Ignored
   * if `avatar` is set. */
  icon?: ReactNode;
  /** Tint for the `icon` chip background. @default "accent" */
  iconTone?: "accent" | "success" | "neutral";
  /** Leading visual — pass a real `Avatar` for a person (the user-menu
   * trigger); use `icon` instead for a team/workspace swatch. */
  avatar?: ReactNode;
  title: ReactNode;
  /** e.g. "@handle". */
  subtitle?: ReactNode;
  /** `"sort"` (up/down arrows — the "Select" workspace/account switcher) \|
   * `"chevron"` (single arrow that flips on open — the "Menu" workspace
   * switcher, which opens a richer dropdown with actions) \| `"kebab"`
   * (⋮ — compact user-menu row, e.g. pinned to the bottom of a `NavMenu`)
   * \| `"none"`. @default "sort" */
  trailingIcon?: "sort" | "chevron" | "kebab" | "none";
  /** Rotates the `"chevron"` trailing icon — pass the same open state you
   * give your `FlyoutMenu`. Ignored for other `trailingIcon` values. */
  open?: boolean;
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
 * The design reference distinguishes two dropdown flavors, both driven by
 * `trailingIcon`: `"sort"` ("Select" — a flat, switchable list of
 * accounts/workspaces) and `"chevron"` ("Menu" — a richer dropdown with a
 * repeated header, an upsell block, action rows, and "Log Out"). Both are
 * composition over the existing `FlyoutMenu`/`FlyoutMenuContent` — no
 * dedicated dropdown-content component, since the "Menu" flavor's rows are
 * plain text, not the icon+title+description `FlyoutMenuItem` layout.
 *
 * @example
 * // "Select" — switch between workspaces
 * <FlyoutMenu open={open} onOpenChange={setOpen}>
 *   <FlyoutMenuTrigger asChild>
 *     <SidebarSwitcher icon={<DiamondIcon />} title="Everest Team" subtitle="@everest" trailingIcon="sort" selected={open} />
 *   </FlyoutMenuTrigger>
 *   <FlyoutMenuContent align="start" size="sm">
 *     <FlyoutMenuItem icon={<TwitterIcon />} title="Twitter" description="@twitter" />
 *     <FlyoutMenuItem icon={<GoogleIcon />} title="Google" description="@google" />
 *     <FlyoutMenuItem title="Personal" />
 *   </FlyoutMenuContent>
 * </FlyoutMenu>
 *
 * @example
 * // "Menu" — workspace actions + upsell
 * <FlyoutMenu open={open} onOpenChange={setOpen}>
 *   <FlyoutMenuTrigger asChild>
 *     <SidebarSwitcher icon={<TeamIcon />} iconTone="success" title="Google Team" subtitle="@google" trailingIcon="chevron" open={open} selected={open} />
 *   </FlyoutMenuTrigger>
 *   <FlyoutMenuContent align="start" size="md" footer={<Button variant="transparent" size="sm" leadIcon={<LogOutIcon />}>Log Out</Button>}>
 *     <div className="flex items-center gap-3 px-1 pb-3">
 *       <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#D1FAE5]"><TeamIcon /></span>
 *       <div><p className="font-semibold">Google team</p><p className="text-xs text-ink-secondary">@google</p></div>
 *     </div>
 *     <Divider />
 *     <p className="px-1 py-3 text-sm text-ink-secondary">Consider upgrading to our Premium Plan for unlimited projects.</p>
 *     <Button variant="transparent" size="sm" className="px-1 text-accent-primary">Upgrade Now</Button>
 *     <Divider />
 *     <button className="w-full rounded-md px-2 py-2 text-left text-sm font-medium hover:bg-surface-medium">Invite Members</button>
 *     <button className="w-full rounded-md px-2 py-2 text-left text-sm font-medium hover:bg-surface-medium">Preferences</button>
 *     <button className="w-full rounded-md px-2 py-2 text-left text-sm font-medium hover:bg-surface-medium">Tools</button>
 *   </FlyoutMenuContent>
 * </FlyoutMenu>
 *
 * @example
 * // "Menu" — compact user row (footer of a NavMenu)
 * <FlyoutMenu open={open} onOpenChange={setOpen}>
 *   <FlyoutMenuTrigger asChild>
 *     <SidebarSwitcher avatar={<Avatar size="sm" initials="KP" />} title="Kianna Press" subtitle="@kianna" trailingIcon="kebab" />
 *   </FlyoutMenuTrigger>
 *   <FlyoutMenuContent align="start" size="sm">
 *     <button className="w-full rounded-md px-2 py-2 text-left text-sm font-medium hover:bg-surface-medium">Invite Members</button>
 *     <button className="w-full rounded-md px-2 py-2 text-left text-sm font-medium hover:bg-surface-medium">Preferences</button>
 *     <button className="w-full rounded-md px-2 py-2 text-left text-sm font-medium hover:bg-surface-medium">Tools</button>
 *     <Divider />
 *     <button className="w-full rounded-md px-2 py-2 text-left text-sm font-medium hover:bg-surface-medium">Log Out</button>
 *   </FlyoutMenuContent>
 * </FlyoutMenu>
 */
const iconToneClass: Record<NonNullable<SidebarSwitcherProps["iconTone"]>, string> = {
  accent: "bg-accent-bg",
  success: "bg-[#D1FAE5]",
  neutral: "bg-surface-medium",
};

export const SidebarSwitcher = forwardRef<HTMLButtonElement, SidebarSwitcherProps>(
  ({ icon, iconTone = "accent", avatar, title, subtitle, trailingIcon = "sort", open, selected, className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      data-selected={selected ? "true" : undefined}
      className={cn(
        "ds-tf-sidebar-switcher flex w-full items-center gap-3 rounded-lg border-[1.5px] border-transparent px-2.5 py-2 text-left font-sans outline-none transition-colors hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg",
        selected && "border-accent-primary bg-white hover:bg-white",
        className
      )}
      {...rest}
    >
      {avatar}
      {!avatar && icon && (
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-secondary [&_svg]:h-6 [&_svg]:w-6",
            iconToneClass[iconTone]
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold text-ink-primary">{title}</span>
        {subtitle && <span className="block truncate text-xs text-ink-secondary">{subtitle}</span>}
      </span>
      {trailingIcon !== "none" && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-ink-secondary">
          {trailingIcon === "sort" && <SortIcon />}
          {trailingIcon === "chevron" && <ChevronIcon open={!!open} />}
          {trailingIcon === "kebab" && <KebabIcon />}
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4 transition-transform", open && "rotate-180")}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
